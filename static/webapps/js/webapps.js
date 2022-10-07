init()

function init() {
    let element = document.getElementById('schedule');
    this.clock = new Clock(element);
    setInterval(this.updateTime.bind(this));
}

function updateTime() {

    this.time = new Date();
    let hour = this.time.getHours();
    let minute = this.time.getMinutes();
    let second = this.time.getSeconds();

    hour = hour % 12;
    hour = (hour * 30) + (minute / 2) + (second / 10);
    this.clock.drawHand(hour, 'hourHand', '4', this.clock.baseW / 4);

    minute = (minute * 6) + (second / 10);
    this.clock.drawHand(minute, 'minuteHand', '3', this.clock.baseW / 6);

    second = (second * 6);
    this.clock.drawHand(second, 'secondHand', '2', this.clock.baseW / 9);
}