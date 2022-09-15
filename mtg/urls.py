from django.urls import path
from mtg import views

urlpatterns = [
    path('', views.mtg, name='mtg'),
    path('cards/', views.getCards, name='getCards'),
]