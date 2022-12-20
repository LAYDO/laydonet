var appStorage = window.sessionStorage;
const isMobile = window.matchMedia("only screen and (max-width: 48rem)").matches;


window.onscroll = () => {
    changeBackground();
}

function changeBackground() {
    let backTrigger = document.getElementById('ringHug').getBoundingClientRect();
    // console.log(backTrigger);
    let back1 = document.getElementById('aplBackground1');
    let back2 = document.getElementById('aplBackground2');

    if (backTrigger.bottom > 0 && backTrigger.bottom < window.innerHeight) {
        back1.style.transform = `translateY(-${window.innerHeight - backTrigger.bottom}px)`;
    } else if (backTrigger.bottom <= -1) {
        back1.style.transform = `translateY(-100%)`;
    } else if (backTrigger.top > window.innerHeight) {
        back1.style.transform = `translateY(0)`;
        back2.style.transform = `translateY(${window.innerHeight}px)`;
    }

    if (backTrigger.bottom > 0 && backTrigger.bottom < window.innerHeight) {
        back2.style.transform = `translateY(${window.innerHeight - (window.innerHeight - backTrigger.bottom)}px)`;
    }
}

var y = document.getElementsByClassName("nav-link");
for (var i = 0; i < y.length; i++) {
    let temp = y[i].id.toLowerCase();
    appStorage.setItem(y[i].id, false);
    let path = window.location.pathname.replace('/', '');
    path = path.replace('/', '');
    if (path == temp) {
        appStorage.setItem(y[i].id, true);
    }
}
for (var i = 0; i < 10; i++) {
    let img = document.createElement('img');
    img.src = `/static/wedding/img/engagement/Aieleen-Landen-Engagement-${i}.jpg`;
    img.className = 'apl-pic';
    document.getElementById('engagementGallery').append(img);
}
// for (var i = 0; i < appStorage.length; i++) {
//     var active = appStorage.getItem(appStorage.key(i));
//     if (active === "true") {
//         // document.getElementById('aplNavTitle').innerText = appStorage.key(i).toUpperCase();
//         document.getElementById(appStorage.key(i)).className += " active";
//     }
// }