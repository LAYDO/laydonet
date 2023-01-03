let board = document.getElementById('tttBoard');
let game: TicTacToe;
let lastRender = 0;
if (board) {
    game = new TicTacToe(board);
}

function update(progress: number) {
    // Update the state of the game for the elapsed time since last render
    
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