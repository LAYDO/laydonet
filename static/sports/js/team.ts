import { TeamPage } from './TeamPage';

document.addEventListener('DOMContentLoaded', () => {

    const contextData = document.getElementById('context-data');
    const page = document.getElementById('sportsTeamPage');
    if (!contextData || !page) {
        return;
    }
    let teamPage = new TeamPage(page, contextData);
});