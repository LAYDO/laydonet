var schedule;
let time;
var remainingDays, remainingHours, remainingMins, remainingSecs;
var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// var clock = document.getElementById("clock");
// var ctx = clock.getContext("2d");
// ctx.canvas.width = window.innerWidth;
// ctx.canvas.height = window.innerWidth;
// var radius = clock.width / 2;
// ctx.translate(radius, radius);
// radius = radius * 0.90;
var now = new Date();
var flip = 0;
let timeRemaining = ``;

// MAIN
setSchedule();

function setSchedule() {
    let url = window.location.href;
    fetch(url + 'get').then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        schedule = data;
        let s = new Schedule(data);
        // drawClock();
        // setInterval(drawClock, 1000);
        // setInterval(flipInfo, 7000);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

// function drawDate() {
//     const options = {
//         year: "numeric",
//         month: "numeric",
//         day: "numeric"
//     };
//     var longDate = now.toLocaleDateString("en-US", options);
//     longDate = longDate.replaceAll("/", ".");
//     ctx.font = "bold 2rem Times New Roman";
//     ctx.fillText(`${longDate}`, 0, -(ctx.canvas.height / 4));
//     ctx.fillText(`${dayOfWeek[now.getDay()]}`, 0, -(ctx.canvas.height / 4) + 32);
// }

// function drawPeriod() {
//     ctx.font = "bold 2rem Times New Roman";
//     if (schedule.summerTime) {
//         ctx.fillText(`Summertime Ends`, 0, -(ctx.canvas.height / 4));
//     } else if (schedule.weekend) {
//         ctx.fillText(`It Begins Again...`, 0, -(ctx.canvas.height / 4));
//     } else if ((time > new Date(schedule.periods[schedule.periods.length - 2].end) && time <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)) ||
//         time < new Date(schedule.todayStart) && time >= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0)) {
//         ctx.fillText(`Calm`, 0, -(ctx.canvas.height / 4));
//     } else {
//         schedule.periods.forEach((period, index) => {
//             let periodStart = new Date(period.start);
//             let periodEnd = new Date(period.end);
//             if (index > 0 && index < 6) {
//                 let lastPeriodEnd = new Date(schedule.periods[index - 1].end);
//                 if (time >= periodStart && time < periodEnd) {
//                     ctx.fillText(`${period.schedule}`, 0, -(ctx.canvas.height / 4));
//                     ctx.fillText(`${period.title}`, 0, -(ctx.canvas.height / 4) + 32);
//                 } else if (time < periodStart && time < periodEnd & time > lastPeriodEnd) {
//                     ctx.fillText(`Break`, 0, -(ctx.canvas.height / 4));
//                 }
//             } else {
//                 if (time >= periodStart && time < periodEnd) {
//                     ctx.fillText(`${period.schedule}`, 0, -(ctx.canvas.height / 4));
//                     ctx.fillText(`${period.title}`, 0, -(ctx.canvas.height / 4) + 32);
//                 }
//             }
//         });
//     }
// }

// function flipInfo() {
//     if (flip === 0) {
//         flip = 1;
//     } else {
//         flip = 0;
//     }
// }

// function drawClock() {
//     drawFace(ctx, radius);
//     drawNumbers(ctx, radius);
//     drawTime();
//     if (flip === 0) {
//         drawDate();
//     } else {
//         drawPeriod();
//     }
// }

// function drawRemaining() {
//     let sixthPeriod = schedule.periods[5];
//     if (schedule.summerTime || schedule.weekend) {
//         let skoolStart = new Date(schedule.schoolStart);
//         constructRemaining(0, skoolStart);
//         drawStatus();
//         // console.log(`DAYS: ${remainingDays} HOURS: ${remainingHours} MINS: ${remainingMins} SECS: ${remainingSecs}`);
//     } else if (time > new Date(sixthPeriod.end) && time <= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)) {
//         // console.log('ENTERING TOMORROW TIME CONFIG');
//         let tomoStart = new Date(schedule.tomorrowStart);
//         constructRemaining(1, tomoStart);
//         drawStatus();
//     } else if (time < new Date(schedule.todayStart) && time >= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0)) {
//         // console.log('ENTERING TODAY TIME CONFIG');
//         let todayStart = new Date(schedule.todayStart);
//         constructRemaining(1, todayStart);
//         drawStatus();
//     } else {
//         schedule.periods.forEach((period, index) => {
//             let periodStart = new Date(period.start);
//             let periodEnd = new Date(period.end);
//             if (index > 0 && index < 6) {
//                 let lastPeriodEnd = new Date(schedule.periods[index - 1].end);
//                 if (time >= periodStart && time < periodEnd) {
//                     constructRemaining(2, periodEnd);
//                     if (period.plan) {
//                         drawStatus(1);
//                     } else {
//                         drawStatus(0);
//                     }
//                 } else if (time < periodStart && time > lastPeriodEnd) {
//                     constructRemaining(2, periodStart);
//                     drawStatus(1);
//                 }
//             } else {
//                 if (time >= periodStart && time < periodEnd) {
//                     constructRemaining(1, periodEnd);
//                     if (index == 6) {
//                         drawStatus(1);
//                     } else {
//                         drawStatus(0);
//                     }
//                 } else {

//                 }
//             }
//         });
//     }
//     ctx.font = 'bold 2rem Times New Roman';
//     ctx.fillText(timeRemaining, 0, (ctx.canvas.height / 4));
// }

// function drawStatus(s) {
//     document.fonts.load('900 32px "Font Awesome 5 Free"').then((_) => {
//         ctx.font = '900 32px "Font Awesome 5 Free"';
//         switch (s) {
//             case 0:
//                 ctx.fillText('\uf4b3', (ctx.canvas.width / 4), 0);
//                 break;
//             case 1:
//                 ctx.fillText('\uf4ad', (ctx.canvas.width / 4), 0);
//                 break;
//             default:
//                 ctx.fillStyle = 'yellow';
//                 ctx.fillText('\uf185', (ctx.canvas.width / 4), 0);
//                 break;
//         }
//     })
// }

// function constructRemaining(s, l) {
//     remainingDays = Math.floor((l - time) / 86400000);
//     remainingHours = Math.floor((l - time) / 3600000) - (remainingDays * 24);
//     remainingMins = Math.floor((l - time) / 60000) - (remainingDays * 1440) - (remainingHours * 60);
//     remainingSecs = Math.floor((l - time) % 60000 / 1000);
//     switch (s) {
//         case 0:
//             timeRemaining = `+${remainingDays}:${('0' + remainingHours).slice(-2)}:${('0' + remainingMins).slice(-2)}:${remainingSecs == 60 ? '00' : ('0' + remainingSecs).slice(-2)}`;
//             break;
//         case 1:
//             timeRemaining = `${('0' + remainingHours).slice(-2)}:${('0' + remainingMins).slice(-2)}:${remainingSecs == 60 ? '00' : ('0' + remainingSecs).slice(-2)} left`;
//             break;
//         case 2:
//             timeRemaining = `${('0' + remainingMins).slice(-2)}:${remainingSecs == 60 ? '00' : ('0' + remainingSecs).slice(-2)} left`;
//             break;
//     }
// }