import { TeamBanner } from './TeamBanner';

let sportsContainer = document.getElementById('sportsElements');
if (sportsContainer) {
    let packers = new TeamBanner(sportsContainer, 9);
}