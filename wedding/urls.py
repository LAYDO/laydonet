from importlib.resources import path
from django.urls import path

from wedding import views

urlpatterns = [
    path('', views.wedding, name='wedding'),
    path('ourstory/', views.ourstory, name='ourstory'),
]