import {User, Laydo } from './Chat';

export class Conversation {
    parentContainer: HTMLElement;
    conversationContainer: HTMLElement;
    id: string;
    messages: string[];
    constructor(parent: HTMLElement, data: any) {
        this.parentContainer = parent;
        this.conversationContainer = document.createElement('div');
        this.conversationContainer.classList.add('laydo-conversation-container');

        this.id = data && data.conversation_id ? data.conversation_id : 'temp-id';
        this.messages = [];

        if (parent != undefined && parent instanceof HTMLElement) {
            parent.appendChild(this.conversationContainer);
        }
        if (data) {
            this.update(data);
        }
    }

    update(data: any) {
        this.messages = data.messages;
        let content: any;
        this.conversationContainer.innerHTML = '';

        this.messages.forEach((message: any, index: number) => {
            if (message.display_content) {
                if (message.role == 'user') {
                    content = new User(this.conversationContainer, message.content);
                } else if (message.role == 'assistant') {
                    content = new Laydo(this.conversationContainer, message.content);
                    // this.conversationContainer.appendChild(content.textContainer);
                }
                if (content?.textContainer) {
                    this.conversationContainer.appendChild(content.textContainer);
                }
            }
        });
    }

    addUserMessage(message: string) {
        let content = new User(this.conversationContainer, message);
        this.conversationContainer.appendChild(content.textContainer);
    }

    removeLastMessage() {
        const lastMessage = this.conversationContainer.lastElementChild;
        if (lastMessage) {
            this.conversationContainer.removeChild(lastMessage);
        }
    }
    
}