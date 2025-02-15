export class TeamStandings {
    container: HTMLElement;
    standingsContainer: HTMLElement;
    standingsTitle: HTMLElement;
    standingsElement: HTMLElement;
    standingsHeader: HTMLElement;
    standingsRecords: Array<HTMLElement>;

    constructor(container: HTMLElement) {
        this.container = container;

        this.standingsContainer = document.createElement('div');
        this.standingsContainer.classList.add('team-standings-container');
        this.container.appendChild(this.standingsContainer);

        this.standingsTitle = document.createElement('div');
        this.standingsTitle.classList.add('team-standing-title');
        this.standingsTitle.textContent = 'Standings';
        this.standingsContainer.appendChild(this.standingsTitle);

        this.standingsElement = document.createElement('div');
        this.standingsElement.classList.add('team-standing');
        this.standingsContainer.appendChild(this.standingsElement);

        this.standingsHeader = document.createElement('div');
        this.standingsHeader.classList.add('team-standing-record');
        this.standingsElement.appendChild(this.standingsHeader);

        this.standingsRecords = [];
    }

    populateStandings(data: any) {
        this.standingsTitle.textContent = data.standingHeader;
        this.standingsElement.innerHTML = '';
        this.buildStandingsHeader(data.league.name);
        this.buildStandings(data.league.name, data);
    }

    buildStandingsHeader(league: string) {
        this.standingsHeader.innerHTML = '';
        let teamHeader = document.createElement('div');
        teamHeader.classList.add('team-standing-team-center');
        teamHeader.textContent = 'Team';
        this.standingsHeader.appendChild(teamHeader);
        switch (league) {
            case 'nfl':
                let wHeader = document.createElement('div');
                wHeader.classList.add('team-standing-wins');
                wHeader.textContent = 'W';
                this.standingsHeader.appendChild(wHeader);

                let lHeader = document.createElement('div');
                lHeader.classList.add('team-standing-losses');
                lHeader.textContent = 'L';
                this.standingsHeader.appendChild(lHeader);

                let tHeader = document.createElement('div');
                tHeader.classList.add('team-standing-ties');
                tHeader.textContent = 'T';
                this.standingsHeader.appendChild(tHeader);

                let pctHeader = document.createElement('div');
                pctHeader.classList.add('team-standing-pct');
                pctHeader.textContent = 'PCT';
                this.standingsHeader.appendChild(pctHeader);

                let pfHeader = document.createElement('div');
                pfHeader.classList.add('team-standing-pf');
                pfHeader.textContent = 'PF';
                this.standingsHeader.appendChild(pfHeader);

                let paHeader = document.createElement('div');
                paHeader.classList.add('team-standing-pa');
                paHeader.textContent = 'PA';
                this.standingsHeader.appendChild(paHeader);
                break;
            case 'ncaaf':
                let confHeader = document.createElement('div');
                confHeader.classList.add('team-standing-wins');
                confHeader.textContent = 'Conf';
                this.standingsHeader.appendChild(confHeader);

                let ovrHeader = document.createElement('div');
                ovrHeader.classList.add('team-standing-losses');
                ovrHeader.textContent = 'Overall';
                this.standingsHeader.appendChild(ovrHeader);
                break;
            case 'nba':
                break;
            case 'mlb':
                break;
            default:
                break;
        }
        this.standingsElement.appendChild(this.standingsHeader);
    }

    buildStandings(league: string, data: any) {
        data.standings.forEach((standing: any) => {
            let standingElement = document.createElement('div');
            standing.id == data.id ? standingElement.classList.add('team-standing-record-bold') : standingElement.classList.add('team-standing-record');

            let teamElement = document.createElement('div');
            teamElement.classList.add('team-standing-team');
            let teamLogoElement = document.createElement('img');
            teamLogoElement.classList.add('team-schedule-logo');
            teamLogoElement.src = standing.logo;
            teamElement.appendChild(teamLogoElement);
            let teamNameElement = document.createElement('div');
            teamNameElement.textContent = standing.team;
            teamElement.appendChild(teamNameElement);
            standingElement.appendChild(teamElement);

            switch (league) {
                case 'nfl':
                    let winsElement = document.createElement('div');
                    winsElement.classList.add('team-standing-wins');
                    winsElement.textContent = standing.w;
                    standingElement.appendChild(winsElement);

                    let lossesElement = document.createElement('div');
                    lossesElement.classList.add('team-standing-losses');
                    lossesElement.textContent = standing.l;
                    standingElement.appendChild(lossesElement);

                    let tiesElement = document.createElement('div');
                    tiesElement.classList.add('team-standing-ties');
                    tiesElement.textContent = standing.t;
                    standingElement.appendChild(tiesElement);

                    let pctElement = document.createElement('div');
                    pctElement.classList.add('team-standing-pct');
                    pctElement.textContent = standing.pct;
                    standingElement.appendChild(pctElement);

                    let pfElement = document.createElement('div');
                    pfElement.classList.add('team-standing-pf');
                    pfElement.textContent = standing.pf;
                    standingElement.appendChild(pfElement);

                    let paElement = document.createElement('div');
                    paElement.classList.add('team-standing-pa');
                    paElement.textContent = standing.pa;
                    standingElement.appendChild(paElement);
                    break;
                case 'ncaaf':
                    let confElement = document.createElement('div');
                    confElement.classList.add('team-standing-conf');
                    confElement.textContent = standing.conference;
                    standingElement.appendChild(confElement);

                    let overallElement = document.createElement('div');
                    overallElement.classList.add('team-standing-overall');
                    overallElement.textContent = standing.overall;
                    standingElement.appendChild(overallElement);
                    break;
                case 'nba':
                    break;
                case 'mlb':
                    break;
                default:
                    break;
            }
            this.standingsElement.appendChild(standingElement);
            this.standingsRecords.push(standingElement);
        });
    }
}