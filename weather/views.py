import time
from django.http.response import JsonResponse
from django.shortcuts import render
# from geopy.geocoders import Nominatim
import requests, os

APIKEY = os.getenv('OPEN_WEATHER_APP_ID')
STLNKEY = os.getenv('OPEN_WEATHER_API_KEY')
AQIKEY = os.getenv("AQI_API_KEY")
baseURL = 'https://api.openweathermap.org/data/2.5/'
geoURL = 'https://api.openweathermap.org/geo/1.0/direct?'
seaCoords = (47.602270, -122.320390)
weatherGovURL = "https://api.weather.gov/points/" # {latitude},{longitude}"
weatherGovFlag = False


# Create your views here.

def get_tokens(request):
    tokens = {
        "mapbox_access_token": os.getenv('MAPBOX_ACCESS_KEY'),
        "open_weather_api_key": os.getenv('OPEN_WEATHER_API_KEY'),
    }
    return JsonResponse(tokens)

def weather(request):
    return render(request, 'weather.html', {})


def getWeatherF(request):
    city = ''
    current = {}
    currURL = baseURL + 'onecall?'
    aqiURL = "https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&"
    foreURL = baseURL + 'forecast/daily?'
    revGeoURL = 'https://api.openweathermap.org/geo/1.0/reverse?'
    lat = ''
    lon = ''
    for parm in request.GET:
        if (parm == 'q'):
            city = str(request.GET[parm])
            foreURL += 'q=' + city + '&'
            location = requests.get(
                geoURL + "q=" + city + "&limit=1&appid=" + STLNKEY).json()  # geolocater.geocode(city)
            if location[0]['lat']:
                currURL += 'lat=' + str(location[0]['lat']) + '&'
                aqiURL += "latitude=" + str(location[0]["lat"]) + "&"
                revGeoURL += 'lat=' + str(location[0]['lat']) + '&'
            if location[0]['lon']:
                currURL += 'lon=' + str(location[0]['lon']) + '&'
                aqiURL += "longitude=" + str(location[0]["lon"]) + "&"
                revGeoURL += 'lon=' + str(location[0]['lon']) + '&'
        elif (parm == 'lat'):
            lat = str(request.GET[parm])
            currURL += 'lat=' + str(request.GET[parm]) + '&'
            aqiURL += "latitude=" + str(request.GET[parm]) + "&"
            foreURL += 'lat=' + str(request.GET[parm]) + '&'
            revGeoURL += 'lat=' + str(request.GET[parm]) + '&'
        elif (parm == 'lon'):
            lon = str(request.GET[parm])
            currURL += 'lon=' + str(request.GET[parm]) + '&'
            aqiURL += "longitude=" + str(request.GET[parm]) + "&"
            foreURL += 'lon=' + str(request.GET[parm]) + '&'
            revGeoURL += 'lon=' + str(request.GET[parm]) + '&'
    metricURL = currURL + "exclude=minutely,alerts&units=metric&appid=" + STLNKEY
    currURL += "exclude=minutely,alerts&units=imperial&appid=" + STLNKEY
    aqiURL += "distance=15&API_KEY=" + STLNKEY
    foreURL += 'cnt=10&units=imperial&appid=' + STLNKEY
    revGeoURL += "limit=1&appid=" + STLNKEY
    weatherGURL = weatherGovURL + lat + ',' + lon
    print(weatherGURL)
    if (weatherGovFlag):
        w = requests.get(weatherGURL).json()
        print(w['properties']['relativeLocation']['properties']['city'])
        print(w['properties']['relativeLocation']['properties']['state'])
        forecastURL = w['properties']['forecast']
        print(forecastURL)
        hourlyURL = w['properties']['forecastHourly']
        print(hourlyURL)
        stationsURL = w["properties"]["observationStations"]
        print(stationsURL)
        forecastData = requests.get(forecastURL).json()
    m = requests.get(metricURL).json()
    c = requests.get(currURL).json()
    a = requests.get(aqiURL).json()
    f = requests.get(foreURL).json()
    l = requests.get(revGeoURL).json()
    now = int(time.time())
    todayMR = c['daily'][0]['moonrise']
    todayMS = c['daily'][0]['moonset']
    todaySR = c['daily'][0]['sunrise']
    todaySS = c['daily'][0]['sunset']
    tomorrowSR = c['daily'][1]['sunrise']
    tomorrowMR = c['daily'][1]['moonrise']
    tomorrowMS = c['daily'][1]['moonset']
    if (todayMS < todayMR):
        if (now < todayMS):
            moonset = todayMS
        else:
            moonset = tomorrowMS
        moonrise = todayMR
    else:
        if (now < todayMR):
            moonrise = todayMR
        else:
            moonrise = tomorrowMR
        moonset = todayMS

    if (now > todaySR):
        sunrise = tomorrowSR
    else:
        sunrise = todaySR
    sunset = todaySS

    if (len(a) > 1):
        aqi = a[1]
    else:
        aqi = {}
    # print(c['daily'])
    rain_amount = 0
    if (c['daily'][0]['pop'] > 0):
        print(f'{c["daily"][0]}')
        rain_amount = c['daily'][0][f'{c["daily"][0]["weather"][0]["main"].lower()}']
    current.update({
        'name': l[0]['name'],
        'latitude': c['lat'],
        'longitude': c['lon'],
        'tzOffset': c['timezone_offset'],
        'temp': c['current']['temp'],
        'tempC': m['current']['temp'],
        'weatherDesc': c['current']['weather'][0]['main'],
        'weatherIcon': c['current']['weather'][0]['icon'],
        'feelsLike': c['current']['feels_like'],
        'windSpeed': c['current']['wind_speed'],
        'windDeg': c['current']['wind_deg'],
        'windGust': c['current']['wind_gust'] if 'wind_gust' in c['current'] else 0,
        'pressure': c['current']['pressure'],
        'humidity': c['current']['humidity'],
        'dew_point': c['current']['dew_point'],
        'aqi': aqi,
        'forecast': f['list'],
        'clouds': c['current']['clouds'],
        'uvi': c['current']['uvi'],
        'visibility': c['current']['visibility'],
        'rain_amount': rain_amount,
        'rain_today': c['daily'][0]['pop'],
        'tomorrow': c['daily'][1],
        'todaily': c['daily'][0],
        'high': c['daily'][0]['temp']['max'],
        'low': c['daily'][0]['temp']['min'],
        'hourly': c['hourly'],
        'moon_phase': c['daily'][0]['moon_phase'],
        'moonrise': moonrise,
        'moonset': moonset,
        'sunrise': sunrise,
        'sunset': sunset,
    })
    return JsonResponse(current, safe=False)
