from django.urls import path

from . import views

urlpatterns = [
    path('', views.fifteen_toes, name='fifteen_toes'),
    path('check/', views.check_for_match, name='check_for_match'),
    path('start/', views.start, name='start'),
    path('start/create', views.create_lobby, name='create_lobby'),
    path('start/join', views.join_lobby, name='join_lobby'),
    path('lobby/', views.lobby, name='lobby'),
    path('lobby/ready', views.game_ready, name='game_ready'),
    path('lobby/unready', views.game_unready, name='game_unready'),
    path('lobby/leave', views.game_leave, name='game_leave'),
    path('lobby/start', views.game_start_continue, name='game_start_continue'),
    path('clicked/', views.user_click, name='user_click'),
    path('game/', views.game, name='game'),
    path('game/turn', views.game_turn, name='game_turn'),
    path('post/', views.post, name='post'),
    path('post/rematch', views.post_rematch, name='post_rematch'),
    path('post/leave', views.post_leave, name='post_leave'),
]