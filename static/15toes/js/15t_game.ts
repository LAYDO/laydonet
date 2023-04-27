let selectedElement = '';
let game_id = document.getElementById('ftSquares')?.getAttribute('game_id');

let connectionString = `ws://${window.location.host}/ws/game/${game_id}/`;
let socket = new WebSocket(connectionString);

// Initialize the board
for (let i = 0; i < 9; i++) {
    let square = document.getElementById(`square${i}`);
    square?.addEventListener('click', () => {
        if (selectedElement != null || selectedElement != '') {
            let selectedSquare = square?.id.slice(-1);
            if (square?.textContent) {
                throw new Error('Square already has a value');
            }
            if (selectedSquare) {
                console.log(`Trying to place ${selectedElement} in square ${selectedSquare}`);
                makeMove(selectedSquare, selectedElement);
            }
        }
    })
}

// Initialize event listeners for the numbers
function setUpNumberEventListeners() {
    for (let i = 0; i < 9; i++) {
        let text = document.getElementById(`text${i}`);
        text?.addEventListener('click', () => {
            if (document.querySelectorAll('.selected').length == 0) {
                text?.classList.add('selected');
                if (text?.textContent) {
                    selectedElement = text.textContent;
                }
            } else if (document.querySelectorAll('.selected').length == 1) {
                document.querySelectorAll('.selected')[0].classList.remove('selected');
                text?.classList.add('selected');
                if (text?.textContent) {
                    selectedElement = text.textContent;
                }
            } else {
                text?.classList.remove('selected');
                selectedElement = '';
            }
        });
    }
}

function makeMove(square: string, play: string) {
    let _square = parseInt(square);
    let _play = parseInt(play);
    let data = {
        'type': 'move',
        'message': {
            'game_id': game_id,
            'space': _square,
            'play': _play
        }
    };
    socket.send(JSON.stringify(data));
}

function connect() {
    socket.onopen = function open() {
        console.log('Connected to websocket');
    }

    socket.onclose = function (e) {
        console.log('Disconnected from websocket.  Reconnect attempt in 1 second...', e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    }

    socket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        if ('payload' in data) {
            data = data['payload'];
            if (data['type'] == 'move') {
                for (let i = 0; i < data['spaces'].length; i++) {
                    let square = document.getElementById(`square${i}`);
                    if (square) {
                        if (data['spaces'][i] == 0) {
                            square.textContent = '';
                        } else {
                            square.textContent = data['spaces'][i];
                        }
                    }
                }

                let p1Numbers = document.getElementById('player_one_numbers');
                let p2Numbers = document.getElementById('player_two_numbers');

                if (data['round'] % 2 == 0) {
                    p2Numbers?.classList.remove('disabled');
                    p1Numbers?.classList.add('disabled');
                } else {
                    p1Numbers?.classList.remove('disabled');
                    p2Numbers?.classList.add('disabled');
                }
                // Update the player one numbers
                const playerOneNumbersContainer = p1Numbers?.querySelector('.ttt-row-numbers');
                if (playerOneNumbersContainer) {
                    playerOneNumbersContainer.innerHTML = '';
                    for (let i = 0; i < 9; i++) {
                        if ((i + 1) % 2 !== 0 && !data['plays'].includes((i + 1))) {
                            const numberDiv = document.createElement('div');
                            numberDiv.className = 'ttt-number';
                            numberDiv.id = 'text' + i;
                            numberDiv.textContent = (i + 1).toString();
                            playerOneNumbersContainer.appendChild(numberDiv);
                        }
                    }
                }

                // Update the player two numbers
                const playerTwoNumbersContainer = p2Numbers?.querySelector('.ttt-row-numbers');
                if (playerTwoNumbersContainer) {
                    playerTwoNumbersContainer.innerHTML = '';
                    for (let i = 0; i < 9; i++) {
                        if ((i + 1) % 2 === 0 && !data['plays'].includes((i + 1))) {
                            const numberDiv = document.createElement('div');
                            numberDiv.className = 'ttt-number';
                            numberDiv.id = 'text' + i;
                            numberDiv.textContent = (i + 1).toString();
                            playerTwoNumbersContainer.appendChild(numberDiv);
                        }
                    }
                }

                // Set up the numbers' event listeners for each message
                setUpNumberEventListeners();

                // Check if the current user can play a move
                let currentPlayer = data['round'] % 2 === 0 ? data['p2'] : data['p1'];
                let appElement = document.getElementById('15t_app');
                let currentUserId = appElement?.dataset.userId;

                if (currentPlayer == currentUserId) {
                    appElement?.classList.remove('turn-disable');
                } else {
                    appElement?.classList.add('turn-disable');
                }
            } else if (data['type'] == 'redirect') {
                console.log("Redirect message received");
                window.location.href = data['message']['url'];
            } else if ('error' in data) {
                alert(data['error']);
            }
        } else {
            console.warn('No payload in message: ', data);
        }
    }

}



connect();
setUpNumberEventListeners();