from django.urls import path

from . import views

urlpatterns = [
    path('', views.fifteen_toes, name='fifteen_toes'),
]