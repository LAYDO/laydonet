import time
from django.http.response import JsonResponse
from django.shortcuts import render
from geopy.geocoders import Nominatim
import requests

APIKEY = '1e38a5a8f324c0f755a48e3d5bb75708'
STLNKEY = '9de243494c0b295cca9337e1e96b00e2'
baseURL = 'https://api.openweathermap.org/data/2.5/'
seaCoords = (47.602270, -122.320390)
geolocater = Nominatim(user_agent="laydo")


# Create your views here.


def weather(request):
    return render(request, 'weather.html', {})


def getWeatherF(request):
    city = ''
    current = {}
    currURL = baseURL + 'onecall?'
    aqiURL = baseURL + 'air_pollution?'
    foreURL = baseURL + 'forecast/daily?'
    for parm in request.GET:
        if (parm == 'city'):
            city = str(request.GET[parm])
            foreURL += 'q=' + city + '&'
            location = geolocater.geocode(city)
            if location.latitude:
                currURL += 'lat=' + str(location.latitude) + '&'
                aqiURL += 'lat=' + str(location.latitude) + '&'
            if location.longitude:
                currURL += 'lon=' + str(location.longitude) + '&'
                aqiURL += 'lon=' + str(location.longitude) + '&'
        elif (parm == 'lat'):
            currURL += 'lat=' + str(request.GET[parm]) + '&'
            aqiURL += 'lat=' + str(request.GET[parm]) + '&'
            foreURL += 'lat=' + str(request.GET[parm]) + '&'
        elif (parm == 'lon'):
            currURL += 'lon=' + str(request.GET[parm]) + '&'
            aqiURL += 'lon=' + str(request.GET[parm]) + '&'
            foreURL += 'lon=' + str(request.GET[parm]) + '&'
    metricURL = currURL + 'exclude=minutely,alerts&units=metric&appid=' + APIKEY
    currURL += 'exclude=minutely,alerts&units=imperial&appid=' + APIKEY
    aqiURL += 'appid=' + APIKEY
    foreURL += 'cnt=10&units=imperial&appid=' + STLNKEY
    m = requests.get(metricURL).json()
    c = requests.get(currURL).json()
    a = requests.get(aqiURL).json()
    f = requests.get(foreURL).json()
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

    current.update({
        'latitude': c['lat'],
        'longitude': c['lon'],
        'tzOffset': c['timezone_offset'],
        'temp': c['current']['temp'],
        'tempC': m['current']['temp'],
        'feelsLike': c['current']['feels_like'],
        'pressure': c['current']['pressure'],
        'windSpeed': c['current']['wind_speed'],
        'windDeg': c['current']['wind_deg'],
        'windGust': c['current']['wind_gust'] if 'wind_gust' in c['current'] else 0,
        'weatherDesc': c['current']['weather'][0]['description'],
        'weatherIcon': c['current']['weather'][0]['icon'],
        'humidity': c['current']['humidity'],
        'aqi': a['list'][0]['main']['aqi'],
        'pm25': a['list'][0]['components']['pm2_5'],
        'forecast': f['list'],
        'clouds': c['current']['clouds'],
        'rain': c['hourly'][0]['pop'],
        'tomorrow': c['daily'][1],
        'todaily': c['daily'][0],
        'hourly': c['hourly'],
        'moon_phase': c['daily'][0]['moon_phase'],
        'moonrise': moonrise,
        'moonset': moonset,
        'sunrise': sunrise,
        'sunset': sunset,
    })
    return JsonResponse(current, safe=False)
