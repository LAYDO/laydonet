"use strict";
// let planner: Planner;
// let offsetY: number, offsetX: number;
// let targetElement: HTMLElement | null = null;
// init();
// function init() {
//     let property = document.getElementById('homePlanner');
//     if (property) {
//         planner = new Planner(property);
//         addListeners();
//     }
// }
// function addListeners() {
//     document.querySelectorAll<HTMLElement>('.draggable').forEach((elem) => {
//         let isDragging = false;
//         let offsetX = 0;
//         let offsetY = 0;
//         elem.addEventListener('mousedown', (e) => {
//             const mouseEvent = e as MouseEvent;
//             isDragging = true;
//             offsetX = mouseEvent.clientX - elem.getBoundingClientRect().left;
//             offsetY = mouseEvent.clientY - elem.getBoundingClientRect().top;
//         });
//         window.addEventListener('mousemove', (e) => {
//             if (!isDragging) return;
//             const mouseEvent = e as MouseEvent;
//             const parentRect = elem.parentElement!.getBoundingClientRect();
//             const newX = mouseEvent.clientX - offsetX;
//             const newY = mouseEvent.clientY - offsetY;
//             const withinBoundsX = Math.max(parentRect.left, Math.min(newX, parentRect.right - elem.clientWidth));
//             const withinBoundsY = Math.max(parentRect.top, Math.min(newY, parentRect.bottom - elem.clientHeight));
//             elem.style.left = withinBoundsX + 'px';
//             elem.style.top = withinBoundsY + 'px';
//         });
//         window.addEventListener('mouseup', () => {
//             isDragging = false;
//         });
//     });
// }
// const svgNS = "http://www.w3.org/2000/svg";
// // Create an SVG element
// const svg = document.createElementNS(svgNS, "svg");
// svg.setAttributeNS(null, "width", "800");
// svg.setAttributeNS(null, "height", "600");
// svg.style.border = "0.25rem solid var(--font-color)";
// // Create a rectangle
// const rect = document.createElementNS(svgNS, "rect");
// rect.setAttributeNS(null, "x", "100");
// rect.setAttributeNS(null, "y", "100");
// rect.setAttributeNS(null, "width", "100");
// rect.setAttributeNS(null, "height", "50");
// rect.setAttributeNS(null, "fill", "#ff0000");
// svg.appendChild(rect);
let dragging = false;
let offsetX = 0;
let offsetY = 0;
let planner;
let container = document.getElementById('homePlanner');
if (container) {
    planner = new Planner(container);
    // Mouse down event to start dragging
    planner.house.addEventListener("mousedown", (event) => {
        dragging = true;
        offsetX = event.clientX - parseFloat(planner.house.getAttributeNS(null, "x"));
        offsetY = event.clientY - parseFloat(planner.house.getAttributeNS(null, "y"));
    });
    // Mouse move event to update the rectangle position
    planner.property.addEventListener("mousemove", (event) => {
        if (dragging) {
            let x = event.clientX - offsetX;
            let y = event.clientY - offsetY;
            // Bounds checking
            const svgWidth = parseFloat(planner.property.getAttributeNS(null, "width"));
            const svgHeight = parseFloat(planner.property.getAttributeNS(null, "height"));
            const rectWidth = parseFloat(planner.house.getAttributeNS(null, "width"));
            const rectHeight = parseFloat(planner.house.getAttributeNS(null, "height"));
            x = Math.min(Math.max(0, x), svgWidth - rectWidth);
            y = Math.min(Math.max(0, y), svgHeight - rectHeight);
            planner.house.setAttributeNS(null, "x", x.toString());
            planner.house.setAttributeNS(null, "y", y.toString());
        }
    });
    // Mouse up event to stop dragging
    planner.property.addEventListener("mouseup", () => {
        dragging = false;
    });
}
