from django.urls import path

from webapps import views

urlpatterns = [
    path('', views.webapps, name='webapps'),
]