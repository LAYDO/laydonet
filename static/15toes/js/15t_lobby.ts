let lobbyOptions = document.getElementById('lobbyOptions');
let isMobile = window.matchMedia("only screen and (max-width: 48rem)").matches;

if (!isMobile) {
    lobbyOptions?.classList.add('ft-row');
} else {
    lobbyOptions?.classList.add('ft-col');
}