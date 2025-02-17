export class CelestialTile {
    protected baseW: number = 128;
    protected baseH: number = 128;
    protected bW: number = 128;
    protected bH: number = 128;
    public container: HTMLElement;
    public element: HTMLElement;
    public title: HTMLElement;
    public minis: Array<HTMLElement>;

    constructor(element: string, icon: string, mini: Array<string>, container: HTMLElement, sub?: Array<string>) {
        this.element = document.createElement('div');
        this.element.id = `${element.toLowerCase()}`;

        this.title = document.createElement('div');
        this.title.id = `${element.toLowerCase()}Title`;
        this.title.className = 'container-title';
        let span = document.createElement('span');
        span.className = `fas fa-${icon.toLowerCase()} pad-right`;
        this.title.append(span);
        this.title.append(`${element}`);
        this.element.append(this.title);
        this.minis = [];

        mini.forEach((m, i) => {
            let miniData = document.createElement('div');
            miniData.id = `${m}`;
            miniData.className = 'mini-data';
            this.minis.push(miniData);
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

        this.container = container;
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