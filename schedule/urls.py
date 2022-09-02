from django.urls import path
from schedule import views

urlpatterns = [
    path('', views.schedule, name='schedule'),
    path('get/', views.getSchedule, name='getSchedule'),
]
