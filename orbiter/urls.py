from django.urls import path
from . import views

urlpatterns = [
    path('', views.orbiter, name='orbiter'),
    path('create/', views.create_satellite, name='create_satellite'),
    path('plot/<int:satellite_id>/', views.plot_satellite, name='plot_satellite'),
    path('api/satellite/<int:satellite_id>/positions/', views.satellite_positions, name='satellite_positions')
]
