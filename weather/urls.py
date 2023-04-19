from django.urls import path
from weather import views

urlpatterns = [
    path('', views.weather, name='weather'),
    path('f/', views.getWeatherF, name='getWeatherF'),
    path('api/tokens/', views.get_tokens, name='get_tokens'),
]
