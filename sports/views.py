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
NFL_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard"

# College Football
COLLEGE_FOOTBALL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams"
COLLEGE_FOOTBALL_EVENT_URL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/summary?event="
COLLEGE_FOOTBALL_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard"

# MLB
MLB_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams"
MLB_EVENT_URL = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event="
MLB_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard"

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
    @property
    @abstractmethod
    def scoreboard_url(self):
        pass
    @property
    @abstractmethod
    def event_url(self):
        pass

    def fetch_team_data(self, id: int):
        try:
            response = requests.get(f"{self.team_url}/{id}")
            response.raise_for_status()
            data = json.loads(response.text)
            try:
                record = data["team"]["record"]["items"][0]["summary"]
            except (KeyError, IndexError):
                record = "N/A"
            team = {
                "team": {
                    "id": data["team"]["id"],
                    "name": data["team"]["displayName"],
                    "logo": data["team"]["logos"][1]["href"],
                    "color": data["team"]["color"],
                    "alternateColor": data["team"]["alternateColor"],
                    "record": record,
                    "standing": data["team"]["standingSummary"],
                },
                "nextEvent": data["team"]["nextEvent"][0] if len(data["team"]["nextEvent"]) > 0 else None,
            }
            return team
        except requests.RequestException as err:
            return JsonResponse({"error": f"Failed to fetch team data: {err}"}, status=500)

    def fetch_scoreboard_data(self):
        try:
            response = requests.get(f"{self.scoreboard_url}")
            response.raise_for_status()
            data = json.loads(response.text)
            league = data["leagues"][0]
            board = {
                "league": {
                    "id": league["id"],
                    "name": league["abbreviation"].lower(),
                    "season": {
                        "year": league["season"]["year"],
                        "startDate": league["season"]["startDate"],
                        "endDate": league["season"]["endDate"],
                        "type": league["season"]["type"]["name"],
                    },
                    "logo": league["logos"][0]["href"],
                }
            }
            return board
        except requests.RequestException as err:
            return JsonResponse({"error": f"Failed to fetch scoreboard data: {err}"}, status=500)

    def fetch_schedule_data(self, id: int, year: int, type: int = 2):
        try:
            response = requests.get(f"{self.team_url}/{id}/schedule?season={year}&seasontype={type}")
            response.raise_for_status()
            data = json.loads(response.text)
            scheduleList = []
            for event in data["events"]:
                comp = event["competitions"][0]
                teamHome = comp["competitors"][0]["team"]["id"] == str(id)
                vsText = "vs" if teamHome else "@"
                opponent = comp["competitors"][1]["team"]["abbreviation"] if teamHome else comp["competitors"][0]["team"]["abbreviation"]
                opponentLogo = comp["competitors"][1]["team"]["logos"][0]["href"] if teamHome else comp["competitors"][0]["team"]["logos"][0]["href"]
                outcome = ""
                score = ""
                broadcast = comp["broadcasts"][0]["media"]["shortName"] if len(comp["broadcasts"]) > 0 else "TBD"
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
                            "broadcast": broadcast if broadcast else "TBD",
                        },
                    }
                )
            schedule = {
                "events": scheduleList,
                "byeWeek": data["byeWeek"] if "byeWeek" in data else 0,
                "season": data["season"],
                "requestedSeason": data["requestedSeason"]["name"],
            }
            return schedule
        except requests.RequestException as err:
            return JsonResponse({"error": f"Failed to fetch schedule data: {err}"}, status=500)

    def fetch_event_data(self, id: int):
        try:
            response = requests.get(f"{self.event_url}/{id}")
            response.raise_for_status()
            data = json.loads(response.text)
            eventData = {
                "standingGroups": data["standings"]["groups"],
                "home": data["header"]["competitions"][0]["competitors"][0],
                "away": data["header"]["competitions"][0]["competitors"][1],
                "predictor": data["predictor"],
            }
            return eventData
        except requests.RequestException as err:
            return JsonResponse({"error": f"Failed to fetch event data: {err}"}, status=500)

    @abstractmethod
    def process_data(self, data, id: int):
        pass

    def get(self, request, id: int):
        teamData = self.fetch_team_data(id)
        scoreboardData = self.fetch_scoreboard_data()
        scheduleData = self.fetch_schedule_data(id, scoreboardData["league"]["season"]["year"])
        processed_data = self.process_data(teamData, scoreboardData, scheduleData, id)
        return JsonResponse(processed_data)

class GetNFLTeam(BaseTeam):
    @property
    def team_url(self):
        return NFL_TEAM_URL

    @property
    def scoreboard_url(self):
        return NFL_SCOREBOARD_URL

    @property
    def event_url(self):
        return NFL_EVENT_URL

    def process_data(self, teamData, scoreboardData, scheduleData, id: int):
        nextEvent = ""
        nextEventID = ""
        if teamData["nextEvent"] == None:
            nextEvent = "Off Season"
            nextEventDate = "N/A"
            broadcast = "N/A"

        status = teamData["nextEvent"]["competitions"][0]["status"]["type"]["name"] if teamData["nextEvent"] != None else "OFF_SEASON"

        if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
            nextEvent = teamData["nextEvent"]["shortName"]
            nextEventDate = teamData["nextEvent"]["date"]
            broadcast = teamData["nextEvent"]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
            nextEventID = teamData["nextEvent"]["id"]
        elif (status == "STATUS_FINAL"):
            week = teamData["nextEvent"]["week"]["number"] + 1
            byeWeek = scheduleData["byeWeek"]
            if (week > byeWeek):
                week -= 2
            else:
                week -= 1
            if week in scheduleData["events"]:
                nextEvent = scheduleData["events"][week]["shortName"]
                nextEventDate = scheduleData["events"][week]["date"]
                broadcast = scheduleData["events"][week]["competition"]["broadcast"]
                nextEventID = scheduleData["events"][week]["competition"]["id"]
            else:
                nextEvent = teamData["nextEvent"]["shortName"]
                nextEventDate = teamData["nextEvent"]["date"]
                broadcast = teamData["nextEvent"]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
                nextEventID = teamData["nextEvent"]["id"]
        elif (status == "OFF_SEASON"):
            nextEvent = "Off Season"
            nextEventDate = "N/A"
            broadcast = "N/A"
            nextEventID = scheduleData["events"][-1]["competition"]["id"]
        if not nextEventID:
            print(f"Warning: nextEventID is empty for team {id}: {nextEventID}")
            return
        eventData = self.fetch_event_data(nextEventID)
        standingGroups = eventData["standingGroups"]
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
                        "pf": team["stats"][2]["displayValue"],
                        "pa": team["stats"][1]["displayValue"],
                        "t": team["stats"][3]["displayValue"],
                        "pct": team["stats"][4]["displayValue"],
                        "w": team["stats"][5]["displayValue"],
                        "record": team["stats"][6]["displayValue"],
                    })
                break
        team = {
            "team": teamData["team"],
            "league": scoreboardData["league"],
            "nextEvent": {
                "event": nextEvent,
                "date": nextEventDate,
                "broadcast": broadcast if broadcast != "NFL Sunday Ticket" else "TBD",
                "home": eventData["home"],
                "away": eventData["away"],
            },
            "schedule": scheduleData,
            "standings": standings,
            "standingHeader": standingHeader,
            "predictor": eventData["predictor"],
        }
        return team

class GetCollegeFootballTeam(BaseTeam):
    @property
    def team_url(self):
        return COLLEGE_FOOTBALL_TEAM_URL

    @property
    def scoreboard_url(self):
        return COLLEGE_FOOTBALL_SCOREBOARD_URL

    @property
    def event_url(self):
        return COLLEGE_FOOTBALL_EVENT_URL

    def process_data(self, teamData, scoreboardData, scheduleData, id: int):
        if teamData["nextEvent"] == None:
            team = {
                "team": teamData["team"],
                "nextEvent": {
                    "event": "Off Season",
                    "date": "N/A",
                    "broadcast": "N/A",
                },
            }
            return team
        status = teamData["nextEvent"]["competitions"][0]["status"]["type"]["name"]
        nextEvent = ""
        nextEventID = ""
        nextEventDate = ""
        broadcast = "TBD"
        # Handle schedule data safely
        season_status = "Unknown"
        if isinstance(scheduleData, dict) and "season" in scheduleData:
            season_status = scheduleData["season"]["name"]
        if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
            nextEvent = teamData["nextEvent"]["shortName"]
            nextEventDate = teamData["nextEvent"]["date"]
            broadcast = teamData["nextEvent"]["competition"][0]["broadcast"]
            record = teamData["team"]["record"]
        elif (status == "STATUS_FINAL"):
            if season_status == "Off Season":
                nextEvent = "Off Season"
                nextEventDate = "N/A"
                broadcast = "N/A"
                # record = f"{scoreboardData["league"]["season"]["year"]} Results"
            elif season_status == "Postseason":
                nextEvent = teamData["nextEvent"]["shortName"]
                nextEventDate = teamData["nextEvent"]["date"]
                broadcast = teamData["nextEvent"]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
            #     record = teamData["team"]["record"]
            # else:
            #     record = teamData["team"]["record"]

        nextEventID = teamData["nextEvent"]["id"]
        eventData = self.fetch_event_data(nextEventID)
        standingGroups = eventData["standingGroups"]
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
        team = {
            "team": teamData["team"],
            "league": scoreboardData["league"],
            "nextEvent": {
                "event": nextEvent,
                "date": nextEventDate,
                "broadcast": broadcast,
                "home": eventData["home"],
                "away": eventData["away"],
            },
            "schedule": scheduleData,
            "standings": standings,
            "standingHeader": standingHeader,
            "predictor": eventData["predictor"],
        }
        # print(team)
        return team

class GetMLBTeam(BaseTeam):
    @property
    def team_url(self):
        return MLB_TEAM_URL

    @property
    def scoreboard_url(self):
        return MLB_SCOREBOARD_URL

    @property
    def event_url(self):
        return MLB_EVENT_URL

    def process_data(self, teamData, scoreboardData, scheduleData, id: int):
        if (teamData["nextEvent"] == None):
            team = {
                "team": teamData["team"],
                "nextEvent": {
                    "event": "Off Season",
                    "date": "N/A",
                    "broadcast": "N/A",
                },
            }
            return team
        status = teamData["nextEvent"]["competitions"][0]["status"]["type"]["name"]
        nextEvent = ""
        nextEventID = ""
        nextEventDate = ""
        broadcast = ""
        if (status == "STATUS_SCHEDULED" or status == "STATUS_IN_PROGRESS"):
            nextEvent = teamData["nextEvent"]["shortName"]
            nextEventDate = teamData["nextEvent"]["date"]
            broadcast = teamData["nextEvent"]["competitions"][0]["broadcasts"][0]["media"]["shortName"]
            record = teamData["team"]["record"]
        elif (status == "STATUS_FINAL"):
            currYear = scoreboardData["league"]["season"]["year"]
            seasonStatus = scheduleData["season"]["name"]
            if (seasonStatus == "Off Season"):
                nextEvent = "Off Season"
                nextEventDate = "N/A"
                broadcast = "N/A"
                record = f"{currYear} Results"
            else:
                record = teamData["team"]["record"]
        team = {
            "team": teamData["team"],
            "league": scoreboardData["league"],
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
