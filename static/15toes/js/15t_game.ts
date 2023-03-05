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
            let selectedSquare = square?.id.slice(-1);
            if (square?.textContent) {
                throw new Error('Square already has a value');
            }
            console.log(`Trying to place ${selectedElement} in square ${selectedSquare}`);
            let url = `${window.location.href}turn`;
            let data = { space: selectedSquare, play: selectedElement };
            square?.append(loader());
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                square?.childNodes.forEach(node => {
                    node.remove();
                })
                if (response.ok) {
                    if (response.redirected) {
                        window.location.href = response.url;
                    }
                } else {
                    throw new Error('Response was not ok from the server.');
                }
            }).catch(error => {
                console.error(error);
            })
        }
    })
}

function loader() {
    let container = document.createElement('section');
    container.classList.add('container');

    let div1 = document.createElement('div');

    let h6 = document.createElement('span');
    h6.classList.add('one');
    h6.classList.add('h6');

    let h3 = document.createElement('span');
    h3.classList.add('two');
    h3.classList.add('h3');

    div1.append(h6);
    div1.append(h3);

    let div2 = document.createElement('div');

    let h1 = document.createElement('span');
    h1.classList.add('one');
    h1.classList.add('h1');

    let h4 = document.createElement('span');
    h4.classList.add('two');
    h4.classList.add('h4');

    div2.append(h1);
    div2.append(h4);

    let div3 = document.createElement('div');

    let h5 = document.createElement('span');
    h5.classList.add('one');
    h5.classList.add('h5');

    let h2 = document.createElement('span');
    h2.classList.add('two');
    h2.classList.add('h2');

    div3.append(h5);
    div3.append(h2);

    container.append(div1);
    container.append(div2);
    container.append(div3);

    return container;
}