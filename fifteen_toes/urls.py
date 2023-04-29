from django.urls import path

from . import views

urlpatterns = [
    path('', views.fifteen_toes, name='fifteen_toes'),
    path('check/', views.check_for_match, name='check_for_match'),
    path('start/', views.start, name='start'),
    path('start/create', views.create_lobby, name='create_lobby'),
    path('start/join', views.join_lobby, name='join_lobby'),
    path('lobby/<game_id>', views.lobby, name='lobby'),
    path('lobby/<game_id>/ready', views.game_ready, name='game_ready'),
    path('lobby/<game_id>/unready', views.game_unready, name='game_unready'),
    path('lobby/<game_id>/leave', views.game_leave, name='game_leave'),
    path('lobby/<game_id>/start', views.game_start_continue, name='game_start_continue'),
    path('clicked/', views.user_click, name='user_click'),
    path('game/<game_id>', views.game, name='game'),
    path('post/<game_id>', views.post, name='post'),
    path('post/<game_id>/rematch', views.post_rematch, name='post_rematch'),
    path('post/<game_id>/leave', views.post_leave, name='post_leave'),
]