"use strict";
function ft_init() {
    buildCard();
    let logo = document.getElementById('toesLogo');
    if (logo) {
        drawLogo(logo);
    }
}
function buildCard() {
    let container = document.getElementById('15t_container');
    if (container) {
        let card = document.createElement('div');
        card.classList.add('fift-card');
        card.id = '15t_card';
        let inner = document.createElement('div');
        inner.classList.add('fift-card-inner');
        let front = document.createElement('div');
        front.classList.add('fift-card-front');
        front.classList.add('ft-col');
        front.id = '15t_front';
        // Create elements for front
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '400');
        svg.setAttribute('height', '267');
        svg.id = 'toesLogo';
        front.append(svg);
        let title = document.createElement('div');
        title.classList.add('ft-title');
        title.classList.add('ft-row');
        title.textContent = 'TOES';
        front.append(title);
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div');
            row.classList.add('ft-row');
            let button = document.createElement('div');
            button.classList.add('ft-button');
            switch (i) {
                case 0:
                    button.textContent = 'LOCAL';
                    button.addEventListener('click', () => {
                        tictactoe();
                    });
                    break;
                case 1:
                    button.textContent = 'MULTIPLAYER';
                    button.addEventListener('click', () => {
                        checkForMatch();
                    });
                    break;
                case 2:
                    button.textContent = 'HOW TO PLAY';
                    button.addEventListener('click', () => {
                        howToPlay();
                    });
                    break;
                default:
                    break;
            }
            row.append(button);
            front.append(row);
        }
        let back = document.createElement('div');
        back.classList.add('fift-card-back');
        back.id = '15t_back';
        fetchHowToPlay(back);
        inner.append(front);
        inner.append(back);
        card.append(inner);
        container.append(card);
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
        window.location.pathname = data.pathname;
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    });
}
function howToPlay() {
    let card = document.getElementById('15t_card');
    card === null || card === void 0 ? void 0 : card.classList.toggle('clicked');
}
async function fetchHowToPlay(inner) {
    let url = `${window.location.href}how-to-play/`;
    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data['title'] == 'Fifteen Toes') {
            if (inner) {
                let title = document.createElement('div');
                title.classList.add('fift-title');
                title.textContent = data['title'];
                inner.append(title);
                let text = document.createElement('div');
                text.classList.add('fift-text');
                text.innerHTML = data['instructions'];
                inner.append(text);
                // Create the 'X' element
                let closeButton = document.createElement('div');
                closeButton.classList.add('close-button');
                closeButton.textContent = 'X';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '0';
                closeButton.style.right = '0';
                closeButton.style.cursor = 'pointer';
                closeButton.addEventListener('click', (event) => {
                    howToPlay();
                });
                inner.append(closeButton);
                // Change inner event listener
                inner.removeEventListener('click', () => {
                    howToPlay();
                });
            }
        }
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    });
}
ft_init();
