import os, re, json, uuid, time
from groq import Groq
from ai.models import Conversation
from django.core.exceptions import ValidationError
from django.db.utils import DataError
from django.http import JsonResponse
current_path = os.path.dirname(os.path.abspath(__file__))
system_basic_path = os.path.join(current_path, "system_basic.txt")
system_reasoning_path = os.path.join(current_path, "system_reasoning.txt")
starting_point_path = os.path.join(current_path, "starting_point.txt")

try:
    with open(system_basic_path, "r") as file:
        system_basic = file.read()

    with open(system_reasoning_path, "r") as file:
        system_reasoning = file.read()

    with open(starting_point_path, "r") as file:
        starting_point = file.read()
except FileNotFoundError:
    print(f'File not found: {system_basic_path} or {starting_point_path}')

start = True

AI_MODELS = {
    0: "llama-3.2-90b-text-preview",
    1: "llama-3.2-90b-text-preview",
    2: "llama-3.2-1b-preview",
    3: "llama-3.2-11b-vision-preview",
    4: "llama-3.1-70b-versatile",
}


def remove_html_tags(text):
    """Remove html tags from a string"""
    return re.sub(r"<[^>]+>", "", text)

def determine_ai_model(ai_id):
    if ai_id in AI_MODELS:
        return AI_MODELS[ai_id]
    else:
        raise ValueError("Invalid AI ID")

def call_groq(ai_id, client, messages, is_final_answer=False):
    for attempt in range(3):
            # Determine the AI model based on the AI ID
            ai_model = determine_ai_model(ai_id)
            # Determine if reasoning is true
            if ai_id == 0:
                try:
                    # Call the Groq API
                    if is_final_answer:
                        response = client.chat.completions.create(
                            model=ai_model,
                            messages=messages,
                            temperature=0.2,
                        )
                        return response.choices[0].message.content
                    else:
                        response = client.chat.completions.create(
                            model=ai_model,
                            messages=messages,
                            temperature=0.2,
                            response_format={"type": "json_object"}
                        )
                        return json.loads(response.choices[0].message.content)
                except Exception as e:
                    if attempt < 3:
                        if is_final_answer:
                            return {
                                "title": "Error",
                                "content": f"Failed to generate final answer after 3 attempts. Error: {str(e)}",
                                "next_action": "final_answer"
                            }
                        else:
                            return {
                                "title": "Error",
                                "content": f"Failed to generate final answer after 3 attempts. Error: {str(e)}", "next_action": "final_answer"
                            }
                    time.sleep(1)
            else:
                try:
                    response = client.chat.completions.create(
                        model=ai_model,
                        messages=messages,
                    temperature=0.2,
                    )
                    return response.choices[0].message.content
                except Exception as e:
                    print(f"ERROR: {e}")
                    return JsonResponse({"error": str(e)})

def groq(ai_id, conversation_id, user_message):

    try:
        # Create the Groq client
        client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

        # Check if the Groq client is initialized
        if client is None:
            raise ValueError("Groq client is not initialized")

        # Check if conversation_id is provided, if not create a new conversation
        if conversation_id != "temp-id":
            uuid.UUID(conversation_id)
            conversation = Conversation.objects.get(id=conversation_id)
            start = False
        else:
            start = True
            conversation = Conversation.objects.create()
            if ai_id == 0:
                conversation.addMessage(role="system", content=system_reasoning)
            else:
                conversation.addMessage(role="system", content=system_basic)

        # Check if user_message is provided, if not raise an error
        if not user_message:
            raise ValueError("User message is not provided")

        # Remove HTML tags from user_message
        user_message = remove_html_tags(
            user_message.get("content") if isinstance(user_message, dict) else user_message
        )

        # Add user message to conversation
        conversation.addMessage(role="user", content=user_message)
        if ai_id == 0:
            return chain_of_thought(ai_id, conversation, client, start)
        else:
            result = basic_answer(ai_id, conversation, user_message, client)
            return result
    except (ValueError, ValidationError, DataError) as e:
        print(f"ERROR: {e}")
        return JsonResponse({"error": str(e)})


def chain_of_thought(ai_id, conversation, client, start):
    try:
    # Add starting point to conversation, if new conversation
        if start:
            conversation.addMessage(role="assistant", content=starting_point, display_content=False)
            start = False

        # Prepare messages to send to Groq
        messages_to_send = [
            {"role": message["role"], "content": message["content"]}
            for message in conversation.messages
            if isinstance(message["content"], str)
        ]

        steps = []
        step_count = 1
        total_thinking_time = 0

        while True:
            start_time = time.time()
            # Get the assistant response
            response = call_groq(ai_id, client, messages_to_send)
            # print(response)
            end_time = time.time()
            thinking_time = end_time - start_time
            total_thinking_time += thinking_time
            steps.append((f"Step {step_count}: {response['title']}", response["content"], thinking_time))
            # print(steps)
            # Add assistant response to conversation
            messages_to_send.append(
                {
                    "role": "assistant",
                    "content": json.dumps(response),
                }
            )

            if response["next_action"] == "final_answer" or step_count > 25: # Prevent infinite loops, can be adjusted as needed
                break
            step_count += 1

        # Add final answer to conversation
        messages_to_send.append(
            {
                "role": "user",
                "content": "Please provide the final answer based solely on your reasoning above. Do not use JSON formatting. Only provide the text response without any titles or preambles. Retain any formatting as instructed by the original prompt, such as exact formatting for free response or multiple choice.",
            }
        )

        start_time = time.time()
        # Get the assistant response
        response = call_groq(ai_id, client, messages_to_send, is_final_answer=True)
        # print(response)
        end_time = time.time()
        thinking_time = end_time - start_time
        total_thinking_time += thinking_time
        steps.append(("Final Answer", response, total_thinking_time))

        # Add final answer to conversation
        conversation.addMessage(role="assistant", content=json.dumps(steps))

        # Return the conversation
        return conversation
    except (ValueError, ValidationError, DataError):
        conversation = Conversation.objects.create()
        if ai_id != 2:
            conversation.addMessage(role="system", content=system_reasoning)

def basic_answer(ai_id, conversation, user_message, client):
    try:
        # Prepare messages to send to Groq
        messages_to_send = [
            {"role": message["role"], "content": message["content"]}
            for message in conversation.messages
            if isinstance(message["content"], str)
        ]

        # print(conversation.messages)
        assistant_response = call_groq(ai_id, client, messages_to_send)
        conversation.addMessage(role="assistant", content=assistant_response)
        return conversation
    except (ValueError, ValidationError, DataError) as e:
        print(f"ERROR: {e}")
        return JsonResponse({"error": str(e)})

def vision_answer(ai_id, conversation_id, user_message):
    pass
