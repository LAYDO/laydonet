from django.urls import path
from webgl import views

urlpatterns = [
    path("", views.webgl, name="webgl"),
]
