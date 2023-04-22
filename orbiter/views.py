from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from .models import Satellite
from .forms import SatelliteForm
from . import orbit_calculations
import requests

# Create your views here.
def orbiter(request):
    try:
        satellites = Satellite.objects.all()
        form = SatelliteForm()
    except Satellite.DoesNotExist:
        satellites = None
        form = None
    return render(request, 'orbiter.html', {'satellites': satellites, 'form': form})

def plot_satellite(request, satellite_id):
    satellite = Satellite.objects.get(pk=satellite_id)
    return render(request, 'plot.html', {'satellite': satellite})

def satellite_current_position(request, satellite_id):
    satellite = Satellite.objects.get(pk=satellite_id)
    position = orbit_calculations.calculate_current_position(satellite.tle_line1, satellite.tle_line2)
    return JsonResponse(position, safe=False)

def satellite_trajectory(request, satellite_id):
    satellite = Satellite.objects.get(pk=satellite_id)
    positions = orbit_calculations.calculate_positions(satellite.tle_line1, satellite.tle_line2)
    return JsonResponse(positions, safe=False)

