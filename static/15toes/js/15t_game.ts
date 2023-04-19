let selectedElement = '';
let game_id = document.getElementById('ftSquares')?.getAttribute('game_id');

let connectionString = `ws://${window.location.host}/ws/game/${game_id}/`;
let socket = new WebSocket(connectionString);

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
    })
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
        data = data['payload'];
        if (data['type'] == 'move') {
            let play = data['play'];
            let space = data['space'];
            let square = document.getElementById(`square${space}`);
            if (square) {
                square.innerHTML = play;
            }
        } else if (data['type'] == 'redirect') {
            window.location.href = data['url'];
        } else if (data['type'] == 'error') {
            alert(data['message']);
        }
    }
}

connect();