export class Hourly {
    public hourlyElement: HTMLElement;
    private hourlyTitle: HTMLElement;
    private hourly: HTMLElement;

    constructor() {
        this.hourlyElement = document.getElementById('hfc')!;

        this.hourlyTitle = document.createElement('div');
        this.hourlyTitle.className = 'container-title';
        let span = document.createElement('span');
        span.className = 'fas fa-clock pad-right';
        this.hourlyTitle.append(span);
        this.hourlyTitle.append('Hourly Forecast');

        this.hourly = document.createElement('div');
        this.hourly.id = 'hourly';
        this.hourly.className = 'weather-hourly';

        this.hourlyElement.append(this.hourlyTitle);
        this.hourlyElement.append(this.hourly);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.hourlyElement.style.display = 'flex';
            this.hourlyElement.classList.remove('weather-loading');
            for (const child of this.hourlyElement.children) {
                if (child instanceof HTMLElement) {
                    child.style.visibility = 'visible';
                }
            }
        } else {
            for (const child of this.hourlyElement.children) {
                if (child instanceof HTMLElement) {
                    child.style.visibility = 'hidden';
                }
            }
            this.hourlyElement.classList.add('weather-loading');
        }
    }

    populate(data: any, icons: any) {
        if (data) {
            this.hourly.innerHTML = '';
            data.forEach((d: any) => {
                let hourContainer = document.createElement('div');
                hourContainer.className = 'hourly-container';
                let hourTitle = document.createElement('div');
                hourTitle.className = 'hourly-title';
                let hourIcon = document.createElement('span');
                hourIcon.className = 'hourly-icon';
                let hourTemps = document.createElement('div');
                hourTemps.className = 'hourly-temps';
        
                hourContainer.id = `${d.dt}Container`;
                hourTitle.id = `${d.dt}Title`;
                hourIcon.id = `${d.dt}Icon`;
                hourTemps.id = `${d.dt}Temps`;
        
                let theHour = new Date(d.dt * 1000);
                hourTitle.innerText = this.hourlyText(theHour.getHours());
                hourIcon.className += icons[d.weather[0].icon];
                hourTemps.innerText = `${Math.round(d.temp)}\xB0`;
        
                hourContainer.append(hourTitle);
                hourContainer.append(hourIcon);
                hourContainer.append(hourTemps);
                this.hourly.append(hourContainer);
            });
        }
    }

    hourlyText(h: number) {
        if (h > 12) {
            return `${h - 12} PM`;
        } else if (h == 12) {
            return "12 PM";
        } else if (h == 0) {
            return "12 AM";
        } else {
            return `${h} AM`;
        }
    }
}