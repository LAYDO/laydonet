import { TeamPage } from './TeamPage';

document.addEventListener('DOMContentLoaded', () => {
    const page = document.getElementById('sportsTeamPage');
    if (!page) {
        return;
    }
    let teamPage = new TeamPage(page);
});