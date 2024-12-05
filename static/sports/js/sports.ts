import { NFLTeamWidget } from './SportsWidgets';
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const NFL_TEAM_URL = "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams";

document.addEventListener('DOMContentLoaded', () => {
    let sportsContainer = document.getElementById('sportsElements');
    if (sportsContainer) {
        // let packers = new NFLTeamWidget(sportsContainer, 9, userTimeZone);
        // let bears = new NFLTeamWidget(sportsContainer, 3, userTimeZone);
        for (let i = 1; i < 35; i++) {
            if (i === 31 || i === 32) {
                continue;
            }
            let team = new NFLTeamWidget(sportsContainer, i, userTimeZone);
        }
    }
});