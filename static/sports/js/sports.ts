import { NFLTeamWidget, CollegeFootballTeamWidget } from './SportsWidgets';

document.addEventListener('DOMContentLoaded', () => {
    let sportsContainer = document.getElementById('sportsElements');
    if (sportsContainer) {
        let packers = new NFLTeamWidget(sportsContainer, 9);
        let cougars = new CollegeFootballTeamWidget(sportsContainer, 265);
        // let bears = new NFLTeamWidget(sportsContainer, 3);
        // for (let i = 1; i < 35; i++) {
        //     if (i === 31 || i === 32) {
        //         continue;
        //     }
        //     let team = new NFLTeamWidget(sportsContainer, i, userTimeZone);
        // }
    }
});