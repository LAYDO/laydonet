from django.shortcuts import render
from django.http import JsonResponse
import requests, json
from datetime import datetime
from zoneinfo import ZoneInfo

NFL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"

# Create your views here.
def sports(request):
    return render(request, "sports.html")

# Fetch NFL team data
def getNFLTeam(request, id: int):
    url = f"{NFL_TEAM_URL}/{id}"
    response = requests.get(url)

    if response.status_code != 200:
        return JsonResponse({"error": "Failed to fetch team data"}, status=500)
    
    data = json.loads(response.text)

    user_timezone = request.GET.get("tz", "UTC")
    try:
        user_tz = ZoneInfo(user_timezone)
    except Exception:
        user_tz = ZoneInfo("UTC")


    # Convert date to local time
    utc_date = datetime.fromisoformat(data["team"]["nextEvent"][0]["date"])
    local_date = utc_date.astimezone(user_tz)
    formatted_date = local_date.strftime("%m/%d %I:%M %p")
    team = {
        "id": id,
        "name": data["team"]["displayName"],
        "logo": data["team"]["logos"][0]["href"],
        "color": data["team"]["color"],
        "alternateColor": data["team"]["alternateColor"],
        "record": data["team"]["record"]["items"][0]["summary"],
        "standing": data["team"]["standingSummary"],
        "nextEvent": data["team"]["nextEvent"][0]["shortName"],
        "nextEventDate": formatted_date,
    }
    return JsonResponse(team)

def getNFLTeams():
    response = requests.get(NFL_TEAM_URL)
    data = json.loads(response.text)
    teams = []
    for team in data["sports"][0]["leagues"][0]["teams"]:
        teams.append({
            "id": team["id"],
            "name": team["team"]["displayName"],
            "logo": team["team"]["logos"][0]["href"],
            "color": team["team"]["color"],
            "alternateColor": team["team"]["alternateColor"],
            "record": team["team"]["record"]["items"][0]["summary"],
            "standing": team["team"]["standingSummary"],
            "nextEvent": team["team"]["nextEvent"][0]["shortName"],
            "nextEventDate": team["team"]["nextEvent"][0]["date"],
        })
    return JsonResponse(teams)