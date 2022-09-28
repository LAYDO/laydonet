class Daily {
    public dailyElement: HTMLElement;
    private dailyTitle: HTMLElement;
    private daily: HTMLElement;
    static titles = [
        'todayTitle',
        'tomorrowTitle',
        'dayAfterTitle',
        'twoDayAfterTitle',
        'threeDayAfterTitle',
        'fourDayAfterTitle',
        'fiveDayAfterTitle',
        'sixDayAfterTitle',
        'sevenDayAfterTitle',
        'eightDayAfterTitle',
    ]
    static titleContent = [
        'today',
        'tomorrow',
        'dayAfter',
        'twoDayAfter',
        'threeDayAfter',
        'fourDayAfter',
        'fiveDayAfter',
        'sixDayAfter',
        'sevenDayAfter',
        'eightDayAfter',
    ]
    private now: Date;

    constructor() {
        this.dailyElement = document.getElementById('dailyForecast')!;

        this.dailyTitle = document.createElement('div');
        this.dailyTitle.className = 'container-title';
        let span = document.createElement('span');
        span.className = 'fas fa-calendar pad-right';
        this.dailyTitle.append(span);
        this.dailyTitle.append('10-day Forecast');

        this.daily = document.createElement('div');
        this.daily.id = 'forecast';
        this.daily.className = 'weather-forecast';

        this.dailyElement.append(this.dailyTitle);
        this.dailyElement.append(this.daily);
        this.now = new Date();
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.dailyElement.style.display = 'inherit';
        } else {
            this.dailyElement.style.display = 'none';
        }
    }

    populate(data: any, icons: any) {
        if (data) {
            this.daily.innerHTML = '';
            data.forEach((d: any, idx: number) => {
                let foreContainer = document.createElement('div');
                foreContainer.className = 'forecast-container';
                let foreTitle = document.createElement('div');
                foreTitle.className = 'forecast-title';
                let foreIcon = document.createElement('span');
                foreIcon.className = 'forecast-icon';
                let foreTemps = document.createElement('div');
                foreTemps.className = 'forecast-temps';
                let foreHigh = document.createElement('div');
                foreHigh.className = 'forecast-high';
                let foreLow = document.createElement('div');
                foreLow.className = 'forecast-low';
                foreContainer.id = `${Daily.titleContent[idx]}Container`;
                foreTitle.id = `${Daily.titleContent[idx]}Title`;
                foreIcon.id = `${Daily.titleContent[idx]}Icon`;
                foreTemps.id = `${Daily.titleContent[idx]}Temps`;
                foreHigh.id = `${Daily.titleContent[idx]}High`;
                foreLow.id = `${Daily.titleContent[idx]}Low`;
                foreIcon.className += icons[d.weather[0].icon];
                foreHigh.innerText = `${Math.round(d.temp.max)}\xB0`;
                foreLow.innerText = `${Math.round(d.temp.min)}\xB0`;
                foreContainer.append(foreTitle);
                foreContainer.append(foreIcon);
                foreTemps.append(foreHigh);
                foreTemps.append(foreLow);
                foreContainer.append(foreTemps);
                this.daily.append(foreContainer);
            });
        }

        for (let i = 0; i < 10; i++) {
            let day = new Date();
            day.setDate(this.now.getDate() + i);
            var dayDate = day.toLocaleDateString("en-US", { weekday: "short" });
            document.getElementById(Daily.titles[i])!.innerText = `${i == 0 ? 'Today' : dayDate}`;
        }
    }
}