import { TeamPage } from './TeamPage';

document.addEventListener('DOMContentLoaded', () => {
    let teamContainer = document.getElementById('sportsTeamPage');
    let contextData = document.getElementById('context-data');
    if (teamContainer && contextData) {
        let team = new TeamPage(teamContainer, contextData);
    }
});