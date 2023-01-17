function init() {
    let logo = document.getElementById('toesLogo');
    if (logo) {
        drawLogo(logo);
    }
}

function drawLogo(_element: Element) {
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
            } else {
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
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

init();