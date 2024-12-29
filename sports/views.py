from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
import requests, json
from abc import ABC, abstractmethod

# ESPN API URLs
########################################################################################

# NFL
NFL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams"
NFL_EVENT_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event="

# College Football
COLLEGE_FOOTBALL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams"
COLLEGE_FOOTBALL_EVENT_URL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event="

# MLB
MLB_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams"

# Create your views here.
def sports(request):
    return render(request, "sports.html")

def team(request, league: str, id: int):
    if league == "nfl":
        teamData = getNFLTeam(request, id)
    elif league == "ncaaf":
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
        scheduleURL = f"{NFL_TEAM_URL}/{id}/schedule?season="
        currYear = data["team"]["nextEvent"][0]["date"].split("-")[0]
        scheduleURL += currYear
        response = requests.get(scheduleURL)
        schedData = json.loads(response.text)
        scheduleList = []
        nextEvent = ""
        for event in schedData["events"]:
            comp = event["competitions"][0]
            teamHome = comp["competitors"][0]["team"]["id"] == str(id)
            vsText = "vs" if teamHome else "@"
            opponent = comp["competitors"][1]["team"]["abbreviation"] if teamHome else comp["competitors"][0]["team"]["abbreviation"]
            opponentLogo = comp["competitors"][1]["team"]["logos"][0]["href"] if teamHome else comp["competitors"][0]["team"]["logos"][0]["href"]
            outcome = ""
            score = ""
            if ("winner" in comp["competitors"][0]):
                outcome = "W" if (teamHome and comp["competitors"][0]["winner"]) or (not teamHome and comp["competitors"][1]["winner"]) else "L"
                if (comp["competitors"][0]["winner"] == False and comp["competitors"][1]["winner"] == False):
                    outcome = "T"
            if ("score" in comp["competitors"][0] and "score" in comp["competitors"][1]):
                if (comp["competitors"][0]["score"] and comp["competitors"][1]["score"] and comp["competitors"][0]["score"]["value"] > comp["competitors"][1]["score"]["value"]):
                    score = f"{comp['competitors'][0]['score']['displayValue']} - {comp['competitors'][1]['score']['displayValue']}"
                elif (comp["competitors"][0]["score"] and comp["competitors"][1]["score"] and comp["competitors"][0]["score"]["value"] < comp["competitors"][1]["score"]["value"]):
                    score = f"{comp['competitors'][1]['score']['displayValue']} - {comp['competitors'][0]['score']['displayValue']}"
                else:
                    score = ""
            scheduleList.append(
                {
                    "shortName": event["shortName"],
                    "date": event["date"],
                    "competition": {
                        "id": comp["id"],
                        "vsText": vsText,
                        "opponent": opponent,
                        "opponentLogo": opponentLogo,
                        "outcome": outcome,
                        "score": score,
                    },
                }
            )
        if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
            nextEvent = data["team"]["nextEvent"][0]["shortName"]
            nextEventDate = data["team"]["nextEvent"][0]["date"]
            broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
        elif (status == "STATUS_FINAL"):
            week = data["team"]["nextEvent"][0]["week"]["number"] + 1
            byeWeek = schedData["byeWeek"]
            if (week > byeWeek):
                week -= 2
            else:
                week -= 1
            if (schedData["events"][week] is not None):
                nextEvent = schedData["events"][week]["shortName"]
                nextEventDate = schedData["events"][week]["date"]
                broadcast = schedData["events"][week]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
            else:
                nextEvent = data["team"]["nextEvent"][0]["shortName"]
                nextEventDate = data["team"]["nextEvent"][0]["date"]
                broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
        nextEventID = data["team"]["nextEvent"][0]["id"]
        response = requests.get(f"{NFL_EVENT_URL}{nextEventID}")
        eventData = json.loads(response.text)
        standingGroups = eventData["standings"]["groups"]
        standings = []
        standingHeader = ""
        for group in standingGroups:
            if any(entry["id"] == str(id) for entry in group["standings"]["entries"]):
                standingHeader = group["header"]
                for team in group["standings"]["entries"]:
                    standings.append({
                        "id": team["id"],
                        "team": team["team"],
                        "logo": team["logo"][0]["href"],
                        "l": team["stats"][0]["displayValue"],
                        "pa": team["stats"][1]["displayValue"],
                        "pf": team["stats"][2]["displayValue"],
                        "t": team["stats"][3]["displayValue"],
                        "pct": team["stats"][4]["displayValue"],
                        "w": team["stats"][5]["displayValue"],
                        "record": team["stats"][6]["displayValue"],
                    })
                break
        home = eventData["header"]["competitions"][0]["competitors"][0]
        away = eventData["header"]["competitions"][0]["competitors"][1]
        team = {
            "id": data["team"]["id"],
            "name": data["team"]["displayName"],
            "league": "nfl",
            "logo": data["team"]["logos"][0]["href"],
            "color": data["team"]["color"],
            "alternateColor": data["team"]["alternateColor"],
            "record": data["team"]["record"]["items"][0]["summary"],
            "standing": data["team"]["standingSummary"],
            "nextEvent": {
                "event": nextEvent,
                "date": nextEventDate,
                "broadcast": broadcast,
                "home": home,
                "away": away,
            },
            "schedule": scheduleList,
            "seasonYear": data["team"]["nextEvent"][0]["season"]["year"],
            "standings": standings,
            "standingHeader": standingHeader,
        }
        return team

class GetCollegeFootballTeam(BaseTeam):
    @property
    def team_url(self):
        return COLLEGE_FOOTBALL_TEAM_URL

    def process_data(self, data, id: int):
        status = data["team"]["nextEvent"][0]["competitions"][0]["status"]["type"]["name"]
        scheduleURL = f"{COLLEGE_FOOTBALL_TEAM_URL}/{id}/schedule?season="
        currYear = data["team"]["nextEvent"][0]["date"].split("-")[0]
        scheduleURL += currYear
        response = requests.get(scheduleURL)
        schedData = json.loads(response.text)
        scheduleList = []
        for event in schedData["events"]:
            comp = event["competitions"][0]
            teamHome = comp["competitors"][0]["team"]["id"] == str(id)
            vsText = "vs" if teamHome else "@"
            opponent = (
                comp["competitors"][1]["team"]["abbreviation"]
                if teamHome
                else comp["competitors"][0]["team"]["abbreviation"]
            )
            opponentLogo = (
                comp["competitors"][1]["team"]["logos"][0]["href"]
                if teamHome
                else comp["competitors"][0]["team"]["logos"][0]["href"]
            )
            outcome = ""
            score = ""
            if "winner" in comp["competitors"][0]:
                outcome = (
                    "W"
                    if (teamHome and comp["competitors"][0]["winner"])
                    or (not teamHome and comp["competitors"][1]["winner"])
                    else "L"
                )
                if (
                    comp["competitors"][0]["winner"] == False
                    and comp["competitors"][1]["winner"] == False
                ):
                    outcome = "T"
            if "score" in comp["competitors"][0] and "score" in comp["competitors"][1]:
                if (
                    comp["competitors"][0]["score"]
                    and comp["competitors"][1]["score"]
                    and comp["competitors"][0]["score"]["value"]
                    > comp["competitors"][1]["score"]["value"]
                ):
                    score = f"{comp['competitors'][0]['score']['displayValue']} - {comp['competitors'][1]['score']['displayValue']}"
                elif (
                    comp["competitors"][0]["score"]
                    and comp["competitors"][1]["score"]
                    and comp["competitors"][0]["score"]["value"]
                    < comp["competitors"][1]["score"]["value"]
                ):
                    score = f"{comp['competitors'][1]['score']['displayValue']} - {comp['competitors'][0]['score']['displayValue']}"
                else:
                    score = ""
            scheduleList.append(
                {
                    "shortName": event["shortName"],
                    "date": event["date"],
                    "competition": {
                        "id": comp["id"],
                        "vsText": vsText,
                        "opponent": opponent,
                        "opponentLogo": opponentLogo,
                        "outcome": outcome,
                        "score": score,
                    },
                }
            )
        if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
            nextEvent = data["team"]["nextEvent"][0]["shortName"]
            nextEventDate = data["team"]["nextEvent"][0]["date"]
            broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
            record = data["team"]["record"]["items"][0]["summary"]
        elif (status == "STATUS_FINAL"):
            seasonStatus = schedData["season"]["name"]
            if (seasonStatus == "Off Season"):
                nextEvent = "Off Season"
                nextEventDate = "N/A"
                broadcast = "N/A"
                record = f"{currYear} Results"
            elif (seasonStatus == "Postseason"):
                print("POSTSEASON")
                nextEvent = data["team"]["nextEvent"][0]["shortName"]
                nextEventDate = data["team"]["nextEvent"][0]["date"]
                broadcast = data["team"]["nextEvent"][0]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
                record = data["team"]["record"]["items"][0]["summary"]
            else:
                record = data["team"]["record"]["items"][0]["summary"]

        nextEventID = data["team"]["nextEvent"][0]["id"]
        response = requests.get(f"{COLLEGE_FOOTBALL_EVENT_URL}{nextEventID}")
        eventData = json.loads(response.text)
        standingGroups = eventData["standings"]["groups"]
        standings = []
        standingHeader = ""
        for group in standingGroups:
            if any(entry["id"] == str(id) for entry in group["standings"]["entries"]):
                standingHeader = group["header"]
                for entry in group["standings"]["entries"]:
                    standings.append({
                        "id": entry["id"],
                        "team": entry["team"],
                        "logo": entry["logo"][0]["href"],
                        "overall": entry["stats"][0]["displayValue"],
                        "conference": entry["stats"][1]["displayValue"],
                    })
                break
        home = eventData["header"]["competitions"][0]["competitors"][0]
        away = eventData["header"]["competitions"][0]["competitors"][1]
        team = {
            "id": data["team"]["id"],
            "name": data["team"]["displayName"],
            "league": "ncaaf",
            "logo": data["team"]["logos"][1]["href"],
            "color": data["team"]["color"],
            "alternateColor": data["team"]["alternateColor"],
            "record": record,
            "standing": data["team"]["standingSummary"],
            "nextEvent": {
                "event": nextEvent,
                "date": nextEventDate,
                "broadcast": broadcast,
                "home": home,
                "away": away,
            },
            "schedule": scheduleList,
            "seasonYear": data["team"]["nextEvent"][0]["season"]["year"],
            "standings": standings,
            "standingHeader": standingHeader,
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
            "league": "mlb",
            "logo": data["team"]["logos"][1]["href"],
            "color": data["team"]["color"],
            "alternateColor": data["team"]["alternateColor"],
            "record": record,
            "standing": data["team"]["standingSummary"],
            "nextEvent": {
                "event": nextEvent,
                "date": nextEventDate,
                "broadcast": broadcast,
            },
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
