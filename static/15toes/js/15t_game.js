"use strict";
let selectedElement = '';
for (let i = 0; i < 9; i++) {
    let text = document.getElementById(`text${i}`);
    text === null || text === void 0 ? void 0 : text.addEventListener('click', () => {
        if (document.querySelectorAll('.selected').length == 0) {
            text === null || text === void 0 ? void 0 : text.classList.add('selected');
            if (text === null || text === void 0 ? void 0 : text.textContent) {
                selectedElement = text.textContent;
            }
        }
        else if (document.querySelectorAll('.selected').length == 1) {
            document.querySelectorAll('.selected')[0].classList.remove('selected');
            text === null || text === void 0 ? void 0 : text.classList.add('selected');
            if (text === null || text === void 0 ? void 0 : text.textContent) {
                selectedElement = text.textContent;
            }
        }
        else {
            text === null || text === void 0 ? void 0 : text.classList.remove('selected');
            selectedElement = '';
        }
    });
    let square = document.getElementById(`square${i}`);
    square === null || square === void 0 ? void 0 : square.addEventListener('click', () => {
        if (selectedElement != null || selectedElement != '') {
            let selectedSquare = square === null || square === void 0 ? void 0 : square.id.slice(-1);
            console.log(`Trying to place ${selectedElement} in square ${selectedSquare}`);
            let url = `${window.location.href}turn`;
            let data = { space: selectedSquare, play: selectedElement };
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    if (response.redirected) {
                        window.location.href = response.url;
                    }
                }
                else {
                    throw new Error('Response was not ok from the server.');
                }
            }).catch(error => {
                console.error(error);
            });
        }
    });
}
