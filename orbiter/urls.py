from django.urls import path
from . import views

urlpatterns = [
    path('', views.orbiter, name='orbiter'),
    path('plot/<int:satellite_id>/', views.plot_satellite, name='plot_satellite'),
    path('api/satellite/<int:satellite_id>/current_position/', views.satellite_current_position, name='satellite_current_position'),
    path('api/satellite/<int:satellite_id>/trajectory/', views.satellite_trajectory, name='satellite_trajectory'),
]
