import { marked } from 'marked';

class Chat {
    parentContainer: HTMLElement;
    stepContainer: HTMLElement;
    text: string;
    textContainer: HTMLElement;
    user: string;
    userTitle: HTMLElement;
    userTextContainer: HTMLElement;
    userText: HTMLElement;
    copyButton: HTMLElement;
    constructor(parent: HTMLElement, text: string, user: string) {
        this.parentContainer = parent;
        this.stepContainer = document.createElement('div');
        this.text = '';
        this.user = '';
        // Parse the text content
        if (text != undefined) {
            let textContent = text.replace("<p>", "").replace("</p>", "");
            try {
                if (user == 'LaydoAI') {
                    if (textContent.startsWith('[')) {
                        let parsedText = JSON.parse(textContent);
                        if (Array.isArray(parsedText)) {
                            parsedText?.forEach(item => {
                                if (item[0] && item[1] && item[2]) {

                                    let stepTitle = document.createElement('div');
                                    stepTitle.classList.add('laydo-step-title');
                                    stepTitle.textContent = `${item[0]}\n\n`;

                                    let stepText = document.createElement('div');
                                    stepText.classList.add('laydo-step-text');
                                    stepText.innerHTML = `${item[1]} <i>(${item[2].toFixed(2)} seconds)</i>`;

                                    this.stepContainer.appendChild(stepTitle);
                                    this.stepContainer.appendChild(stepText);
                                }
                            });
                        }
                    } else {
                        this.text = text;
                    }
                } else {
                    this.text = text;
                }
            } catch (error) {
                console.error(error);
            }
        }
        // Set the user
        if (user != undefined) {
            this.user = user;
        }
        this.textContainer = document.createElement('div');
        this.textContainer.classList.add('laydo-text-container');

        this.userTitle = document.createElement('div');
        this.userTitle.classList.add('laydo-user-title');
        this.userTitle.textContent = this.user;
        this.textContainer.appendChild(this.userTitle);

        this.userTextContainer = document.createElement('div');
        this.userTextContainer.classList.add('user-text-container');
        this.textContainer.appendChild(this.userTextContainer);

        this.userText = document.createElement('div');
        this.userText.classList.add('laydo-text', 'laydo-step-container');
        if (this.user == 'LaydoAI') {
            this.userText.classList.add('laydo-ai-text');
        }

        if (this.stepContainer.hasChildNodes()) {
            this.userText.appendChild(this.stepContainer);
        } else {
            this.userText.innerHTML = this.text;
        }

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        this.copyButton = document.createElement('button');
        this.copyButton.classList.add('copy-button', "fa-regular", "fa-copy");
        this.copyButton.addEventListener('click', () => {
            if (this.userText.textContent == undefined) {
                return;
            }
            navigator.clipboard.writeText(this.userText.textContent).then(() => {
                console.log('Text copied to clipboard');
            }, (error) => {
                console.error('Could not copy text: ', error);
            });
        });
        buttonContainer.appendChild(this.copyButton);
        
        if (this.textContainer && this.userTextContainer) {
            this.userTextContainer.appendChild(this.userText);
            this.textContainer.appendChild(buttonContainer);
        }

        if (parent != undefined && parent instanceof HTMLElement) {
            parent.appendChild(this.textContainer);
        }
    }
}

export class User extends Chat {
    constructor(parent: HTMLElement, content: string) {
        super(parent, content, 'You');
    }
}

export class Laydo extends Chat {
    constructor(parent: HTMLElement, response: string) {
        super(parent, response, 'LaydoAI');
        this.userText.textContent = '';
        this.initialize(response);
    }

    private async initialize(response: string) {
        if (!this.stepContainer.hasChildNodes()) {
            const parsedResponse = await marked.parse(response);
            this.userText.innerHTML = parsedResponse;
        }
    }
}