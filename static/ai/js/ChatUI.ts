import { Conversation } from './Conversation';

export class ChatUI {
    uiContainer: HTMLElement;
    header: HTMLElement;
    headerOptions: HTMLElement;
    modelOptions: HTMLElement;
    modelSelect: HTMLElement;
    main: HTMLElement;
    chatContainer: HTMLElement;
    chatInputContainer: HTMLElement;
    chatInputText: HTMLElement;
    chatInputButton: HTMLElement;
    chatOutput: HTMLElement;
    conversation: Conversation;
    aiModel: string;

    constructor(parent: HTMLElement) {
        this.uiContainer = parent;

        this.header = document.createElement('header');
        this.header.classList.add('laydo-header');
        this.uiContainer.appendChild(this.header);

        this.headerOptions = document.createElement('div');
        this.headerOptions.classList.add('laydo-header-options');
        this.header.appendChild(this.headerOptions);

        this.modelOptions = document.createElement('div');
        this.modelOptions.classList.add('laydo-options');
        this.headerOptions.appendChild(this.modelOptions);

        this.modelSelect = document.createElement('select');
        this.modelSelect.id = "selectedAI";
        this.modelSelect.addEventListener('change', (event) => {
            this.aiModel = (event.target as HTMLSelectElement).value;
            this.conversation = new Conversation(this.chatOutput, null);
        });
        this.modelOptions.appendChild(this.modelSelect);

        this.main = document.createElement('main');
        this.main.classList.add('laydo-main');
        this.uiContainer.appendChild(this.main);

        this.chatContainer = document.createElement('div');
        this.chatContainer.classList.add('laydo-chat-container');
        this.chatContainer.id = 'laydoChatContainer';
        this.main.appendChild(this.chatContainer);

        this.chatInputContainer = document.createElement('div');
        this.chatInputContainer.classList.add('laydo-chat-input');
        this.chatInputContainer.id = 'laydoChatInput';
        this.chatContainer.appendChild(this.chatInputContainer);

        this.chatInputText = document.createElement('div');
        this.chatInputText.classList.add('laydo-input');
        this.chatInputText.contentEditable = 'true';
        this.chatInputText.id = 'laydoContentInput';
        this.chatInputText.setAttribute('data-placeholder', 'Message LaydoAI...');
        this.chatInputText.onfocus = () => {
            this.chatInputText.removeAttribute('data-placeholder');
        };
        this.chatInputText.onblur = () => {
            this.chatInputText.setAttribute('data-placeholder', 'Message LaydoAI...');
        };
        this.chatInputText.onpaste = (event) => {
            event.preventDefault();
            let text = event.clipboardData?.getData('text');
            document.execCommand('insertText', false, text);
        }
        this.chatInputContainer.appendChild(this.chatInputText);

        this.chatInputButton = document.createElement('button');
        this.chatInputButton.classList.add('laydo-button');
        this.chatInputButton.id = "laydoContentSend";
        this.chatInputButton.addEventListener('click', () => {
            this.sendContent();
        });
        this.chatInputContainer.appendChild(this.chatInputButton);
        
        let send = document.createElement('span');
        send.classList.add('fa-solid', 'fa-paper-plane');
        this.chatInputButton.appendChild(send);

        this.chatOutput = document.createElement('div');
        this.chatOutput.classList.add('laydo-chat-output');
        this.chatOutput.id = 'laydoChatOutput';
        this.chatContainer.appendChild(this.chatOutput);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (!event.shiftKey) {
                    event.preventDefault();
                    this.sendContent();
                }
            }
        });

        this.conversation = new Conversation(this.chatOutput, null);
        this.aiModel = '';

        this.populateSelectOptions();
    }

    private populateSelectOptions() {
        fetch(`${window.location.href}get-models/`).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            data.models.forEach((model: any, index: number) => {
                let option = document.createElement('option');
                option.value = model.id;
                option.textContent = model.id;
                if (index == 0) {
                    option.selected = true;
                    this.aiModel = model.id;
                }
                this.modelSelect.appendChild(option);
            });
        }).catch(error => {
            console.error(error);
        });
    }

    private sendContent() {
        let content = this.chatInputText.innerHTML.trim();
        let newContent = content.replace(/<br\s*[\/]?>/gi, "\n");

        if (!this.conversation) {
            this.conversation = new Conversation(this.chatOutput, null);
            this.conversation.addUserMessage(newContent);
        } else {
            this.conversation.addUserMessage(newContent);
        }

        this.chatInputText.innerHTML = '';
        let conversation = {
            conversation_id: this.conversation ? this.conversation.id : null,
            message: {
                role: 'user',
                content: newContent
            }
        };
        this.displayLoading();
        window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
        fetch(`${window.location.href}chat/${this.aiModel}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(conversation)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if (data != undefined) {
                this.removeLoading();
                if (this.conversation.id == 'temp-id' && data.conversation_id) {
                    this.conversation.id = data.conversation_id;
                }
                this.conversation.update(data);
                if (this.chatContainer.children[0] == this.chatInputContainer) {
                    this.chatContainer.appendChild(this.chatInputContainer);
                }
                // window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        }).catch(error => {
            this.removeLoading();
            console.error(error);
        });
    }

    private displayLoading() {
        let container = document.createElement('div');
        container.classList.add('laydo-text-container');
        container.id = 'laydoLoading';

        let userTitle = document.createElement('div');
        userTitle.classList.add('laydo-user-title');
        userTitle.textContent = 'LaydoAI';

        let loading = document.createElement('section');
        loading.classList.add('container');
        let d1 = document.createElement('div');
        let d2 = document.createElement('div');
        let span1 = document.createElement('span');
        span1.classList.add('one', 'h6');
        let span2 = document.createElement('span');
        span2.classList.add('two', 'h3');
        d2.appendChild(span1);
        d2.appendChild(span2);
        d1.appendChild(d2);
        let d3 = document.createElement('div');
        let d4 = document.createElement('div');
        let span3 = document.createElement('span');
        span3.classList.add('one', 'h1');
        let span4 = document.createElement('span');
        span4.classList.add('two', 'h4');
        d4.appendChild(span3);
        d4.appendChild(span4);
        d3.appendChild(d4);
        let d5 = document.createElement('div');
        let d6 = document.createElement('div');
        let span5 = document.createElement('span');
        span5.classList.add('one', 'h5');
        let span6 = document.createElement('span');
        span6.classList.add('two', 'h2');
        d6.appendChild(span5);
        d6.appendChild(span6);
        d5.appendChild(d6);
        loading.appendChild(d1);
        loading.appendChild(d3);
        loading.appendChild(d5);

        let loadingContainer = document.createElement('div');
        loadingContainer.classList.add('laydo-loading-container');
        loadingContainer.appendChild(loading);

        container.appendChild(userTitle);
        container.appendChild(loadingContainer);

        this.chatOutput.appendChild(container);
    }
    
    private removeLoading() {
        let loading = document.getElementById('laydoLoading');
        if (loading) {
            loading.remove();
        }
    }
    
}