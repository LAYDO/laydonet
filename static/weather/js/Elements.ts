class Elements {
    public eTilesElement: HTMLElement;
    public elementRowOne: HTMLElement;
    public elementRowTwo: HTMLElement;
    public elementRowThree: HTMLElement;
    public AQI: any;

    constructor() {
        this.eTilesElement = document.getElementById('elementTiles')!;

        this.elementRowOne = document.createElement('div');
        this.elementRowOne.id = 'elementRowOne';
        this.elementRowOne.className = 'elements-row';

        
        this.elementRowTwo = document.createElement('div');
        this.elementRowTwo.id = 'elementRowTwo';
        this.elementRowTwo.className = 'elements-row';
        
        this.elementRowThree = document.createElement('div');
        this.elementRowThree.id = 'elementRowThree';
        this.elementRowThree.className = 'elements-row';
        
        this.eTilesElement.append(this.elementRowOne);
        this.eTilesElement.append(this.elementRowTwo);
        this.eTilesElement.append(this.elementRowThree);

        this.AQI = new AQI();
        // this.elementRowOne.append(this.AQI);
    }

    toggle(loaded: Boolean) {
        if (loaded) {
            this.eTilesElement.style.display = 'flex';
        } else {
            this.eTilesElement.style.display = 'none';
        }
    }
}