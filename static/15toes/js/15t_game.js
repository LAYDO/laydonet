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
            console.log(`Trying to place ${selectedElement} in square ${square === null || square === void 0 ? void 0 : square.id.slice(-1)}`);
        }
    });
}
