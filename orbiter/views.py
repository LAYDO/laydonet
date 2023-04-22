from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from .models import Satellite
from .forms import SatelliteForm
from . import orbit_calculations
import requests
import re
from bs4 import BeautifulSoup

# Create your views here.
def orbiter(request):
    try:
        response = fetch_tles('https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle')
        if isinstance(response, JsonResponse) and response.status_code != 200:
            return JsonResponse({"error": "Failed to fetch TLEs"}, status=400)

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

def fetch_space_stations(request):
    fetch_tles('https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle')

def fetch_last_30(request):
    fetch_tles('https://celestrak.org/NORAD/elements/gp.php?GROUP=last-30-days&FORMAT=tle')

def fetch_starlink(request):
    fetch_tles('https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle')

def fetch_tles(url):
    response = requests.get(url)
    if response.status_code != 200:
        return JsonResponse({"error": "Failed to fetch TLEs"}, status=400)

    tle_data = response.content.decode('utf-8')
    tle_lines = tle_data.splitlines()

    for i in range(0, len(tle_lines), 3):
        satellite_name = tle_lines[i].strip()
        tle_line1 = tle_lines[i+1].strip()
        tle_line2 = tle_lines[i+2].strip()

        satellite, created = Satellite.objects.get_or_create(name=satellite_name)
        satellite.tle_line1 = tle_line1
        satellite.tle_line2 = tle_line2
        satellite.save()

    return JsonResponse({"success": "TLEs fetched and updated"}, status=200)

