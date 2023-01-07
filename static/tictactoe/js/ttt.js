"use strict";
class TicTacToe {
    constructor(board) {
        this.lastRender = 0;
        this.round = 0;
        this.player1Turn = true;
        this.player2Turn = false;
        this.odds = [1, 3, 5, 7, 9];
        this.evens = [2, 4, 6, 8];
        this.board = board;
        this.plays = [];
        this.isMobile = window.matchMedia("only screen and (max-width: 48rem)").matches;
        this.selectedElement = '';
        if (!this.isMobile) {
            this.board.classList.add('ttt-row');
        }
        this.squares = document.createElement('div');
        this.squares.classList.add('ttt-col');
        this.playerNumbers = document.createElement('div');
        this.playerNumbers.classList.add('ttt-row');
        this.numbersOdd = document.createElement('div');
        this.numbersOdd.classList.add('ttt-row-numbers');
        this.numbersEven = document.createElement('div');
        this.numbersEven.classList.add('ttt-row-numbers');
        let localCount = 0;
        for (let i = 0; i < 3; i++) {
            let squareRow = document.createElement('div');
            squareRow.classList.add('ttt-row');
            squareRow.id = `squareRow${i}`;
            for (let j = 0; j < 3; j++) {
                let s = document.createElement('div');
                s.classList.add('ttt-square');
                s.id = `square${localCount}`;
                s.addEventListener('click', () => {
                    if (this.selectedElement != null || this.selectedElement != "") {
                        console.log(`${this.selectedElement}`);
                        let t = document.getElementById(`text${this.selectedElement}`);
                        if (t) {
                            s.append(t);
                        }
                    }
                });
                switch (i) {
                    case 0:
                    case 1:
                        if (j < 2) {
                            s.classList.add('ttt-border-right');
                            s.classList.add('ttt-border-bottom');
                        }
                        else {
                            s.classList.add('ttt-border-bottom');
                        }
                        break;
                    case 2:
                        if (j < 2) {
                            s.classList.add('ttt-border-right');
                        }
                        break;
                    default:
                        break;
                }
                squareRow.append(s);
                localCount++;
            }
            this.squares.append(squareRow);
        }
        // Construct and append numbers to player areas
        for (let i = 0; i < 9; i++) {
            let number = i + 1;
            let text = document.createElement('div');
            text.classList.add('ttt-number');
            text.textContent = number.toFixed(0);
            text.id = `text${i}`;
            text.addEventListener('click', () => {
                if (document.querySelectorAll('.selected').length == 0) {
                    text.classList.add('selected');
                    if (text.textContent) {
                        this.selectedElement = text.textContent;
                    }
                }
                else {
                    text.classList.remove('selected');
                    this.selectedElement = '';
                }
            });
            if (number % 2 == 0) {
                this.numbersEven.append(text);
            }
            else {
                this.numbersOdd.append(text);
            }
        }
        // Append squares and numbers
        this.playerNumbers.append(this.numbersOdd);
        this.playerNumbers.append(this.numbersEven);
        this.board.append(this.squares);
        this.board.append(this.playerNumbers);
    }
}
