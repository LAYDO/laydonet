window.onscroll = () => {
    changeBackground();
}

for (var i = 0; i < 8; i++) {
    let img = document.createElement('img');
    img.src = `/static/img/proposal/landenfinals-lauriejeanphotography-${i}.jpg`;
    img.className = 'apl-pic';
    document.getElementById('proposalGallery').append(img);
}

function changeBackground() {
    let backTrigger2 = document.getElementById('laPushFam').getBoundingClientRect();
    let backTrigger3 = document.getElementById('aplStoryOne').getBoundingClientRect();
    let backTrigger4 = document.getElementById('aplHomeThree').getBoundingClientRect();
    // let backTrigger5 = document.getElementById('aplHomeFive').getBoundingClientRect();

    // console.log(backTrigger3);

    let back3 = document.getElementById('aplBackground3');
    let back4 = document.getElementById('aplBackground4');
    let back7 = document.getElementById('aplBackground7');
    let back8 = document.getElementById('aplBackground8');

    if (backTrigger2.bottom > 0 && backTrigger2.bottom < window.innerHeight) {
        back3.style.transform = `translateY(-${window.innerHeight - backTrigger2.bottom}px)`;
    } else if (backTrigger2.bottom <= -1) {
        back3.style.transform = `translateY(-100%)`;
    } else if (backTrigger2.top > window.innerHeight) {
        back3.style.transform = `translateY(0)`;
        back4.style.transform = `translateY(${window.innerHeight}px)`;
        back7.style.transform = `translateY(${window.innerHeight}px)`;
        back8.style.transform = `translateY(${window.innerHeight}px)`;
    }

    if (backTrigger3.bottom > 0 && backTrigger3.bottom < window.innerHeight) {
        back7.style.transform = `translateY(${backTrigger3.bottom}px)`;
    } else if (backTrigger3.bottom > window.innerHeight) {
        back7.style.transform = `translateY(${backTrigger3.bottom}px)`;
    } else if (backTrigger3.bottom <= -1) {
        back7.style.transform = `translateY(0)`;
    }

    if (backTrigger4.bottom > 0 && backTrigger4.bottom < window.innerHeight) {
        back8.style.transform = `translateY(${backTrigger4.bottom}px)`;
    } else if (backTrigger4.bottom > window.innerHeight) {
        back8.style.transform = `translateY(${backTrigger4.bottom}px)`;
    } else if (backTrigger4.bottom <= -1) {
        back8.style.transform = `translateY(0)`;
    }
    // else if (backTrigger3.top > window.innerHeight) {
    //     back3.style.transform = `translateY(0)`;
    //     back4.style.transform = `translateY(${window.innerHeight}px)`;
    // }

    if (backTrigger2.bottom > 0 && backTrigger2.bottom < window.innerHeight) {
        back4.style.transform = `translateY(${window.innerHeight - (window.innerHeight - backTrigger2.bottom)}px)`;
    }
}

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