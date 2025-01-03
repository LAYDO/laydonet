import json, os, requests

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

from ai.groq import groq

def chat(request):
    return render(request, "ai.html")

def provideModels(request):
    api_key = os.environ.get("GROQ_API_KEY")
    url = "https://api.groq.com/openai/v1/models"
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    response = requests.get(url, headers=headers)
    data = response.json()["data"]
    data.sort(key=lambda x: x["created"], reverse=True)
    models = []
    for model in data:
        if model["active"]:
            models.append({"id": model["id"]})
    return JsonResponse({"models": models})


@csrf_exempt
@require_http_methods(["POST"])
def userChat(request, ai_id: str):
    # ai_id = int(ai_id)
    body_unicode = request.body.decode("utf-8")
    body_data = json.loads(body_unicode)

    conversation_id = body_data.get("conversation_id", "")
    user_message = body_data.get("message", {"content": ""})

    try:
        conversation = groq(ai_id, conversation_id, user_message)
        response_data = {
            "conversation_id": conversation.id,
            "messages": conversation.messages,
        }
        return JsonResponse(response_data)
    except Exception as e:
        return JsonResponse({"error": str(e)})
