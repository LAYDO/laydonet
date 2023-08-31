import requests

from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from django.shortcuts import render
from django.http import JsonResponse
from bs4 import BeautifulSoup

startTimes = []
endTimes = []
weekClasses = []
todaySchedule = {}
p = []
aieLunch = '2'
aiePlan = '8'
wknd = {
    4: 3,
    5: 2,
    6: 1
}


# @user_passes_test(lambda user: user.is_superuser)
def schedule(request):
    return render(request, 'schedule.html', {})


def getSchedule(self):
    # Specify Central Time zone
    central_timezone = ZoneInfo("America/Chicago")

    # Get the current time in Central Time zone
    today = datetime.now(central_timezone)

    URL = "https://www.kenwoodacademy.org/apps/bell_schedules/"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    for i in range(1, 4):
        scheduleElements = soup.find_all("div", class_=f"col{i}")
        for schedElement in scheduleElements:
            if (i == 1):
                datas = schedElement.find_all("div", class_="bell-description")
            else:
                datas = schedElement.find_all("div", class_="row-value")
            for data in datas:
                # print(data)
                match i:
                    case 1:
                        weekClasses.append(str(data.text)) #.replace('\n','').replace('\xa0','').replace('\t','')))
                    case 2:
                        startTimes.append(str(data.text)) # .replace('\n','').replace('\xa0','').replace('\t','')))
                    case 3:
                        endTimes.append(str(data.text)) # .replace('\n','').replace('\xa0','').replace('\t','')))
    # print(f'CLASSES:\n{weekClasses}\nSTART:\n{startTimes}\nEND:\n{endTimes}\n')
    # print(f'weekday: {today.weekday()}')
    if (today.weekday() >= 0 and today.weekday() <= 4 and today.weekday() != 2):
        print('========NORMAL==========')
        p.clear()
        temp = Schedule(
            {"startTimes": startTimes[0:9], "endTimes": endTimes[0:9],"periods": weekClasses[0:9]}, today)
        constructSchedule(temp)
        clearArr()
    elif (today.weekday() == 2):
        print('========ADVISORY==========')
        p.clear()
        temp = Schedule(
            {"startTimes": startTimes[9:18], "endTimes": endTimes[9:18], "periods": weekClasses[9:18]}, today)
        constructSchedule(temp)
        clearArr()
    else:
        p.clear()
        temp = Schedule({}, today)
        constructSchedule(temp)
        clearArr()
    res = {**todaySchedule}
    todaySchedule.clear()
    return JsonResponse(res, safe=False)


def constructSchedule(s):
    todaySchedule.update({
        'dayOfWeek': s.dayOfWeek,
        'summerTime': s.summerTime,
        'weekend': s.weekend,
        'schoolStart': s.schoolStart,
        'todayStart': s.todayStart,
        'tomorrowStart': s.tomorrowStart,
        'periods': p,
    })


def constructPeriods(x):
    p.append({
        'id': x.id,
        'title': x.title,
        'schedule': x.scheduleText,
        'start': x.start,
        'end': x.end,
        'plan': x.plan
    })


def clearArr():
    # p.clear()
    weekClasses.clear()
    startTimes.clear()
    endTimes.clear()


class Schedule:
    dayOfWeek = datetime.today().weekday()
    summerTime = datetime.today(
    ).month > 5 and datetime.today().month < 8
    schoolStart = datetime(2023, 8, 14, 9, 00)

    def __init__(self, data, today):
        print(f'self: {self} data: {data} today: {today}')
        if (data and len(data['startTimes']) == len(data['endTimes']) == len(data['periods'])):
            for idx, period in enumerate(data['periods']):
                if ('period' in period.lower().replace(' ', '') or 'advisory' in period.lower().replace(' ', '')):
                    x = Period(period, data['startTimes'][idx], data['endTimes'][idx])
                    constructPeriods(x)
        self.weekend = True if datetime.today().weekday() > 4 else False
        self.todayStart = p[0]['start'] if p else 0
        self.tomorrowStart = self.todayStart + timedelta(days=1) if self.dayOfWeek < 4 else 0
        if self.weekend and not self.summerTime:
            today = datetime.today()
            self.schoolStart = datetime(today.year, today.month, today.day + wknd[today.weekday()], 7, 55)


class Period:
    def __init__(self, id, start, end):
        t = datetime.today()

        startH = start.split(':')[0].strip()
        startM = start.split(':')[1].split(' ')[0].strip()
        endH = end.split(':')[0].strip()
        endM = end.split(':')[1].strip()[0:2]
        meridiemStart = start.split(' ')[1][0:1]
        meridiemEnd = end.split(' ')[1][0:1]
        if meridiemEnd == 'p' and int(endH) < 12:
            endH = int(endH) + 12
        if meridiemStart == 'p' and int(startH) < 12:
            startH = int(startH) + 12
        self.id = id.lower().replace(' ', '')
        self.title = id
        self.scheduleText = f"{start} - {end}"
        self.start = datetime(t.year, t.month, t.day, int(startH), int(startM))
        self.end = datetime(t.year, t.month, t.day, int(endH), int(endM))
        self.plan = True if (self.id.endswith(
            aiePlan) and 'period' in self.id) else False
