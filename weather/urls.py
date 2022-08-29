from django.urls import path
from weather import views

urlpatterns = [
    path('', views.weather, name='weather'),
    path('f/', views.getWeatherF, name='getWeatherF'),
]
