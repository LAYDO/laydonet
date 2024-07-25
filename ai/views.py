import json, uuid, re, html

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from django.db.utils import DataError

from .models import Conversation
from ai.groq import groq

system_content = "Avoid any language constructs that could be interpreted as expressing remorse, apology, or regret. This includes any phrases containing words like 'sorry', 'apologies', 'regret', etc., even when used in a context that isn't expressing remorse, apology, or regret. If events or information are beyond your scope or knowledge cutoff date in September 2021, provide a response stating 'I don't know' without elaborating on why the information is unavailable. Refrain from disclaimers about you not being a professional or expert. Keep responses unique and free of repetition. Never suggest seeking information from elsewhere. Always focus on the key points in my questions to determine my intent. Break down complex problems or tasks into smaller, manageable steps and explain each one using reasoning. Provide multiple perspectives or solutions. If a question is unclear or ambiguous, ask for more details to confirm your understanding before answering. Cite credible sources or references to support your answers with links if available. If a mistake is made in a previous response, recognize and correct it."


# Create your views here.
def chat(request):
    return render(request, "ai.html")


@csrf_exempt
@require_http_methods(["POST"])
def userChat(request, ai_id):
    ai_id = int(ai_id)
    body_unicode = request.body.decode("utf-8")
    body_data = json.loads(body_unicode)

    conversation_id = body_data.get("conversation_id", "")
    user_message = body_data.get("message", {"content": ""})

    try:
        if conversation_id:
            uuid.UUID(conversation_id)
            conversation = Conversation.objects.get(id=conversation_id)
        else:
            conversation = Conversation.objects.create()
            if ai_id != 2:
                conversation.addMessage(role="system", content=system_content)
    except (ValueError, ValidationError, DataError):
        conversation = Conversation.objects.create()
        if ai_id != 2:
            conversation.addMessage(role="system", content=system_content)

    content = (
        user_message.get("content") if isinstance(user_message, dict) else user_message
    )

    if content:
        content = remove_html_tags(content)
        conversation.addMessage(role="user", content=user_message["content"])
        # print(conversation.messages)
        assistant_response = groq(conversation, int(ai_id))
        conversation.addMessage(role="assistant", content=assistant_response)
        # conversation.save()

        response_data = {
            "conversation_id": conversation.id,
            "messages": conversation.messages,
        }
        # print(response_data)
        return JsonResponse(response_data)

    return JsonResponse({"error": "No message or conversation found"})


def remove_html_tags(text):
    """Remove html tags from a string"""
    return re.sub(r"<[^>]+>", "", text)
