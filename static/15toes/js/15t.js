"use strict";
function ft_init() {
    let logo = document.getElementById('toesLogo');
    if (logo) {
        drawLogo(logo);
    }
}
function drawLogo(_element) {
    let width = _element.clientWidth;
    let sWidth = width / 3;
    let start = sWidth / 7;
    for (let i = 0; i < 3; i++) {
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (let j = 0; j < 5; j++) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('stroke', 'var(--font-color)');
            line.setAttribute('stroke-width', '2.5');
            if (j != 4) {
                line.setAttribute('x1', ((j * (sWidth / 4)) + start).toFixed(0));
                line.setAttribute('x2', ((j * (sWidth / 4)) + start).toFixed(0));
                line.setAttribute('y1', '3');
                line.setAttribute('y2', `${sWidth - 3}`);
            }
            else {
                line.setAttribute('x1', (((j - 1) * (sWidth / 4)) + start).toFixed(0));
                line.setAttribute('x2', (start).toFixed(0));
                line.setAttribute('y1', '3');
                line.setAttribute('y2', `${sWidth - 3}`);
            }
            g.append(line);
        }
        if (i == 1) {
            g.setAttribute('transform', `translate(0,${sWidth})`);
        }
        _element.append(g);
        start += sWidth;
    }
}
function tictactoe() {
    window.location.pathname = 'tictactoe';
}
function checkForMatch() {
    let url = `${window.location.href}check/`;
    fetch(url).then(response => {
        // Need a loading function / animation
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        if (data > 0) {
            // If player has a match, send them to lobby
            window.location.pathname = 'fifteentoes/lobby';
        }
        else {
            // Else, load up the start screen to create or join a lobby
            window.location.pathname = 'fifteentoes/start';
        }
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    });
}
class FifteenCard {
    constructor(title, radio1, radio2, button, _element) {
        // Parent and card container, taking on laydo-container styling
        this.parentElement = _element;
        this.cardContainer = document.createElement('div');
        this.cardContainer.classList.add('laydo-container');
        // Typical title for laydo-container
        this.title = document.createElement('div');
        this.title.classList.add('container-title');
        this.title.textContent = title;
        // Form
        this.cardForm = document.createElement('form');
        this.cardForm.classList.add('ft-col');
        // Radio row
        let radRow = document.createElement('div');
        radRow.classList.add('ft-row-b');
        // Radio columns
        let radCol1 = document.createElement('div');
        radCol1.classList.add('ft-col');
        radCol1.setAttribute('style', 'margin-right:1rem;'); // For a little space between the lads
        let radCol2 = document.createElement('div');
        radCol2.classList.add('ft-col');
        // Radio options
        this.radio1 = document.createElement('input');
        this.radio1.setAttribute('type', 'radio');
        this.radio1.id = radio1.toLowerCase();
        this.radio1.setAttribute('name', button.toLowerCase());
        this.radio1.setAttribute('value', radio1);
        this.radio1.addEventListener('click', () => {
            this.hideText();
        });
        let r1 = document.createElement('label');
        r1.setAttribute('for', radio1.toLowerCase());
        r1.textContent = radio1;
        radCol1.append(r1);
        radCol1.append(this.radio1);
        let break1 = document.createElement('br');
        this.radio2 = document.createElement('input');
        this.radio2.setAttribute('type', 'radio');
        this.radio2.id = radio2.toLowerCase();
        this.radio2.setAttribute('name', button.toLowerCase());
        this.radio2.setAttribute('value', radio2);
        this.radio2.addEventListener('click', () => {
            this.showText();
        });
        let r2 = document.createElement('label');
        r2.setAttribute('for', radio2.toLowerCase());
        r2.textContent = radio2;
        radCol2.append(r2);
        radCol2.append(this.radio2);
        radRow.append(radCol1);
        radRow.append(radCol2);
        this.textOption = document.createElement('input');
        this.textOption.setAttribute('style', 'visibility: hidden;');
        this.textOption.setAttribute('type', 'text');
        this.textOption.id = button.toLowerCase() == 'create' ? 'lobbyPassword' : 'lobbyNumber';
        this.textOption.setAttribute('placeholder', button.toLowerCase() == 'create' ? 'Password' : 'Lobby Number');
        this.button = document.createElement('input');
        this.button.classList.add('ft-button');
        this.button.setAttribute('type', 'submit');
        this.button.setAttribute('value', button);
        this.cardForm.append(radRow);
        this.cardForm.append(break1);
        this.cardForm.append(this.textOption);
        this.cardForm.append(break1);
        this.cardForm.append(break1);
        this.cardForm.append(this.button);
        this.cardContainer.append(this.title);
        this.cardContainer.append(this.cardForm);
        this.parentElement.append(this.cardContainer);
    }
    show() {
        this.parentElement.setAttribute('style', 'display:block;');
    }
    hide() {
        this.parentElement.setAttribute('style', 'display:none;');
    }
    showText() {
        this.textOption.setAttribute('style', 'visibility: show;');
    }
    hideText() {
        this.textOption.setAttribute('style', 'visibility: hidden;');
    }
}
ft_init();
