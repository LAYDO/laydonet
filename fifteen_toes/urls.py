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
    # path('game/start', views.lobby, name='lobby'),
    path('clicked/', views.user_click, name='user_click'),
]