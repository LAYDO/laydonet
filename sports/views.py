from django.shortcuts import render
from django.http import JsonResponse
import requests, json

NFL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
COLLEGE_FOOTBALL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams"

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

    status = data["team"]["nextEvent"][0]["competitions"][0]["status"]["type"]["name"]
    if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
        nextEvent = data["team"]["nextEvent"][0]["shortName"]
        nextEventDate = data["team"]["nextEvent"][0]["date"]
        broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
    elif (status == "STATUS_FINAL"):
        week = data["team"]["nextEvent"][0]["week"]["number"] + 1
        scheduleURL = f"{NFL_TEAM_URL}/{id}/schedule?season="
        currYear = data["team"]["nextEvent"][0]["date"].split("-")[0]
        scheduleURL += currYear
        response = requests.get(scheduleURL)
        schedData = json.loads(response.text)
        byeWeek = schedData["byeWeek"]
        if (week > byeWeek):
            week -= 2
        else:
            week -= 1
        nextEvent = schedData["events"][week]["shortName"]
        nextEventDate = schedData["events"][week]["date"]
        broadcast = schedData["events"][week]["competitions"][0]["broadcasts"][0]["media"]["shortName"]

    team = {
        "id": id,
        "name": data["team"]["displayName"],
        "logo": data["team"]["logos"][0]["href"],
        "color": data["team"]["color"],
        "alternateColor": data["team"]["alternateColor"],
        "record": data["team"]["record"]["items"][0]["summary"],
        "standing": data["team"]["standingSummary"],
        "nextEvent": nextEvent,
        "nextEventDate": nextEventDate,
        "nextEventBroadcast": broadcast,
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

def getCollegeFootballTeam(request, id: int):
    url = f"{COLLEGE_FOOTBALL_TEAM_URL}/{id}"
    response = requests.get(url)

    if response.status_code != 200:
        return JsonResponse({"error": "Failed to fetch team data"}, status=500)

    data = json.loads(response.text)

    status = data["team"]["nextEvent"][0]["competitions"][0]["status"]["type"]["name"]
    if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
        nextEvent = data["team"]["nextEvent"][0]["shortName"]
        nextEventDate = data["team"]["nextEvent"][0]["date"]
        broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
    elif (status == "STATUS_FINAL"):
        week = data["team"]["nextEvent"][0]["week"]["number"] + 1
        scheduleURL = f"{COLLEGE_FOOTBALL_TEAM_URL}/{id}/schedule?season="
        currYear = data["team"]["nextEvent"][0]["date"].split("-")[0]
        scheduleURL += currYear
        response = requests.get(scheduleURL)
        schedData = json.loads(response.text)
        byeWeek = schedData["byeWeek"]
        if (week > byeWeek):
            week -= 2
        else:
            week -= 1
        nextEvent = schedData["events"][week]["shortName"]
        nextEventDate = schedData["events"][week]["date"]
        broadcast = schedData["events"][week]["competitions"][0]["broadcasts"][0]["media"]["shortName"]

    team = {
        "id": id,
        "name": data["team"]["displayName"],
        "logo": data["team"]["logos"][1]["href"],
        "color": data["team"]["color"],
        "alternateColor": data["team"]["alternateColor"],
        "record": data["team"]["record"]["items"][0]["summary"],
        "standing": data["team"]["standingSummary"],
        "nextEvent": nextEvent,
        "nextEventDate": nextEventDate,
        "nextEventBroadcast": broadcast,
    }
    return JsonResponse(team)