function init() {
    let logo = document.getElementById('toesLogo');
    if (logo) {
        drawLogo(logo);
    }
}

function drawLogo(_element: Element) {
    let start = 20;
    for (let i = 0; i < 3; i++) {
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (let j = 0; j < 5; j++) {
            let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('stroke', 'var(--font-color)');
            line.setAttribute('stroke-width', '2.5');
            if (j != 4) {
                line.setAttribute('x1', ((j * (133 / 4)) + start).toFixed(0));
                line.setAttribute('x2', ((j * (133 / 4)) + start).toFixed(0));
                line.setAttribute('y1', '3');
                line.setAttribute('y2', '130');
            } else {
                line.setAttribute('x1', (((j - 1) * (133 / 4)) + start).toFixed(0));
                line.setAttribute('x2', (start).toFixed(0));
                line.setAttribute('y1', '3');
                line.setAttribute('y2', '130');
                
            }
            g.append(line);
        }
        if (i == 1) {
            g.setAttribute('transform', `translate(0,133)`);
        }
        _element.append(g);
        start += 133;
    }
}

function tictactoe() {
    window.location.pathname = 'tictactoe';
}

init();