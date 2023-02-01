from django.shortcuts import render
from django.http.response import JsonResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Game, Lobby
from .forms import CreateLobbyForm, JoinLobbyForm

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
        print(txt.format(click['target']))
        return JsonResponse(click, safe=False)
    
@csrf_exempt
@user_passes_test(lambda user: user.is_superuser)
def create_lobby(request):
    if request.method == 'POST':
        current_user = request.user
        lobbies = list(Lobby.objects.filter(player_one=current_user.id).all().values())
        lobbies.extend(list(Lobby.objects.filter(player_two=current_user.id).all().values()))
        txt = 'User in {} lobbies'
        print(txt.format(len(lobbies)))
        if (len(lobbies) > 0):
            return
        else:
            form = CreateLobbyForm(request.POST)
            print(form.is_valid())
            # if form.is_valid():
            # return HttpResponseRedirect('/fifteentoes/lobby/')
            return render(request, 'fifteen_toes_lobby.html', {'form': form.fields['privacy']})
        
@user_passes_test(lambda user: user.is_superuser)
def join_lobby(request):
    if request.method == 'POST':
        current_user = request.user
        lobbies = list(Lobby.objects.filter(player_one=current_user.id).all().values())
        lobbies.extend(list(Lobby.objects.filter(player_two=current_user.id).all().values()))
        if (len(lobbies) > 0):
            return
        else:
            form = JoinLobbyForm(request.POST)
            # if form.is_valid():
            return HttpResponseRedirect('/fifteentoes/lobby/')