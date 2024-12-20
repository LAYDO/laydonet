from django.urls import path
from sports import views

urlpatterns = [
    path('', views.sports, name='sports'),
    path('nfl/<int:id>/', views.getNFLTeam, name='getNFLTeam'),
    path('college-football/<int:id>/', views.getCollegeFootballTeam, name='getCollegeFootballTeam'),
    path('mlb/<int:id>/', views.getMLBTeam, name='getMLBTeam'),
    path('<str:league>/team/<int:id>/', views.team, name='showTeam'),
]