from django.urls import path
from . import views

urlpatterns = [
    path('', views.orbiter, name='orbiter'),
    path('plot/<int:satellite_id>/', views.plot_satellite, name='plot_satellite'),
    path('api/satellite/<int:satellite_id>/current_position/', views.satellite_current_position, name='satellite_current_position'),
    path('api/satellite/<int:satellite_id>/trajectory/', views.satellite_trajectory, name='satellite_trajectory'),
    path('fetch/ss', views.fetch_space_stations, name='fetch_space_stations'),
    path('fetch/30', views.fetch_last_30, name='fetch_last_30'),
    path('fetch/sl', views.fetch_starlink, name='fetch_starlink')
]
