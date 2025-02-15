const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
};

class Utils {
    static svgns: "http://www.w3.org/2000/svg";

    constructor() {
    }

    windDirection(deg: number) {
        let dir = '';
        if (deg >= 0 && deg <= 10) {
            dir = 'N';
        } else if (deg >= 11 && deg <= 79) {
            dir = 'NE';
        } else if (deg >= 80 && deg <= 100) {
            dir = 'E';
        } else if (deg >= 101 && deg <= 169) {
            dir = 'SE';
        } else if (deg >= 170 && deg <= 190) {
            dir = 'S';
        } else if (deg >= 191 && deg <= 259) {
            dir = 'SW';
        } else if (deg >= 260 && deg <= 280) {
            dir = 'W';
        } else if (deg >= 281 && deg <= 349) {
            dir = 'NW';
        } else if (deg >= 350) {
            dir = 'N';
        } else {
            dir = 'No Wind';
        }
        return dir;
    }
}

function getFetch(url: string) {
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        return data;
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

function postFetch(url: string, _body: Object = {}) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(_body),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        return data;
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
        return error;
    })
}

function metricPost(url: string, action: string, target: string) {
    let _body = {
        action: action,
        target: target,
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(_body),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        return data;
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

export function convertToLocalDatetime(utcDateStr: string) {
    const localDate = new Date(utcDateStr);
    return localDate.toLocaleString('en-US', options);
}

export function localMessage(message: string, type: string) {
    if (type in ['error', 'warning']) {
        console.log(`${type}: ${message}`);
    }
    let modal = document.getElementById("messageModal");
    let container = document.getElementById("modalContainer");
    let content = document.getElementById("messageContent");
    let closeButton = document.getElementById("message_close");
    if (modal && content && container && closeButton != null) {
        content.textContent = message;
        container.classList.add(`alert-${type}`);
        modal.style.display = 'block';
        modal.style.left = `${(window.innerWidth - modal.offsetWidth) / 2}px`;
        modal.style.top = `${modal.offsetHeight}px`;
        if (type == 'info') {
            closeButton.style.display = 'none';
        }
        // Auto-hde after 3 seconds
        setTimeout(() => {
            modal?.classList.add('modal-hide');
            setTimeout(() => {
                if (modal) {
                    modal.style.display = 'none';
                    modal.classList.remove('modal-hide');
                    container?.classList.remove(`alert-${type}`);
                    modal.style.left = '0';
                    modal.style.top = '0';
                }
            }, 500);
        }, 3000);
        // Close button
        closeButton.addEventListener('click', () => {
            modal?.classList.add('modal-hide');
            setTimeout(() => {
                if (modal) {
                    modal.style.display = 'none';
                    modal.classList.remove('modal-hide');
                    container?.classList.remove(`alert-${type}`);
                }
            }, 500);
        });
    }
}