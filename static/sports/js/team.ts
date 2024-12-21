import { convertToLocalDatetime } from '../../base/js/Utils';

document.addEventListener('DOMContentLoaded', () => {
    const dates = document.querySelectorAll('.team-schedule-date');
    dates.forEach(date => {
        const utcDateStr = date.getAttribute('data-utc');
        if (utcDateStr) {
            const localDate = convertToLocalDatetime(utcDateStr);
            date.textContent = localDate;
        }
    });

    const outcomes = document.querySelectorAll('.team-schedule-outcome');
    outcomes.forEach((outcome) => {
        const outcomeElement = outcome as HTMLElement;
        const outcomeStr = outcome.getAttribute('data-outcome');
        if (outcomeStr) {
            const outcomeColor = outcomeStr === 'W' ? 'green' : 'red';
            outcomeElement.textContent = outcomeStr;
            outcomeElement.style.color = outcomeColor;
        }
    });
});