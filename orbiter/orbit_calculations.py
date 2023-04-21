from skyfield.api import Topos, load
from skyfield.sgp4lib import EarthSatellite
from datetime import timedelta

def calculate_positions(tle_line1, tle_line2, n_past=60, n_future=60):
    # Load the TLE data
    satellite = EarthSatellite(tle_line1, tle_line2)
    ts = load.timescale()

    # Calculate current time during app startup
    t = ts.now()
    
    # Calculate past and future positions
    past_positions = []
    future_positions = []

    for i in range(n_past + n_future + 1):
        offset_minutes = (i - n_past) * 2  # Adjust the time step as needed
        t_offset = t + timedelta(minutes=offset_minutes)
        geocentric_offset = satellite.at(t_offset)
        position_offset = geocentric_offset.subpoint().longitude.degrees, geocentric_offset.subpoint().latitude.degrees

        if i < n_past:
            past_positions.append(position_offset)
        elif i > n_past:
            future_positions.append(position_offset)
    
    return {
            'past': past_positions,
            'future': future_positions
    }

def calculate_current_position(tle_line1, tle_line2):
    # Load the TLE data
    satellite = EarthSatellite(tle_line1, tle_line2)
    ts = load.timescale()

    # Calculate current position
    t = ts.now()
    geocentric = satellite.at(t)
    current_position = geocentric.subpoint().longitude.degrees, geocentric.subpoint().latitude.degrees

    return {
        'longitude': current_position[0], 
        'latitude': current_position[1]
    }
        