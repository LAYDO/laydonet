from django.shortcuts import render
from django.http import JsonResponse
import requests, json

NFL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/"

# Create your views here.
def sports(request):
    return render(request, "sports.html")

# Fetch NFL team data
def getNFLTeam(request, id: int):
    url = f"{NFL_TEAM_URL}{id}"
    response = requests.get(url)
    data = json.loads(response.text)
    name = data["team"]["displayName"]
    logo = data["team"]["logos"][0]["href"]
    team = {
        "id": id,
        "name": name,
        "logo": logo
    }
    return JsonResponse(team)