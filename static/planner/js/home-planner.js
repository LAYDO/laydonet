"use strict";
let planner;
let offsetY, offsetX;
let targetElement = null;
init();
function init() {
    let property = document.getElementById('homePlanner');
    if (property) {
        planner = new Planner(property);
        addListeners();
    }
}
function addListeners() {
    document.querySelectorAll('.draggable').forEach((elem) => {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        elem.addEventListener('mousedown', (e) => {
            const mouseEvent = e;
            isDragging = true;
            offsetX = mouseEvent.clientX - elem.getBoundingClientRect().left;
            offsetY = mouseEvent.clientY - elem.getBoundingClientRect().top;
        });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging)
                return;
            const mouseEvent = e;
            const parentRect = elem.parentElement.getBoundingClientRect();
            const newX = mouseEvent.clientX - offsetX;
            const newY = mouseEvent.clientY - offsetY;
            const withinBoundsX = Math.max(parentRect.left, Math.min(newX, parentRect.right - elem.clientWidth));
            const withinBoundsY = Math.max(parentRect.top, Math.min(newY, parentRect.bottom - elem.clientHeight));
            elem.style.left = withinBoundsX + 'px';
            elem.style.top = withinBoundsY + 'px';
        });
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}
