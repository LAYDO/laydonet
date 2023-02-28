from django.shortcuts import render, redirect
from django.urls import reverse
from django.http.response import JsonResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import csrf_exempt
from django import template
register = template.Library()

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

@user_passes_test(lambda user: user.is_staff)
def start(request):
    return render(request, 'fifteen_toes_start.html',)

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
                    plays=[0,0,0,0,0,0,0,0,0],
                    spaces=[0,0,0,0,0,0,0,0,0],
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
                    if game[0].player_one == 0:
                        game.update(player_one=current_user.id)
                    elif game[0].player_two == 0:
                        game.update(player_two=current_user.id)
                else:
                    games = list(Game.objects.filter(status='LOBBY').filter(player_two=0).all().values())
                    games.extend(list(Game.objects.filter(status='LOBBY').filter(player_one=0).all().values()))
                    game = Game.objects.filter(game_id=games[0]['game_id'])
                    if game[0].player_one == 0:
                        game.update(player_one=current_user.id)
                    elif game[0].player_two == 0:
                        game.update(player_two=current_user.id)
                return HttpResponseRedirect('/fifteentoes/lobby')

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
            'status': p1[0]['status'],
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
            'status': p2[0]['status'],
            'p1': player1,
            'p1_status': p2[0]['p1_status'],
            'p2': current_user.username,
            'p2_status': p2[0]['p2_status'],
            'privacy': p2[0]['privacy'],
            'pw': p2[0]['password'],
        })
    return render(request, 'fifteen_toes_lobby.html', lobby)
    
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
        return redirect(request.META['HTTP_REFERER'])
    
@csrf_exempt
@user_passes_test(lambda user: user.is_staff)
def game_leave(request):
    if request.method == 'POST':
        current_user = request.user
        p1 = list(Game.objects.filter(player_one=current_user.id).exclude(status='ARCHIVED').all().values())
        p2 = list(Game.objects.filter(player_two=current_user.id).exclude(status='ARCHIVED').all().values())
        if (len(p1) > 0):
            p = Game.objects.filter(game_id=p1[0]['game_id'])
            p.update(p1_status='UNREADY')
            p.update(player_one=0)
        elif (len(p2) > 0):
            p = Game.objects.filter(game_id=p2[0]['game_id'])
            p.update(p2_status='UNREADY')
            p.update(player_two=0)
        return HttpResponseRedirect('/fifteentoes')

@csrf_exempt
@user_passes_test(lambda user: user.is_staff)  
def game_start_continue(request):
    if request.method == 'POST':
        lobbyNum = player_active_lobby(request)
        lobby = Game.objects.filter(game_id=lobbyNum)
        if lobby:
            print(('STARTING GAME #{}').format(lobby[0].game_id))
            lobby.update(status='IN-GAME')
            lobby.update(p1_status='IN-GAME')
            lobby.update(p2_status='IN-GAME')
            lobby.update(round=1)
    return HttpResponseRedirect('/fifteentoes/game')

def player_active_lobby(request):
    current_user = request.user
    games = list(Game.objects.filter(status='LOBBY').filter(player_two=current_user.id).all().values())
    games.extend(list(Game.objects.filter(status='LOBBY').filter(player_one=current_user.id).all().values()))
    if len(games) == 1:
        return games[0]['game_id']
    else:
        return 0
    
@user_passes_test(lambda user: user.is_staff)
def game(request):
    current_user = request.user
    game = {}
    p1 = list(Game.objects.filter(player_one=current_user.id).exclude(status='ARCHIVED').all().values())
    p2 = list(Game.objects.filter(player_two=current_user.id).exclude(status='ARCHIVED').all().values())
    if (len(p1) == 1):
        player2 = 0
        if (p1[0]['player_two'] > 0):
            player2 = User.objects.filter(id=p1[0]['player_two'])[0].username
        game.update({
            'id': p1[0]['game_id'],
            'p1': current_user.username,
            'p2': player2,
            'privacy': p1[0]['privacy'],
            'spaces': p1[0]['spaces'],
            'plays': p1[0]['plays'],
            'round': p1[0]['round'],
        })
    elif (len(p2) == 1):
        player1 = 0
        if (p2[0]['player_two'] > 0):
            player1 = User.objects.filter(id=p2[0]['player_one'])[0].username
        game.update({
            'id': p2[0]['game_id'],
            'p1': player1,
            'p2': current_user.username,
            'privacy': p2[0]['privacy'],
            'spaces': p2[0]['spaces'],
            'plays': p2[0]['plays'],
            'round': p2[0]['round'],
        })
    return render(request, 'fifteen_toes_game.html', game)

@csrf_exempt
@user_passes_test(lambda user: user.is_staff)
def game_turn(request):
    if request.method == 'POST':
        gameNum = player_active_game(request)
        data = json.loads(request.body)
        game = Game.objects.filter(game_id=gameNum)
        newPlays = game[0].plays
        newPlays.extend(data['play'])
        newSpaces = game[0].spaces
        newSpaces[int(data['space'])] = data['play']
        newRound = game[0].round + 1
        if game:
            game.update(round=newRound)
            game.update(plays=newPlays)
            game.update(spaces=newSpaces)

        if (game[0].checkWin):
            # Do some work to prep game for archivability 
            return HttpResponseRedirect('/fifteentoes/lobby')
        else:
            return HttpResponseRedirect('/fifteentoes/game')
        
def player_active_game(request):
    current_user = request.user
    games = list(Game.objects.filter(status='IN-GAME').filter(player_two=current_user.id).all().values())
    games.extend(list(Game.objects.filter(status='IN-GAME').filter(player_one=current_user.id).all().values()))
    if len(games) == 1:
        return games[0]['game_id']
    else:
        return 0

# Proof of concept for building metrics
@csrf_exempt
def user_click(request):
    if request.method == 'POST':
        txt = 'User clicked {}'
        click = json.loads(request.body)
        print(txt.format(click['target']))
        return JsonResponse(click, safe=False)
    
@register.filter(name='cut')
def cut(value, arg):
    return value.replace(arg, '')