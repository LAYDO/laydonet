import { Clock } from '../../schedule/js/Clock';
let clock;
init()

function init() {
    let element = document.getElementById('schedule');
    if (element) {
        clock = new Clock(element);
        setInterval(updateTime, 1000);
    }
}

function updateTime() {

    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    hour = hour % 12;
    hour = (hour * 30) + (minute / 2) + (second / 10);
    clock.drawHand(hour, 'hourHand', '4', clock.baseW / 4);

    minute = (minute * 6) + (second / 10);
    clock.drawHand(minute, 'minuteHand', '3', clock.baseW / 6);

    second = (second * 6);
    clock.drawHand(second, 'secondHand', '2', clock.baseW / 9);
}