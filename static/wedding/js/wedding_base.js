function redirect(evt) {
    var y = document.getElementsByClassName('active');
    for (var i = 0; i < y.length; i++) {
        y[i].className = '';
    }
    if (evt.currentTarget.id == 'aplNavTitle') {
        window.location.pathname = '';
    } else {
        window.location.pathname = evt.currentTarget.id.toLowerCase();
        // document.getElementById(window.location.pathname).className = 'active';
    }
}

function openNav() {
    document.getElementById("aplOverlay").style.width = "67%";
    document.getElementById("aplMNavbar").style.marginRight = "67%";
    document.getElementById("aplMNavbar").style.justifyContent = "flex-end";
    document.getElementById("aplNavTitle").style.display = "none";
}

function closeNav() {
    document.getElementById("aplOverlay").style.width = "0";
    document.getElementById("aplMNavbar").style.marginRight = "0";
    document.getElementById("aplNavTitle").style.display = "block";
    document.getElementById("aplMNavbar").style.justifyContent = "space-between";
}

function toggleNav() {
    if (document.getElementById("aplNavTitle").style.display != "none") {
        openNav();
    } else {
        closeNav();
    }
}

function toggleCode() {
    let y = document.getElementById('showCode');
    let code = document.getElementById('unlockCode');
    if (y.classList.contains('hide-password')) {
        y.className = y.className.replace(' hide-password', ' show-password');
        code.type = "text";
    } else {
        y.className = y.className.replace(' show-password', ' hide-password');
        code.type = "password";
    }
}

function openOverlay(e) {
    closeNav();
    if (e.currentTarget.id === "alCode") {
        document.getElementById('codeOverlay').style.display = "flex";
    } else {
        document.getElementById('searchOverlay').style.display = "flex";
    }
    document.getElementById('aplNavIcon').style.display = "none";
}
function closeOverlay() {
    document.getElementById('codeOverlay').style.display = "none";
    document.getElementById('searchOverlay').style.display = "none";
    document.getElementById('rsvpOverlay').style.display = "none";
    document.getElementById('guestsOverlay').style.display = "none";
    document.getElementById('aplNavIcon').style.display = "inherit";
}

let navLinks = document.getElementsByClassName('nav-link');
for (let navLink of navLinks) {
    navLink.addEventListener('click', redirect);
}

let appTitles = document.getElementsByClassName('apl-nav-title');
for (let appTitle of appTitles) {
    appTitle.addEventListener('click', redirect);
}

let navIcon = document.getElementById('aplNavIcon');
navIcon.addEventListener('click', toggleNav);


// Mobile Enhancements

document.addEventListener("click", function (e) {
    if (!document.getElementById("aplNavIcon").contains(e.target) && (!document.getElementById("aplOverlay").contains(e.target))) {
        closeNav();
    }
});

function handleGesture() { // props to Damjan Pavlica
    if ((touchendX < touchstartX) && (touchstartX - touchendX > 100)) {
        openNav();
    }
    if ((touchendX > touchstartX) && (touchendX - touchstartX > 100)) {
        closeNav();
    }
}

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
})