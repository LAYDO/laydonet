"use strict";
function lobbyReady() {
    let url = `${window.location.href}ready`;
    lobbyFetch(url, { 'clicked': 'READY' });
}
function lobbyUnReady() {
    let url = `${window.location.href}unready`;
    lobbyFetch(url, { 'clicked': 'UNREADY' });
}
function gameStart() {
    let url = `${window.location.href}start/`;
}
async function lobbyFetch(_url, _body) {
    fetch(_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(_body),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    });
}
