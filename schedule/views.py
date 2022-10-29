import json
import requests
import datetime
from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse
from bs4 import BeautifulSoup

mTimes = []
fTimes = []
mClasses = []
fClasses = []
todaySchedule = {}
p = []
aieLunch = '2'
aiePlan = '3'
wknd = {
    4: 3,
    5: 2,
    6: 1
}


# @user_passes_test(lambda user: user.is_superuser)
def schedule(request):
    return render(request, 'schedule.html', {})


def getSchedule(self):
    today = datetime.datetime.today()
    URL = "https://risdon.rentonschools.us/our-school/bell-schedule"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    results = soup.find(id="fsEl_25897")
    scheduleElements = results.find_all("table", class_="fs_style_28")
    for idx, schedElement in enumerate(scheduleElements):
        mT = (idx % 2 == 0)
        datas = schedElement.find_all("td")
        for idt, data in enumerate(datas):
            if (idt % 2 == 0):
                mTimes.append(str(data.text)) if mT else fTimes.append(
                    str(data.text))
            else:
                mClasses.append(str(data.text)) if mT else fClasses.append(
                    str(data.text.replace('\n','').replace('\xa0','')))
    if (today.weekday() >= 0 and today.weekday() < 4):
        print('========MONTHURS==========')
        # print(mTimes, mClasses)
        p.clear()
        temp = Schedule(
            {"times": mTimes, "periods": mClasses}, today)
        constructSchedule(temp)
        clearArr()
    elif (today.weekday() == 4):
        print('========FRIDAY==========')
        p.clear()
        temp = Schedule(
            {"times": fTimes, "periods": fClasses}, today)
        constructSchedule(temp)
        clearArr()
    else:
        p.clear()
        temp = Schedule({}, today)
        constructSchedule(temp)
        clearArr()
    # print(json.dumps(todaySchedule.__dict__, indent=4, sort_keys=True, default=str))
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
    mClasses.clear()
    fClasses.clear()
    mTimes.clear()
    fTimes.clear()


class Schedule:
    dayOfWeek = datetime.datetime.today().weekday()
    summerTime = datetime.datetime.today(
    ).month > 5 and datetime.datetime.today().month < 8
    schoolStart = datetime.datetime(2022, 8, 31, 7, 55)

    def __init__(self, data, today):
        # print(data)
        if (data and len(data['times']) == len(data['periods'])):
            for idx, period in enumerate(data['periods']):
                if ('period' in period.lower().replace(' ', '') or 'home' in period.lower().replace(' ', '')):
                    x = Period(period, data['times'][idx])
                    constructPeriods(x)
                elif (period.startswith(aieLunch) and 'lunch' in period.lower().replace(' ', '')):
                    x = Period(period, data['times'][idx])
                    constructPeriods(x)
        self.weekend = True if datetime.datetime.today().weekday() > 4 else False
        self.todayStart = p[0]['start'] if p else 0
        self.tomorrowStart = self.todayStart + \
            datetime.timedelta(days=1) if self.dayOfWeek < 4 else 0
        if self.weekend and not self.summerTime:
            today = datetime.datetime.today()
            self.schoolStart = datetime.datetime(
                today.year, today.month, today.day + wknd[today.weekday()], 7, 55)
        # self.meeting = Period()


class Period:
    def __init__(self, id, range):
        t = datetime.datetime.today()
        arr = range.split('-')
        startH = arr[0].split(':')[0].strip()
        startM = arr[0].split(':')[1].strip()
        endH = arr[1].split(':')[0].strip()
        endM = arr[1].split(':')[1].strip()[0:2]
        meridiem = arr[1].split(' ')[2][0:1]
        if meridiem == 'p' and int(endH) < 12:
            endH = int(endH) + 12
            if int(startH) < 12:
                startH = int(startH) + 12
        # print(meridiem, endH)
        self.id = id.lower().replace(' ', '')
        self.title = id
        self.scheduleText = range
        self.start = datetime.datetime(
            t.year, t.month, t.day, int(startH), int(startM))
        self.end = datetime.datetime(
            t.year, t.month, t.day, int(endH), int(endM))
        self.plan = True if (self.id.startswith(
            aiePlan) and 'period' in self.id) else False
