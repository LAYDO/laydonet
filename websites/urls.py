from django.urls import path

from websites import views

urlpatterns = [
    path('', views.websites, name='websites'),
]