from django.shortcuts import render
from django.http.response import JsonResponse
from home.views import user_info
from django.contrib.auth.decorators import user_passes_test

from .models import Game

# Create your views here.

# Default view, auth only superusers
@user_passes_test(lambda user: user.is_superuser)
def fifteen_toes(request):
    return render(request, 'fifteen_toes_home.html',)

def check_for_match(request):
    current_user = request.user
    matches = list(Game.objects.filter(player_one=current_user.id).all().values())
    return JsonResponse({
        "matches": len(matches)
    }, safe=False)
    # if (len(matches) > 0):
    #     return render(request, 'fifteen_toes_lobby.html',)
    # else:
    #     return render(request, 'fifteen_toes_start.html',)
    # match = {}
    # current_user = request.user
    # match.update({
    #     'user_id': current_user.id,
    #     'user_name': current_user.username,
    # })
    # return JsonResponse(match, safe=False)
@user_passes_test(lambda user: user.is_superuser)
def start(request):
    return render(request, 'fifteen_toes_start.html',)

@user_passes_test(lambda user: user.is_superuser)
def lobby(request):
    return render(request, 'fifteen_toes_lobby.html',)