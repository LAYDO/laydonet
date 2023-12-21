export class ElementTile {
    public container: HTMLElement;
    public element: HTMLElement;
    public title: HTMLElement;

    constructor(element: string, icon: string, mini: Array<string>, container: string, sub?: Array<string>) {
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

        mini.forEach(m => {
            let miniData = document.createElement('div');
            miniData.id = `${m}`;
            miniData.className = 'mini-data';
            this.element.append(miniData);
        })

        sub?.forEach(s => {
            let subData = document.createElement('div');
            subData.className = 'sub-data';
            if (sub) {
                subData.id = `${s}`;
            }
            this.element.append(subData);
        })

        this.container = document.getElementById(`${container}`)!;
        this.container.append(this.element);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.element.style.display = 'flex';
        } else {
            this.element.style.display = 'none';
        }
    }
}