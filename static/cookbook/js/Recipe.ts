// Object or something similar, where category name are the keys and the values are color codes.
const CATEGORY_DEFINITIONS: { [key: string]: string } = {
    Breakfast: '#FFD700',
    Lunch: '#FFA07A',
    Dinner: '#FF4500',
    Dessert: '#FF69B4',
    Snack: '#7FFF00',
    Drink: '#00BFFF',
    Other: '#808080',
};

export class Recipe {
    public id: string;
    public title: string;
    public category: string;
    public time_required: number;
    public ingredients: Array<string>;
    public instructions: Array<string>;
    constructor(id: string, title: string, category: string, time_required: number, ingredients: Array<string>, instructions: Array<string>) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.time_required = time_required;
        this.ingredients = ingredients;
        this.instructions = instructions;
    }
}

export class RecipeItem extends Recipe {
    public parentContainer: HTMLElement;
    public container: HTMLElement;
    public leftContainer: HTMLElement;
    public middleContainer: HTMLElement;
    public rightContainer: HTMLElement;
    public categoryElement: HTMLElement;
    public titleElement: HTMLElement;
    public timeRequiredElement: HTMLElement;

    constructor(parentContainer: HTMLElement, id: string, title: string, category: string, time_required: number, ingredients: Array<string>, instructions: Array<string>) {
        super(id, title, category, time_required, ingredients, instructions);

        this.parentContainer = parentContainer;

        this.container = document.createElement('div');
        this.container.classList.add('laydo-row-space', 'laydo-recipe-item');
        this.container.addEventListener('click', () => {
            this.showRecipeDetail(this.id);
        });
        
        this.leftContainer = document.createElement('div');
        this.leftContainer.classList.add('laydo-flex-col', "laydo-recipe-left");
        this.container.appendChild(this.leftContainer);
        
        this.middleContainer = document.createElement('div');
        this.middleContainer.classList.add('laydo-flex-col', 'laydo-recipe-middle');
        this.container.appendChild(this.middleContainer);
        
        this.rightContainer = document.createElement('div');
        this.rightContainer.classList.add('laydo-flex-col', 'laydo-recipe-right');
        this.container.appendChild(this.rightContainer);
        
        this.categoryElement = document.createElement('div');
        this.categoryElement.textContent = this.category;
        this.categoryElement.classList.add('laydo-category');
        this.leftContainer.style.backgroundColor = CATEGORY_DEFINITIONS[this.category];
        this.leftContainer.appendChild(this.categoryElement);
        
        this.titleElement = document.createElement('div');
        this.titleElement.classList.add('laydo-middle-title');
        this.titleElement.textContent = this.title;
        this.middleContainer.appendChild(this.titleElement);
        
        this.timeRequiredElement = document.createElement('div');
        this.timeRequiredElement.textContent = `${this.time_required.toString()} mins`;
        this.rightContainer.appendChild(this.timeRequiredElement);

        this.parentContainer.appendChild(this.container);
    }

    public showRecipeDetail(id: string) {
        window.location.href = `/cookbook/${id}`;
    }
}