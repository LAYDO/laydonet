class Chat {
    constructor(parent, text, user) {
        if (text != undefined) {
            this.text = text;
        }
        if (user != undefined) {
            this.user = user;
        }
        this.textContainer = document.createElement('div');
        this.textContainer.classList.add('laydo-text-container');

        this.userTitle = document.createElement('div');
        this.userTitle.classList.add('laydo-user-title');
        this.userTitle.textContent = this.user;

        this.userText = document.createElement('div');
        this.userText.classList.add('laydo-text');
        this.userText.innerHTML = this.text;

        if (this.textContainer) {
            this.textContainer.appendChild(this.userTitle);
            this.textContainer.appendChild(this.userText);
        }

        if (parent != undefined && parent instanceof HTMLElement) {
            parent.appendChild(this.textContainer);
        }
    }
}

class User extends Chat {
    constructor(parent, content) {
        super(parent, content, 'You');
    }
}

class Laydo extends Chat {
    constructor(parent, response) {
        super(parent, response, 'LaydoAI');
    }
}

class Conversation {
    constructor(parent, data) {
        this.conversationContainer = document.createElement('div');
        this.conversationContainer.classList.add('laydo-conversation-container');

        this.id = data && data.conversation_id ? data.conversation_id : 'temp-id';

        if (parent != undefined && parent instanceof HTMLElement) {
            parent.appendChild(this.conversationContainer);
        }
        if (data) {
            this.update(data);
        }
    }

    update(data) {
        this.messages = data.messages;
        let content, lastContent;
        this.conversationContainer.innerHTML = '';
        this.messages.forEach((message, index) => {
            if (message.role == 'user') {
                content = new User(this.conversationContainer, message.content);
            } else if (message.role == 'assistant') {
                content = new Laydo(this.conversationContainer, message.content);
                this.conversationContainer.appendChild(content.textContainer);
                // if (content && (index < this.messages.length - 1)) {
                //     this.conversationContainer.appendChild(content.textContainer);
                // } else {
                //     lastContent = content;
                // }
            }
        });
        // if (lastContent) {
        //     this.typeOutText(lastContent.userText, lastContent.text, 1);
        // }
    }

    addUserMessage(message) {
        let content = new User(this.conversationContainer, message);
        this.conversationContainer.appendChild(content.textContainer);
    }

    typeOutText(element, text, typingSpeed) {
        let charIndex = 0;
        element.innerHTML = '';
        let typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                element.innerHTML += text.charAt(charIndex++);
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);
    }
}

init();

function init() {
    this.laydoInput = document.getElementById('laydoContentInput');
    this.laydoOutput = document.getElementById('laydoChatOutput');
    this.laydoInput.onfocus = function () {
        if (this.textContent === '') {
            this.innerHTML = '';
        }
    };

    this.laydoInput.onblur = function () {
        if (this.innerHTML === '') {
            this.textContent = '';
        }
    };

    this.laydoInput.onpaste = function (e) {
        e.preventDefault();
        let text = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') { 
            if (!event.shiftKey) {
                event.preventDefault();
                sendContent();
            }
        }
    });

    this.conversation;
}

function sendContent() {
    let content = this.laydoInput.innerHTML.trim();
    let newContent = content.replace(/<br\s*[\/]?>/gi, '\n');

    if (!this.conversation) {
        this.conversation = new Conversation(this.laydoOutput, null);
        this.conversation.addUserMessage(newContent);
     } else {
        this.conversation.addUserMessage(newContent);
    }
    this.laydoInput.innerHTML = '';
    let conversation = {
        conversation_id: this.conversation ? this.conversation.id : null,
        message: {
            role: "user",
            content: newContent
        }
    };
    displayLoading();
    let url = `${window.location.href}chat/`;
    let aiSelected = document.getElementById('selectedAI').value;
    if (aiSelected) {
        url = `${url}${aiSelected}/`;
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(conversation)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data != undefined) {
            // console.log(data);
            removeLoading();
            if (this.conversation.id === 'temp-id' && data.conversation_id) {
                this.conversation.id = data.conversation_id;
            }
            this.conversation.update(data);
        }
    }).catch(error => {
        removeLoading();
        console.error(error);
    });
}

function displayLoading() {
    let container = document.createElement('div');
    container.classList.add('laydo-text-container');
    container.id = 'laydoLoading';

    let userTitle = document.createElement('div');
    userTitle.classList.add('laydo-user-title');
    userTitle.textContent = 'LaydoAI';

    let loading = document.createElement('div');
    loading.classList.add('laydo-loading');

    container.appendChild(userTitle);
    container.appendChild(loading);

    this.laydoOutput.appendChild(container);
}

function removeLoading() {
    let loading = document.getElementById('laydoLoading');
    if (loading) {
        loading.remove();
    }
}

