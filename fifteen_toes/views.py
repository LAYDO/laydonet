from django.shortcuts import render, redirect
from django.urls import reverse
from django.http.response import JsonResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Game
from .forms import CreateLobbyForm, JoinLobbyForm
from django.contrib.auth.models import User

# Create your views here.

# Default view, auth only superusers
@user_passes_test(lambda user: user.is_staff)
def fifteen_toes(request):
    return render(request, 'fifteen_toes_home.html',)

@user_passes_test(lambda user: user.is_staff)
def check_for_match(request):
    url = 'fifteentoes/'
    if (check_for_lobbies(request)):
        url += 'lobby'
    else:
        url += 'start'
    match = {}
    match.update({
        'pathname': url,
    })
    return JsonResponse(match, safe=False)

@user_passes_test(lambda user: user.is_staff)
def start(request):
    return render(request, 'fifteen_toes_start.html',)

@user_passes_test(lambda user: user.is_staff)
def lobby(request):
    current_user = request.user
    lobby = {}
    p1 = list(Game.objects.filter(player_one=current_user.id).exclude(status='ARCHIVED').all().values())
    p2 = list(Game.objects.filter(player_two=current_user.id).exclude(status='ARCHIVED').all().values())
    if (len(p1) == 1):
        player2 = 0
        if (p1[0]['player_two'] > 0):
            player2 = User.objects.filter(id=p1[0]['player_two'])[0].username
        lobby.update({
            'id': p1[0]['game_id'],
            'p1': current_user.username,
            'p1_status': p1[0]['p1_status'],
            'p2': player2,
            'p2_status': p1[0]['p2_status'],
            'privacy': p1[0]['privacy'],
            'pw': p1[0]['password'],
        })
    elif (len(p2) == 1):
        player1 = 0
        if (p2[0]['player_two'] > 0):
            player1 = User.objects.filter(id=p2[0]['player_one'])[0].username
        lobby.update({
            'id': p2[0]['game_id'],
            'p1': player1,
            'p1_status': p2[0]['p1_status'],
            'p2': current_user.username,
            'p2_status': p2[0]['p2_status'],
            'privacy': p2[0]['privacy'],
            'pw': p2[0]['password'],
        })
    return render(request, 'fifteen_toes_lobby.html', lobby)

@csrf_exempt
def user_click(request):
    if request.method == 'POST':
        txt = 'User clicked {}'
        click = json.loads(request.body)
        print(txt.format(click['target']))
        return JsonResponse(click, safe=False)
    
@csrf_exempt
@user_passes_test(lambda user: user.is_staff)
def create_lobby(request):
    if request.method == 'POST':
        if (check_for_lobbies(request)):
            return
        else:
            form = CreateLobbyForm(request.POST)
            current_user = request.user
            if form.is_valid():
                f = form.cleaned_data
                print(f['create_option'])
                game = Game(
                    status='LOBBY',
                    player_one=current_user.id,
                    p1_status='UNREADY',
                    player_two=0,
                    p2_status='UNREADY',
                    round=0,
                    winner=0,
                    loser=0,
                    privacy=f['create'],
                    password=f['create_option'],
                )
                game.save()
                return HttpResponseRedirect('/fifteentoes/lobby')
        
@csrf_exempt
@user_passes_test(lambda user: user.is_staff)
def join_lobby(request):
    if request.method == 'POST':
        if (check_for_lobbies(request)):
            return
        else:
            form = JoinLobbyForm(request.POST)
            current_user = request.user
            if form.is_valid():
                f = form.cleaned_data
                if (f['join'] == 'Lobby Number'):
                    game = Game.objects.filter(game_id=f['join_option'])
                    game.update(player_two=current_user.id)
                else:
                    games = list(Game.objects.filter(status='LOBBY').filter(player_two=0).exclude(player_one=0).all().values())
                    game = Game.objects.filter(game_id=games[0]['game_id'])
                    game.update(player_two=current_user.id)
                return HttpResponseRedirect('/fifteentoes/lobby')
        
@user_passes_test(lambda user: user.is_staff)
def check_for_lobbies(request):
    current_user = request.user
    lobbies = list(Game.objects.filter(player_one=current_user.id).all().values())
    lobbies.extend(list(Game.objects.filter(player_two=current_user.id).all().values()))
    txt = '{} in {} lobbies'
    print(txt.format(current_user.username,len(lobbies)))
    if (len(lobbies) > 0):
        return True
    else:
        return False
    
@csrf_exempt   
@user_passes_test(lambda user: user.is_staff)
def game_ready(request):
    if request.method == 'POST':
        current_user = request.user
        p1 = list(Game.objects.filter(player_one=current_user.id).exclude(status='ARCHIVED').all().values())
        p2 = list(Game.objects.filter(player_two=current_user.id).exclude(status='ARCHIVED').all().values())
        if (len(p1) > 0):
            p = Game.objects.filter(game_id=p1[0]['game_id'])
            p.update(p1_status='READY')
        elif (len(p2) > 0):
            p = Game.objects.filter(game_id=p2[0]['game_id'])
            p.update(p2_status='READY')
        # return HttpResponseRedirect('/fifteentoes/lobby')
        # return redirect(reverse('lobby'))
        # EX:    player1 = User.objects.filter(id=p2[0]['player_one'])[0].username
        # return render(request, 'fifteen_toes_lobby.html', p[0])
        return redirect(request.META['HTTP_REFERER'])

@csrf_exempt
@user_passes_test(lambda user: user.is_staff)
def game_unready(request):
    if request.method == 'POST':
        current_user = request.user
        p1 = list(Game.objects.filter(player_one=current_user.id).exclude(status='ARCHIVED').all().values())
        p2 = list(Game.objects.filter(player_two=current_user.id).exclude(status='ARCHIVED').all().values())
        if (len(p1) > 0):
            p = Game.objects.filter(game_id=p1[0]['game_id'])
            p.update(p1_status='UNREADY')
        elif (len(p2) > 0):
            p = Game.objects.filter(game_id=p2[0]['game_id'])
            p.update(p2_status='UNREADY')
        # Methods below used from https://stackoverflow.com/questions/64078178/django-reload-template-after-post-request
        # return HttpResponseRedirect('/fifteentoes/lobby')
        # return redirect(reverse('lobby'))
        return redirect(request.META['HTTP_REFERER'])