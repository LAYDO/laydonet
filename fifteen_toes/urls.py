from django.urls import path

from . import views

urlpatterns = [
    path('', views.fifteen_toes, name='fifteen_toes'),
    path('check/', views.check_for_match, name='check_for_match'),
    path('start/', views.start, name='start'),
    path('lobby/', views.lobby, name='lobby'),
]