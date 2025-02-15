import { Clock } from '../../schedule/js/Clock';
import { main } from '../../webgl/js/webbers';
let clock;
let arrowElement = document.querySelector('.laydo-bottom');
init()

function init() {
    let element = document.getElementById('schedule');
    if (element) {
        clock = new Clock(element);
        setInterval(updateTime, 1000);
    }
    let webgl = document.getElementById('webgl');
    if (webgl) {
        main(webgl);
    }
    window.addEventListener('scroll', handleScroll);
    localStorage.setItem('arrowHidden', 'false');
    arrowElement?.classList.remove('fade-out-bottom');
    handleScroll();
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

function handleScroll() {
    
    // Skip if already hidden or manually dismissed
    if (localStorage.getItem('arrowHidden') === 'true') {
        arrowElement?.classList.add('fade-out-bottom');
        return;
    }

    const windowHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const documentHeight = document.body.scrollHeight;

    // Check if scrolled past 10% from the bottom
    const threshold = windowHeight * 0.1;

    if (scrolled > threshold) {
        arrowElement?.classList.add('fade-out-bottom');
        localStorage.setItem('arrowHidden', 'true');
    }
}