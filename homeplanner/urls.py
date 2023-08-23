from django.urls import path
from . import views

urlpatterns = [
    path('', views.planner, name='planner'),
]