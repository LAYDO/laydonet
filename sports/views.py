from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
import requests, json
from abc import ABC, abstractmethod

NFL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
COLLEGE_FOOTBALL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams"
MLB_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams"

# Create your views here.
def sports(request):
    return render(request, "sports.html")

def team(request, league: str, id: int):
    if league == "nfl":
        teamData = getNFLTeam(request, id)
    elif league == "college-football":
        teamData = getCollegeFootballTeam(request, id)
    elif league == "mlb":
        teamData = getMLBTeam(request, id)
    # Convert the JsonResponse to a dictionary
    teamData = json.loads(teamData.content)
    return render(request, "team.html", teamData)

class BaseTeam(ABC, View):
    @property
    @abstractmethod
    def team_url(self):
        pass

    def fetch_team_data(self, id: int):
        url = f"{self.team_url}/{id}"
        response = requests.get(url)
        if response.status_code != 200:
            return JsonResponse({"error": "Failed to fetch team data"}, status=500)
        return json.loads(response.text), 200
    
    @abstractmethod
    def process_data(self, data, id: int):
        pass

    def get(self, request, id: int):
        data, status = self.fetch_team_data(id)
        if status != 200:
            return JsonResponse(data, status=status)
        processed_data = self.process_data(data, id)
        return JsonResponse(processed_data)
    
class GetNFLTeam(BaseTeam):
    @property
    def team_url(self):
        return NFL_TEAM_URL
    
    def process_data(self, data, id: int):
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
            "id": data["team"]["id"],
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
        return team

class GetCollegeFootballTeam(BaseTeam):
    @property
    def team_url(self):
        return COLLEGE_FOOTBALL_TEAM_URL
    
    def process_data(self, data, id: int):
        status = data["team"]["nextEvent"][0]["competitions"][0]["status"]["type"]["name"]
        if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
            nextEvent = data["team"]["nextEvent"][0]["shortName"]
            nextEventDate = data["team"]["nextEvent"][0]["date"]
            broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
            record = data["team"]["record"]["items"][0]["summary"]
        elif (status == "STATUS_FINAL"):
            scheduleURL = f"{COLLEGE_FOOTBALL_TEAM_URL}/{id}/schedule?season="
            currYear = data["team"]["nextEvent"][0]["date"].split("-")[0]
            scheduleURL += currYear
            response = requests.get(scheduleURL)
            schedData = json.loads(response.text)
            seasonStatus = schedData["season"]["name"]
            if (seasonStatus == "Off Season"):
                nextEvent = "Off Season"
                nextEventDate = "N/A"
                broadcast = "N/A"
                record = f"{currYear} Results"
            else:
                record = data["team"]["record"]["items"][0]["summary"]
        team = {
            "id": data["team"]["id"],
            "name": data["team"]["displayName"],
            "logo": data["team"]["logos"][1]["href"],
            "color": data["team"]["color"],
            "alternateColor": data["team"]["alternateColor"],
            "record": record,
            "standing": data["team"]["standingSummary"],
            "nextEvent": nextEvent,
            "nextEventDate": nextEventDate,
            "nextEventBroadcast": broadcast,
        }
        return team
    
class GetMLBTeam(BaseTeam):
    @property
    def team_url(self):
        return MLB_TEAM_URL
    
    def process_data(self, data, id: int):
        status = data["team"]["nextEvent"][0]["competitions"][0]["status"]["type"]["name"]
        if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
            nextEvent = data["team"]["nextEvent"][0]["shortName"]
            nextEventDate = data["team"]["nextEvent"][0]["date"]
            broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
            record = data["team"]["record"]["items"][0]["summary"]
        elif (status == "STATUS_FINAL"):
            scheduleURL = f"{MLB_TEAM_URL}/{id}/schedule?season="
            currYear = data["team"]["nextEvent"][0]["date"].split("-")[0]
            scheduleURL += currYear
            response = requests.get(scheduleURL)
            schedData = json.loads(response.text)
            seasonStatus = schedData["season"]["name"]
            if (seasonStatus == "Off Season"):
                nextEvent = "Off Season"
                nextEventDate = "N/A"
                broadcast = "N/A"
                record = f"{currYear} Results"
            else:
                record = data["team"]["record"]["items"][0]["summary"]
        team = {
            "id": data["team"]["id"],
            "name": data["team"]["displayName"],
            "logo": data["team"]["logos"][1]["href"],
            "color": data["team"]["color"],
            "alternateColor": data["team"]["alternateColor"],
            "record": record,
            "standing": data["team"]["standingSummary"],
            "nextEvent": nextEvent,
            "nextEventDate": nextEventDate,
            "nextEventBroadcast": broadcast,
        }
        return team
    
getNFLTeam = GetNFLTeam.as_view()
getCollegeFootballTeam = GetCollegeFootballTeam.as_view()
getMLBTeam = GetMLBTeam.as_view()

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