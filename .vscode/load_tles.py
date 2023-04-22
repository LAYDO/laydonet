#!/usr/bin/env python3
import requests
from orbiter.models import Satellite
import os
import sys
from pathlib import Path
from django.core.asgi import get_asgi_application


# Set the path to your Django project
project_path = Path('./laydonet').resolve()

# Add the project to sys.path
sys.path.append(str(project_path))

# Set the Django settings module environment variable
os.environ['DJANGO_SETTINGS_MODULE'] = 'laydonet.settings'

application = get_asgi_application()

def load_tles(url):
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to fetch TLEs")
        return

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

    print("TLEs fetched and updated")

if __name__ == '__main__':
    urlSS = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle'
    url30 = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=last-30-days&FORMAT=tle'
    urlSL = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=starlink&FORMAT=tle'
    load_tles(urlSS)
