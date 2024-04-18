import { Schedule } from './Schedule';
import { Clock } from './Clock';

// MAIN
let clockElement = document.getElementById('newClock');
// let time = new Date();
let clock = new Clock(clockElement);
let s;
let url = window.location.href;
fetch(url + 'get').then(response => {
    return response.json();
}).then(data => {
    s = new Schedule(data, clock.time);
    // console.log(s);
    // setInterval(flipInfo, 7000);
}).catch(error => {
    console.error('There has been a problem with your fetch operation: ', error);
});