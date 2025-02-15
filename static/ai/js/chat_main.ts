import { ChatUI } from './ChatUI';
document.addEventListener('DOMContentLoaded', () => {
    let chatUIContainer = document.getElementById('chatUI');
    if (chatUIContainer) {
        let chatUI = new ChatUI(chatUIContainer);
    }
});
