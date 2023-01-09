let board = document.getElementById('tttBoard');
let game: TicTacToe;
let lastRender = 0;
let round = 0;
let plays = [];
if (board) {
    game = new TicTacToe(board);
}

function update(progress: number) {
    // Update the state of the game for the elapsed time since last render
    for (let s = 0; s < 9; s++) {
        let square = document.getElementById(`square${s}`);
        square?.addEventListener('click', () => {
            if (game.selectedElement != null || game.selectedElement != "") {
                let t = document.getElementById(`text${parseInt(game.selectedElement) - 1}`);
                if (t) {
                    t.classList.remove('selected');
                    game.selectedElement = '';
                    square?.append(t);
                }
            }
        })
    }
}

function draw() {
    // Draw the state of the game
}

function loop(timestamp: number) {
    // let timestamp = new Date();
    let progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);