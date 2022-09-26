"use strict";
class ElementTile {
    constructor(element, icon, mini, container, sub) {
        this.element = document.createElement('div');
        this.element.id = `${element.toLowerCase()}`;
        this.element.className = 'element-tile';
        this.title = document.createElement('div');
        this.title.id = `${element.toLowerCase()}Title`;
        this.title.className = 'container-title';
        let span = document.createElement('span');
        span.className = `fas fa-${icon.toLowerCase()} pad-right`;
        this.title.append(span);
        this.title.append(`${element}`);
        this.element.append(this.title);
        this.miniData = document.createElement('div');
        this.miniData.id = `${mini.toLowerCase()}Data`;
        this.miniData.className = 'mini-data';
        this.element.append(this.miniData);
        this.subData = document.createElement('div');
        this.subData.className = 'sub-data';
        if (sub) {
            this.subData.id = `${sub.toLowerCase()}Data`;
        }
        this.element.append(this.subData);
        this.container = document.getElementById(`${container}`);
        this.container.append(this.element);
    }
    toggle(loaded) {
        if (loaded) {
            this.element.style.display = 'flex';
        }
        else {
            this.element.style.display = 'none';
        }
    }
}
