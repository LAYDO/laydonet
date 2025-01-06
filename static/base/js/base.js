let homeLinks = ['laydoNavTitle', ''];
let subdomainLinks = ['ai'];
let overlay = document.getElementById('laydoOverlay');

let prevScrollPos = window.scrollY;
window.onscroll = () => {
    let currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
        document.getElementById('laydoMNavbar').style.top = "0px";
    } else if (document.getElementById('laydoHomeOne').getBoundingClientRect().top >= 0) {
        document.getElementById('laydoMNavbar').style.top = "0px";
    } else {
        document.getElementById('laydoMNavbar').style.top = "-50px";
    }
    prevScrollPos = currentScrollPos;
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
    if (homeLinks && homeLinks.includes(evt.currentTarget.id)) {
        redirectToSubdomain();
    } else if (subdomainLinks && subdomainLinks.includes(evt.currentTarget.id)) {
        redirectToSubdomain(evt.currentTarget.id);
    } else {
        window.location.pathname = evt.currentTarget.id.toLowerCase();
    }
}

let appButtons = document.getElementsByClassName('app-button');
for (let appButton of appButtons) {
    appButton.addEventListener('click', redirect);
}

let navLinks = document.getElementsByClassName('nav-link');
for (let navLink of navLinks) {
    if (navLink.id != 'themeIcon') {
        navLink.addEventListener('click', redirect);
    }
}

let navTitle = document.getElementById('laydoNavTitle');
if (navTitle) {
    navTitle.addEventListener('click', redirect);
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

function redirectToUrl(evt) {
    let subdomain = evt.currentTarget.id.toLowerCase();
    if (typeof subdomain === 'string' && subdomain.trim().length > 0) {
        const url = `https://www.${subdomain.trim()}.com`;
        window.location.href = url;
    } else {
        console.error('Invalid subdomain provided.');
    }
}

let aa = document.getElementById('apollosarcade');
if (aa) {
    aa.addEventListener('click', redirectToUrl);
}

let wedding = document.getElementById('wedding');
if (wedding) {
    wedding.addEventListener('click', redirect);
}

let themeIcon = document.getElementById('themeIcon');
if (themeIcon) {
    themeIcon.addEventListener('click', toggleTheme);
}

let navIcon = document.getElementById('laydoNavIcon');
if (navIcon) {
    navIcon.addEventListener('click', toggleOverlay);
}

let socialIcons = document.getElementsByClassName('socicon');
for (let socialIcon of socialIcons) {
    socialIcon.addEventListener('click', openSocial);
}

function redirectToSubdomain(sub = '') {
    let newUrl = '';
    const hostname = window.location.hostname;
    const port = window.location.port;
    const protocol = window.location.protocol;

    // Handle localhost separately
    const baseHostname = hostname.includes('localhost') ? 'localhost' : hostname.split('.').slice(-2).join('.');
    if (sub === '') {
        newUrl = `${protocol}//${baseHostname}${port ? ':' + port : ''}`;
    } else {
        newUrl = `${protocol}//${sub}.${baseHostname}${port ? ':' + port : ''}`;
    }

    window.location.href = newUrl;
}