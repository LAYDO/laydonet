from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Satellite
from .forms import SatelliteForm
from . import orbit_calculations

# Create your views here.
def orbiter(request):
    satellites = Satellite.objects.all()
    form = SatelliteForm()
    return render(request, 'orbiter.html', {'satellites': satellites, 'form': form})

def create_satellite(request):
    form = SatelliteForm(request.POST)
    if form.is_valid():
        form.save()
        return redirect('orbiter')
    return redirect('orbiter')

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

