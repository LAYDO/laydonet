export class TeamBanner {
    container: HTMLElement;
    banner: HTMLElement;
    nameElement: HTMLElement;
    logoElement: HTMLImageElement;
    teamId: number;
    teamName: string;
    teamLogo: string;

    constructor(container: HTMLElement, id: number) {
        this.container = container;
        this.teamId = id;
        this.teamName = '';
        this.teamLogo = '';
        // let url = window.location.href;
        // url = url + 'nfl/' + id;
        // fetch(url).then(response => {
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json();
        // }).then(data => {
        //     this.teamName = data['name'];
        //     this.teamLogo = data['logo'];
        // }).catch(error => {
        //     console.error('There has been a problem with your fetch operation: ', error);
        // });

        this.banner = document.createElement('div');
        this.banner.classList.add('laydo-row-even', 'team-banner');
        this.logoElement = document.createElement('img');
        // this.logoElement.src = this.teamLogo;
        // this.logoElement.alt = this.teamName;
        this.logoElement.classList.add('team-logo');
        this.banner.appendChild(this.logoElement);
        this.nameElement = document.createElement('div');
        // this.nameElement.textContent = this.teamName;
        this.nameElement.classList.add('team-name');
        this.banner.appendChild(this.nameElement);
        this.container.appendChild(this.banner);

        this.fetchTeamData(this.teamId);
    }
    
    private fetchTeamData(id: number) {
        let url = window.location.href;
        url = url + 'nfl/' + id;
        fetch(url).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            this.teamName = data['name'];
            this.teamLogo = data['logo'];
            this.populateBanner();
        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
        });
    }

    private populateBanner() {
        this.logoElement.src = this.teamLogo;
        this.logoElement.alt = this.teamName;
        this.nameElement.textContent = this.teamName;
    }
}