from django.urls import path
from sports import views

urlpatterns = [
    path('', views.sports, name='sports'),
    path('nfl/<int:id>/', views.getNFLTeam, name='getNFLTeam'),
]