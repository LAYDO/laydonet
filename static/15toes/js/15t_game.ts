let selectedElement = '';

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
            console.log(`Trying to place ${selectedElement} in square ${square?.id.slice(-1)}`);
        }
    })
}