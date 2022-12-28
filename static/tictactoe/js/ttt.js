"use strict";
class TicTacToe {
    constructor(board) {
        var _a, _b, _c, _d;
        this.lastRender = 0;
        this.round = 0;
        this.player1Turn = true;
        this.player2Turn = false;
        this.odds = [1, 3, 5, 7, 9];
        this.evens = [2, 4, 6, 8];
        this.board = board;
        this.plays = [];
        this.boardHeight = this.board.clientHeight;
        this.boardWidth = this.board.clientWidth;
        // Construct and append corner squares
        let divider = this.boardWidth / 3;
        for (let i = 0; i < 4; i++) {
            let corner = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            corner.setAttribute('points', `0,${divider} ${divider},${divider} ${divider},0`); //'0,137 137,137 137,0');
            corner.setAttribute('style', 'fill:none;stroke:var(--font-color);stroke-width:2;');
            corner.id = `corner${i}`;
            if (this.board.parentElement) {
                corner.setAttribute('transform', `rotate(${i * 90}, ${(((_a = this.board.parentElement) === null || _a === void 0 ? void 0 : _a.clientWidth) / 2).toFixed(0)}, ${(((_b = this.board.parentElement) === null || _b === void 0 ? void 0 : _b.clientWidth) / 2).toFixed(0)})`);
            }
            this.board.append(corner);
        }
        // Construct and append bewteen squares
        for (let i = 0; i < 4; i++) {
            let between = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            between.setAttribute('points', `${divider},0 ${divider},${divider} ${divider * 2},${divider} ${divider * 2},0`); //'137,0 137,137 274,137 274,0');
            between.setAttribute('style', 'fill:none;stroke:var(--font-color);stroke-width:2;');
            between.id = `between${i}`;
            if (this.board.parentElement) {
                between.setAttribute('transform', `rotate(${i * 90}, ${(((_c = this.board.parentElement) === null || _c === void 0 ? void 0 : _c.clientWidth) / 2).toFixed(0)}, ${(((_d = this.board.parentElement) === null || _d === void 0 ? void 0 : _d.clientWidth) / 2).toFixed(0)})`);
            }
            this.board.append(between);
        }
        // Construct and append middle square
        let middle = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        middle.setAttribute('points', '137,137 137,274 274,274 274,137 137,137');
        middle.setAttribute('style', 'fill:none;stroke:none');
        middle.id = `middle0`;
        this.board.append(middle);
        // Construct and append numbers to player areas
        for (let i = 0; i < 9; i++) {
            let number = i + 1;
            let height = this.board.clientHeight * 0.85;
            let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.classList.add('ttt-number');
            text.setAttribute('y', height.toFixed(0));
            text.onload = this.makeDraggable;
            text.textContent = number.toFixed(0);
            if (number % 2 == 0) {
                text.setAttribute('x', ((20 * i) + 220).toFixed(0));
            }
            else {
                text.setAttribute('x', ((20 * i) + 20).toFixed(0));
            }
            this.board.append(text);
        }
        window.requestAnimationFrame.bind(this, this.loop);
    }
    update(progress) {
        // Update the state of the game for the elapsed time since last render
    }
    draw() {
        // Draw the state of the game
    }
    loop(timestamp) {
        let progress = timestamp - this.lastRender;
        this.update(progress);
        this.draw();
        this.lastRender = timestamp;
        window.requestAnimationFrame(this.loop);
    }
    makeDraggable(e) {
        let svg = e.target;
        svg === null || svg === void 0 ? void 0 : svg.addEventListener('mousedown', startDrag);
        svg === null || svg === void 0 ? void 0 : svg.addEventListener('mousemove', drag);
        svg === null || svg === void 0 ? void 0 : svg.addEventListener('mouseup', endDrag);
        svg === null || svg === void 0 ? void 0 : svg.addEventListener('mouseleave', endDrag);
        let selectedElement = null;
        function startDrag(e) {
            if (e.target && e.target.matches('.draggable')) {
                selectedElement = e.target;
            }
        }
        function drag(e) {
            if (selectedElement) {
                e.preventDefault();
                let x = parseFloat(selectedElement.getAttribute('x'));
                selectedElement.setAttribute('x', x + 0.1);
            }
        }
        function endDrag(e) {
            selectedElement = null;
        }
    }
}
