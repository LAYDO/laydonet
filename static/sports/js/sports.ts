import { NFLTeamWidget, CollegeFootballTeamWidget, MLBTeamWidget } from './SportsWidgets';

document.addEventListener('DOMContentLoaded', () => {
    let sportsContainer = document.getElementById('sportsElements');
    if (sportsContainer) {
        let packers = new NFLTeamWidget(sportsContainer, 9);
        let cougars = new CollegeFootballTeamWidget(sportsContainer, 265);
        let mariners = new MLBTeamWidget(sportsContainer, 12);
    }
});