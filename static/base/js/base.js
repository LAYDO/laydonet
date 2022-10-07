let overlay = document.getElementById('laydoOverlay');

let prevScrollPos = window.scrollY;
window.onscroll = () => {
    let currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
        document.getElementById('laydoMNavbar').style.top = "0px";
    } else if (document.getElementById('laydoHomeOne').style.top == '0px') {
        document.getElementById('laydoMNavbar').style.top = "0px";
    } else {
        document.getElementById('laydoMNavbar').style.top = "-50px";
    }
    prevScrollPos = currentScrollPos + 1;
}

// Sets theme
if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
} else {
    setTheme('theme-light');
}

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

// DARK/LIGHT THEME credit to 
// https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2

function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function openSocial(evt) {
    let social = evt.currentTarget.id.replace("Icon", "").toLowerCase();
    if (social === "twitter") {
        window.open("https://www.twitter.com/laydo1213");
    } else if (social === "linked") {
        window.open("https://www.linkedin.com/in/landen-robinson-97683620/");
    } else if (social === "github") {
        window.open("https://github.com/LAYDO");
    }
}