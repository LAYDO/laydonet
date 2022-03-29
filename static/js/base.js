let overlay = document.getElementById('laydoOverlay');
function redirect(evt) {
    var y = document.getElementsByClassName('active');
    for (var i = 0; i < y.length; i++) {
        y[i].className = '';
    }
    if (evt.currentTarget.id == 'laydoNavTitle') {
        window.location.pathname = '';
    } else {
        window.location.pathname = evt.currentTarget.id.toLowerCase();
        // document.getElementById(window.location.pathname).className = 'active';
    }
}


function toggleOverlay() {
    let menu = document.getElementById('laydoNavIcon');
    menu.classList.toggle('change');
    if (menu.classList.contains('change')) {
        document.body.style.overflow = 'hidden';
        overlay.style.display = "flex";
    } else {
        document.body.style.overflow = 'auto';
        overlay.style.display = "none";
    }
}

async function getSomething() {

    // let name = document.getElementById('').value;
    let url = `${window.location.origin}/endpoint_here/?`;

    fetch(url).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error('There has been a problem with your fetch operation: ', error);
    })
}

// Mobile Enhancements - these are more for a side navigation menu but possibly useful for something else

// document.addEventListener("click", function (e) {
//     if (!document.getElementById("laydoNavIcon").contains(e.target) && (!document.getElementById("laydoOverlay").contains(e.target))) {
//         closeNav();
//     }
// });

// function handleGesture() { // props to Damjan Pavlica
//     if ((touchendX < touchstartX) && (touchstartX - touchendX > 100)) {
//         openNav();
//     }
//     if ((touchendX > touchstartX) && (touchendX - touchstartX > 100)) {
//         closeNav();
//     }
// }

// document.addEventListener('touchstart', e => {
//     touchstartX = e.changedTouches[0].screenX;
// });
// document.addEventListener('touchend', e => {
//     touchendX = e.changedTouches[0].screenX;
//     handleGesture();
// })