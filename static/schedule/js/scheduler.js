import { Schedule } from './Schedule';

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