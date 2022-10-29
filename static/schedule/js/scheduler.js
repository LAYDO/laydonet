let time;
var remainingDays, remainingHours, remainingMins, remainingSecs;
var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
        let s = new Schedule(data);
        // console.log(s);
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


// function flipInfo() {
//     if (flip === 0) {
//         drawDate();
//         flip = 1;
//     } else {
//         drawRemaining();
//         flip = 0;
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