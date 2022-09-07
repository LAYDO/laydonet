from django.urls import path
from mtg import views

urlpatterns = [
    path('', views.mtg, name='mtg'),
    path('card/<str:name>/', views.getCards, name='getCards'),
]