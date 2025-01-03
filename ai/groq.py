import os, re, json, uuid, time
from groq import Groq
from ai.models import Conversation
from django.core.exceptions import ValidationError
from django.db.utils import DataError
from django.http import JsonResponse
current_path = os.path.dirname(os.path.abspath(__file__))
system_basic_path = os.path.join(current_path, "system_basic.txt")
# AI_MODELS = {}

try:
    with open(system_basic_path, "r") as file:
        system_basic = file.read()
except FileNotFoundError:
    print(f'File not found: {system_basic_path}')

start = True

# AI_MODELS = {
#     0: "llama-3.2-90b-text-preview",
#     1: "llama-3.2-90b-text-preview",
#     2: "llama-3.2-1b-preview",
#     3: "llama-3.2-11b-vision-preview",
#     4: "llama-3.1-70b-versatile",
# }


def remove_html_tags(text):
    """Remove html tags from a string"""
    return re.sub(r"<[^>]+>", "", text)

# def determine_ai_model(ai_id):
#     if ai_id in AI_MODELS:
#         return AI_MODELS[ai_id]
#     else:
#         raise ValueError("Invalid AI ID")

def call_groq(ai_id, client, messages):
    try:
        response = client.chat.completions.create(
            model=ai_id,
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
        result = text_answer(ai_id, conversation, user_message, client)
        return result
    except (ValueError, ValidationError, DataError) as e:
        print(f"ERROR: {e}")
        return JsonResponse({"error": str(e)})


def text_answer(ai_id, conversation, user_message, client):
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
