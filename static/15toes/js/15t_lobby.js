"use strict";
let lobbyOptions = document.getElementById('lobbyOptions');
let isMobile = window.matchMedia("only screen and (max-width: 48rem)").matches;
if (!isMobile) {
    lobbyOptions === null || lobbyOptions === void 0 ? void 0 : lobbyOptions.classList.add('ft-row');
}
else {
    lobbyOptions === null || lobbyOptions === void 0 ? void 0 : lobbyOptions.classList.add('ft-col');
}
function gameStart() {
    let url = `${window.location.href}start/`;
}
