import os
from groq import Groq
from ai.models import Conversation


def groq(conversation, ai_id):

    # Create the Groq client
    client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

    # Check to see if conversation is a Conversation object
    if not isinstance(conversation, Conversation):
        raise ValueError("conversation must be a Conversation object")

    # print(conversation.messages)

    # Prepare messages to send to Groq
    messages_to_send = [
        {"role": message["role"], "content": message["content"]}
        for message in conversation.messages
        if isinstance(message["content"], str)
    ]
    ai_model = ""
    if ai_id == 0:
        ai_model = "llama-3.1-70b-versatile"
    elif ai_id == 1:
        ai_model = "llama-3.1-8b-instant"
    else:
        ai_model = "llama-3.1-405b-reasoning"
    print(ai_model)
    # Get the response
    response = client.chat.completions.create(
        model=ai_model,
        messages=messages_to_send,
        # max_tokens=100,
        temperature=1.2,
    )

    # Return the content of the response
    return response.choices[0].message.content
