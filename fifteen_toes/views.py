from django.shortcuts import render
from django.http.response import JsonResponse
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Game

# Create your views here.

# Default view, auth only superusers
@user_passes_test(lambda user: user.is_superuser)
def fifteen_toes(request):
    return render(request, 'fifteen_toes_home.html',)

@user_passes_test(lambda user: user.is_superuser)
def check_for_match(request):
    current_user = request.user
    matches = list(Game.objects.filter(player_one=current_user.id).all().values())
    txt = 'Matches for ' + current_user.username + ': {}'
    print(txt.format(len(matches)))
    url = 'fifteentoes/'
    if (len(matches) > 0):
        url += 'lobby'
    else:
        url += 'start'
    match = {}
    match.update({
        'pathname': url,
    })
    return JsonResponse(match, safe=False)

@user_passes_test(lambda user: user.is_superuser)
def start(request):
    return render(request, 'fifteen_toes_start.html',)

@user_passes_test(lambda user: user.is_superuser)
def lobby(request):
    return render(request, 'fifteen_toes_lobby.html',)

@csrf_exempt
def user_click(request):
    if request.method == 'POST':
        txt = 'User clicked {}'
        click = json.loads(request.body)
        print(txt.format(click['clicked']))
        return JsonResponse(click, safe=False)