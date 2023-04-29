from django.shortcuts import render, redirect
from django.http.response import JsonResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.decorators import user_passes_test
from django.views.decorators.csrf import csrf_exempt
from django import template
register = template.Library()

from .models import Game
from .forms import CreateLobbyForm, JoinLobbyForm
from django.contrib.auth.models import User
import json

# Create your views here.

# Default view, auth only superusers
@user_passes_test(lambda user: user.is_staff)
def fifteen_toes(request):
    return render(request, 'fifteen_toes_home.html',)

@user_passes_test(lambda user: user.is_staff)
def check_for_match(request):
    url = 'fifteentoes/'
    match (check_for_lobbies(request)[0]):
        case 2:
            url += f'post/{check_for_lobbies(request)[1]}'
        case 1:
            url += f'lobby/{check_for_lobbies(request)[1]}'
        case 0:
            url += 'start'
    match = {}
    match.update({
        'pathname': url,
    })
    return JsonResponse(match, safe=False)

@user_passes_test(lambda user: user.is_staff)
def check_for_lobbies(request):
    current_user = request.user
    lobbies = list(Game.objects.filter(player_one=current_user.id).exclude(status='ARCHIVE').all().values())
    lobbies.extend(list(Game.objects.filter(player_two=current_user.id).exclude(status='ARCHIVE').all().values()))
    txt = '{} in {} lobbies'
    print(txt.format(current_user.username,len(lobbies)))
    if (len(lobbies) == 1):
        if lobbies[0]['status'] == 'COMPLETED':
            return [2,lobbies[0]['game_id']]
        return [1,lobbies[0]['game_id']]
    else:
        return [0,0]

@user_passes_test(lambda user: user.is_staff)
def start(request):
    return render(request, 'fifteen_toes_start.html',)

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
                    plays=[],
                    spaces=[0,0,0,0,0,0,0,0,0],
                )
                game.save()
                return HttpResponseRedirect(f'/fifteentoes/lobby/{game.game_id}')
            
@user_passes_test(lambda user: user.is_staff)
def join_lobby(request):
    if request.method == 'POST':
        if (check_for_lobbies(request)[0] > 0):
            return
        else:
            form = JoinLobbyForm(request.POST)
            current_user = request.user
            if form.is_valid():
                f = form.cleaned_data
                if (f['join'] == 'Lobby Number'):
                    game = Game.objects.get(game_id=f['join_option'])
                    if game.player_one == 0:
                        game.player_one=current_user.id
                        game.save()
                    elif game.player_two == 0:
                        game.player_two=current_user.id
                        game.save()
                    return HttpResponseRedirect(f'/fifteentoes/lobby/{game.game_id}')
                else:
                    games = list(Game.objects.filter(status='LOBBY').filter(player_two=0).all().values())
                    games.extend(list(Game.objects.filter(status='LOBBY').filter(player_one=0).all().values()))
                    game = Game.objects.get(game_id=games[0]['game_id'])
                    if game.player_one == 0:
                        game.player_one=current_user.id
                        game.save()
                    elif game.player_two == 0:
                        game.player_two=current_user.id
                        game.save()
                    return HttpResponseRedirect(f'/fifteentoes/lobby/{game.game_id}')

@user_passes_test(lambda user: user.is_staff)
def lobby(request, game_id):
    lobby = {}
    game = Game.objects.get(game_id=game_id)
    lobby.update({
        'id': game.game_id,
        'status': game.status,
        'p1': User.objects.get(id=game.player_one).username,
        'p1_status': game.p1_status,
        'p2': User.objects.get(id=game.player_two).username,
        'p2_status': game.p2_status,
        'privacy': game.privacy,
        'pw': game.password,
    })
    return render(request, 'fifteen_toes_lobby.html', lobby)
    
@user_passes_test(lambda user: user.is_staff)
def game_ready(request, game_id):
    if request.method == 'POST':
        game = Game.objects.get(game_id=game_id)
        if (game.player_one == request.user.id):
            game.p1_status='READY'
            game.save()
        elif (game.player_two == request.user.id):
            game.p2_status='READY'
            game.save()
        return redirect(request.META['HTTP_REFERER'])

@user_passes_test(lambda user: user.is_staff)
def game_unready(request, game_id):
    if request.method == 'POST':
        game = Game.objects.get(game_id=game_id)
        if (game.player_one == request.user.id):
            game.p1_status='UNREADY'
            game.save()
        elif (game.player_two == request.user.id):
            game.p2_status='UNREADY'
            game.save()
        return redirect(request.META['HTTP_REFERER'])
    
@user_passes_test(lambda user: user.is_staff)
def game_leave(request, game_id):
    if request.method == 'POST':
        game = Game.objects.get(game_id=game_id)
        if (game.player_one == request.user.id):
            game.p1_status='UNREADY'
            game.player_one=0
            game.save()
        elif (game.player_two == request.user.id):
            game.p2_status='UNREADY'
            game.player_two=0
            game.save()
        return HttpResponseRedirect('/fifteentoes')

@user_passes_test(lambda user: user.is_staff)  
def game_start_continue(request, game_id):
    if request.method == 'POST':
        try:
            lobby = Game.objects.get(game_id=game_id)
        except Game.DoesNotExist:
            lobby = None
        if lobby:
            print(('STARTING GAME #{}').format(lobby.game_id))
            lobby.status='IN-GAME'
            lobby.p1_status='IN-GAME'
            lobby.p2_status='IN-GAME'
            lobby.round=1
            lobby.save()
            return HttpResponseRedirect(f'/fifteentoes/game/{game_id}')
        try:
            game = Game.objects.get(game_id=game_id)
        except Game.DoesNotExist:
            game = None
        if game:
            print(('CONTINUING GAME #{}').format(game.game_id))
            return HttpResponseRedirect(f'/fifteentoes/game/{game_id}')
    
@user_passes_test(lambda user: user.is_staff)
def game(request, game_id):
    current_user = request.user
    game = {}
    match = Game.objects.get(game_id=game_id)
    if (match.status == 'COMPLETED'):
        return HttpResponseRedirect('/fifteentoes/post')
    if (current_user.id == match.player_one):
        player2 = User.objects.get(id=match.player_two)
        game.update({
            'player1': current_user.username,
            'player2': player2.username,
            'p1': current_user.id,
            'p2': player2.id,
        })
    elif (current_user.id == match.player_two):
        player1 = User.objects.get(id=match.player_one)
        game.update({
            'player1': player1.username,
            'player2': current_user.username,
            'p1': player1.id,
            'p2': current_user.id,
        })
    game.update({
        'id': game_id,
        'privacy': match.privacy,
        'spaces': match.spaces,
        'plays': match.plays,
        'round': match.round,
    })

    return render(request, 'fifteen_toes_game.html', game)
    
def checkWin(game):
    if game.round <= 9:
        for i in game.winningArrays:
            temp = list()
            for x in i:
                if game.spaces[x] != 0:
                    temp.append(game.spaces[x])
            if (len(temp) == 3 and sum(temp) == 15):
                return True
            temp.clear()
    return False
    

@user_passes_test(lambda user: user.is_staff)
def post(request, game_id):
    try:
        game = Game.objects.get(game_id=game_id)
    except Game.DoesNotExist:
        game = None
    post = {}
    if (game):
        winner = User.objects.get(id=game.winner)
        loser = User.objects.get(id=game.loser)
        post.update({
            'id': game.game_id,
            'privacy': game.privacy,
            'player_one': game.player_one,
            'player_two': game.player_two,
            'p1_status': game.p1_status,
            'p2_status': game.p2_status,
            'winner_id': game.winner,
            'loser_id': game.loser,
            'winner': winner.username,
            'loser': loser.username,
            'spaces': game.spaces,
            'pw': game.password,
        })
    return render(request, 'fifteen_toes_post.html', post)

@user_passes_test(lambda user: user.is_staff)
def post_rematch(request, game_id):
    if request.method == 'POST':
        try:
            game = Game.objects.get(game_id=game_id)
        except Game.DoesNotExist:
            game = None
        if (game):
            if (game.player_one == request.user.id):
                game.p1_status='REMATCH'
                game.save()
                if (game.p2_status == 'REMATCH'):
                    game_archival(game_id)
                    p = Game(
                        status='LOBBY',
                        player_one=game.winner,
                        p1_status='UNREADY',
                        player_two=game.loser,
                        p2_status='UNREADY',
                        password=game.password,
                        privacy=game.privacy,
                        spaces=[0,0,0,0,0,0,0,0,0],
                        plays=[],
                        round=0,
                    )
                    p.save()
                    return HttpResponseRedirect(f'/fifteentoes/lobby/{p.game_id}')
                elif (game.p2_status == 'LEFT'):
                    game_archival(game_id)
                    HttpResponseRedirect('/fifteentoes')
            elif (game.player_two == request.user.id):
                game.p2_status='REMATCH'
                game.save()
                if (game.p1_status == 'REMATCH'):
                    game_archival(game_id)
                    p = Game(
                        status='LOBBY',
                        player_one=game.winner,
                        p1_status='UNREADY',
                        player_two=game.loser,
                        p2_status='UNREADY',
                        password=game.password,
                        privacy=game.privacy,
                        spaces=[0,0,0,0,0,0,0,0,0],
                        plays=[],
                        round=0,
                    )
                    p.save()
                    return HttpResponseRedirect(f'/fifteentoes/lobby/{p.game_id}')
                elif (game.p1_status == 'LEFT'):
                    game_archival(game_id)
                    HttpResponseRedirect('/fifteentoes')
        return redirect(request.META['HTTP_REFERER'])
    
@user_passes_test(lambda user: user.is_staff)
def post_leave(request, game_id):
    if request.method == 'POST':
        try:
            game = Game.objects.get(game_id=game_id)
        except Game.DoesNotExist:
            game = None
        if (game):
            if (game.player_one == request.user.id):
                game.p1_status='LEFT'
                game.save()
                if (game.p2_status == 'LEFT'):
                    game_archival(game_id)
            elif (game.player_two == request.user.id):
                game.p2_status='LEFT'
                game.save()
                if (game.p1_status == 'LEFT'):
                    game_archival(game_id)
            return HttpResponseRedirect('/fifteentoes')
    
    
def game_archival(id):
    to_be_archived = Game.objects.get(game_id=id)
    to_be_archived.status = 'ARCHIVE'
    to_be_archived.save()

# Proof of concept for building metrics
@csrf_exempt
def user_click(request):
    if request.method == 'POST':
        txt = 'User clicked {}'
        click = json.loads(request.body)
        print(txt.format(click['target']))
        return JsonResponse(click, safe=False)

# Custom filter for front-end to cut out zeroes on board used in spaces attribute
@register.filter(name='cut')
def cut(value, arg):
    return value.replace(arg, '')