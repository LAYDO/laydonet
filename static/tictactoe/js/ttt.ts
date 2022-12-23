class TicTacToe {
    private lastRender: number;
    private player1Turn: boolean;
    private player2Turn: boolean;
    private board: Element;
    protected evens: Array<number>;
    protected odds: Array<number>;
    protected round: number;

    constructor(board: Element) {
        this.lastRender = 0;
        this.round = 0;
        this.player1Turn = true;
        this.player2Turn = false;
        this.odds = [1, 3, 5, 7, 9];
        this.evens = [2, 4, 6, 8];
        this.board = board;

        // Construct and append board rows and squares
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div');
            row.className = 'ttt-row';
            switch (i) {
                case 0:
                    row.id = 'tttTop';
                    for (let j = 0; j < 3; j++) {
                        let square = document.createElement('div');
                        square.id = `square${j}`;
                        if (j == 2) {
                            square.className = 'ttt-square ttt-border-bottom';
                        } else {
                            square.className = 'ttt-square ttt-border-right ttt-border-bottom';
                        }
                        row.append(square);
                    }
                    break;
                case 1:
                    row.id = 'tttMid';
                    for (let j = 0; j < 3; j++) {
                        let square = document.createElement('div');
                        square.id = `square${j}`;
                        if (j == 2) {
                            square.className = 'ttt-square ttt-border-bottom';
                        } else {
                            square.className = 'ttt-square ttt-border-right ttt-border-bottom';
                        }
                        row.append(square);
                    }
                    break;
                case 2:
                    row.id = 'tttBottom';
                    for (let j = 0; j < 3; j++) {
                        let square = document.createElement('div');
                        square.id = `square${j}`;
                        if (j == 2) {
                            square.className = 'ttt-square';
                        } else {
                            square.className = 'ttt-square ttt-border-right';
                        }
                        row.append(square);
                    }
                    break;
                default:
                    break;
            }
            board.append(row);
        }
        window.requestAnimationFrame.bind(this,this.loop);
    }
    
    update(progress: number) {
        // Update the state of the game for the elapsed time since last render

        this.player1Turn = !this.player1Turn;
        this.player2Turn = !this.player2Turn;
    }

    draw() {
        // Draw the state of the game
    }

    loop(timestamp: number) {
        let progress = timestamp - this.lastRender;

        this.update(progress);
        this.draw();

        this.lastRender = timestamp;
        window.requestAnimationFrame(this.loop);
    }
}