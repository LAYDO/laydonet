import { RecipeItem, Recipe } from './Recipe';

export class Cookbook {
    private container: HTMLElement;
    private title: HTMLElement;
    private header: HTMLElement;
    private searchContainer: HTMLElement;
    private searchInput: HTMLElement;
    private searchButton: HTMLButtonElement;
    private addButton: HTMLElement;
    private recipes: RecipeItem[] = [];
    private recipesContainer: HTMLElement;
    private recipeModal: HTMLElement;
    private modalCloseButton: HTMLElement;
    private modalTitle: HTMLElement;
    private modalForm: HTMLElement;
    private recipeTitle: HTMLInputElement;
    private recipeCategory: HTMLSelectElement;
    private recipeTimeRequired: HTMLInputElement;
    private recipeIngredients: HTMLTextAreaElement;
    private recipeInstructions: HTMLTextAreaElement;
    private recipeImage: HTMLInputElement;
    private createButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        this.container = container;
        this.title = document.createElement('h1');
        this.title.textContent = 'Robinson Recipes';
        this.container.appendChild(this.title);

        this.header = document.createElement('div');
        this.header.classList.add('laydo-flex-row');
        this.container.appendChild(this.header);

        this.searchContainer = document.createElement('div');
        this.searchContainer.classList.add('laydo-row-even', 'cook-search-container');
        this.header.appendChild(this.searchContainer);

        this.searchInput = document.createElement('div');
        this.searchInput.id = 'cookSearchInput';
        this.searchInput.classList.add('cook-input');
        this.searchInput.setAttribute('contenteditable', 'true');
        this.searchInput.setAttribute('data-placeholder', 'Search recipes...');
        this.searchContainer.appendChild(this.searchInput);

        this.searchButton = document.createElement('button');
        this.searchButton.classList.add('cook-search', 'fa-solid', 'fa-magnifying-glass');
        this.searchButton.id = 'cookSearchButton';
        this.searchContainer.appendChild(this.searchButton);

        this.addButton = document.createElement('button');
        this.addButton.textContent = '+';
        this.addButton.classList.add('cook-add');
        this.addButton.addEventListener('click', () => { this.showModal(); });
        this.header.appendChild(this.addButton);

        this.recipesContainer = document.createElement('div');
        this.recipesContainer.classList.add('laydo-flex-col');
        this.container.appendChild(this.recipesContainer);

        this.recipeModal = document.createElement('div');
        this.recipeModal.id = 'recipeModal';
        this.recipeModal.classList.add('cook-modal');
        this.container.appendChild(this.recipeModal);

        let modalContent = document.createElement('div');
        modalContent.classList.add('cook-modal-content');
        this.recipeModal.appendChild(modalContent);

        this.modalCloseButton = document.createElement('span');
        this.modalCloseButton.classList.add('cook-modal-close');
        this.modalCloseButton.textContent = `×`;
        this.modalCloseButton.addEventListener('click', () => { this.closeModal(); });
        modalContent.appendChild(this.modalCloseButton);

        this.modalTitle = document.createElement('h2');
        this.modalTitle.textContent = 'Add Recipe';
        modalContent.appendChild(this.modalTitle);

        this.modalForm = document.createElement('div');
        this.modalForm.classList.add('laydo-flex-col');
        this.modalForm.id = 'recipeForm';
        modalContent.appendChild(this.modalForm);

        let titleLabel = document.createElement('label');
        titleLabel.textContent = 'Recipe Name:';
        titleLabel.setAttribute('for', 'title');
        this.modalForm.appendChild(titleLabel);

        this.recipeTitle = document.createElement('input');
        this.recipeTitle.id = 'title';
        this.recipeTitle.setAttribute('type', 'text');
        this.recipeTitle.setAttribute('name', 'title');
        this.recipeTitle.setAttribute('required', 'true');
        this.modalForm.appendChild(this.recipeTitle);

        let categoryLabel = document.createElement('label');
        categoryLabel.textContent = 'Category:';
        categoryLabel.setAttribute('for', 'category');
        this.modalForm.appendChild(categoryLabel);

        this.recipeCategory = document.createElement('select');
        this.recipeCategory.id = 'category';
        this.recipeCategory.setAttribute('name', 'category');
        this.recipeCategory.setAttribute('required', 'true');
        let categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Drink', 'Other'];
        categories.forEach(category => {
            let option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            this.recipeCategory.appendChild(option);
        });
        this.modalForm.appendChild(this.recipeCategory);

        let timeLabel = document.createElement('label');
        timeLabel.textContent = 'Time Required:';
        timeLabel.setAttribute('for', 'time_required');
        this.modalForm.appendChild(timeLabel);

        this.recipeTimeRequired = document.createElement('input');
        this.recipeTimeRequired.id = 'time_required';
        this.recipeTimeRequired.setAttribute('type', 'number');
        this.recipeTimeRequired.setAttribute('name', 'time_required');
        this.recipeTimeRequired.setAttribute('required', 'true');
        this.modalForm.appendChild(this.recipeTimeRequired);

        let ingredientsLabel = document.createElement('label');
        ingredientsLabel.textContent = 'Ingredients:';
        ingredientsLabel.setAttribute('for', 'ingredients');
        this.modalForm.appendChild(ingredientsLabel);

        this.recipeIngredients = document.createElement('textarea');
        this.recipeIngredients.id = 'ingredients';
        this.recipeIngredients.setAttribute('name', 'ingredients');
        this.recipeIngredients.setAttribute('required', 'true');
        this.modalForm.appendChild(this.recipeIngredients);

        let instructionsLabel = document.createElement('label');
        instructionsLabel.textContent = 'Instructions:';
        instructionsLabel.setAttribute('for', 'instructions');
        this.modalForm.appendChild(instructionsLabel);

        this.recipeInstructions = document.createElement('textarea');
        this.recipeInstructions.id = 'instructions';
        this.recipeInstructions.setAttribute('name', 'instructions');
        this.recipeInstructions.setAttribute('required', 'true');
        this.modalForm.appendChild(this.recipeInstructions);

        let imageLabel = document.createElement('label');
        imageLabel.textContent = 'Image URL:';
        imageLabel.setAttribute('for', 'image');
        this.modalForm.appendChild(imageLabel);

        this.recipeImage = document.createElement('input');
        this.recipeImage.id = 'image';
        this.recipeImage.setAttribute('type', 'text');
        this.recipeImage.setAttribute('name', 'image');
        this.modalForm.appendChild(this.recipeImage);

        this.createButton = document.createElement('button');
        this.createButton.textContent = 'Add Recipe';
        this.createButton.classList.add('laydo-button');
        this.createButton.id = 'recipeAdd';
        this.createButton.addEventListener('click', () => {
            let ingreds = this.recipeIngredients.value.split('\n');
            let instructs = this.recipeInstructions.value.split('\n');
            console.log(ingreds);
            const newRecipe = {
                title: this.recipeTitle.value,
                category: this.recipeCategory.value,
                time_required: this.recipeTimeRequired.value,
                ingredients: ingreds,
                instructions: instructs,
                image: this.recipeImage.value,
            };

            this.addRecipe(newRecipe);
            this.closeModal();
            this.clearRecipeForm();
        });
        modalContent.appendChild(this.createButton);

        window.addEventListener('click', (event) => {
            if (event.target === this.recipeModal) {
                this.closeModal();
            }
        });

        this.loadRecipes();
    }

    public loadRecipes(recipes: Array<any> = []) {
        this.recipes = [];
        this.recipesContainer.innerHTML = '';
        this.displayLoading();
        if (recipes.length > 0) {
            recipes.forEach(recipe => {
                let recipeItem = new RecipeItem(this.recipesContainer, recipe.id, recipe.title, recipe.category, recipe.time_required, recipe.ingredients, recipe.instructions);
                this.recipes.push(recipeItem);
                this.recipesContainer.appendChild(recipeItem.container);
                this.removeLoading();
            });
        } else {
            let url = window.location.origin + window.location.pathname + 'recipes/';
            fetch(url).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                this.removeLoading();
                data.recipes.forEach((recipe: Recipe) => {
                    let recipeItem = new RecipeItem(
                        this.recipesContainer,
                        recipe.id,
                        recipe.title,
                        recipe.category,
                        recipe.time_required,
                        recipe.ingredients,
                        recipe.instructions
                    );
                    this.recipes.push(recipeItem);
                });
            }).catch(error => {
                this.removeLoading();
                console.error('There has been a problem with your fetch operation: ', error);
            });
        }
    }

    public addRecipe(recipe: any) {
        let url = window.location.origin + window.location.pathname + 'add/';
        let csrftoken = this.getCookie('csrftoken');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(recipe),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log(`${data.message} Recipe created: ${data.recipe_created.title}`);
            this.loadRecipes(data.recipes);
        }).catch(error => {
            console.error('There has been a problem with your fetch operation: ', error);
        });
    }

    public clearRecipeForm() {
        this.recipeTitle.value = '';
        this.recipeCategory.value = '';
        this.recipeTimeRequired.value = '';
        this.recipeIngredients.value = '';
        this.recipeInstructions.value = '';
        this.recipeImage.value = '';
    }

    public showModal() {
        this.recipeModal.style.display = 'block';
    }

    public closeModal() {
        this.recipeModal.style.display = 'none';
    }

    public getCookie(name: string) {
        let cookieValue = '';
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    private displayLoading() {
        let container = document.createElement('div');
        container.classList.add('laydo-text-container');
        container.id = 'laydoLoading';

        let loading = document.createElement('section');
        loading.classList.add('container');
        let d1 = document.createElement('div');
        let d2 = document.createElement('div');
        let span1 = document.createElement('span');
        span1.classList.add('one', 'h6');
        let span2 = document.createElement('span');
        span2.classList.add('two', 'h3');
        d2.append(span1);
        d2.append(span2);
        d1.append(d2);
        let d3 = document.createElement('div');
        let d4 = document.createElement('div');
        let span3 = document.createElement('span');
        span3.classList.add('one', 'h1');
        let span4 = document.createElement('span');
        span4.classList.add('two', 'h4');
        d4.append(span3);
        d4.append(span4);
        d3.append(d4);
        let d5 = document.createElement('div');
        let d6 = document.createElement('div');
        let span5 = document.createElement('span');
        span5.classList.add('one', 'h5');
        let span6 = document.createElement('span');
        span6.classList.add('two', 'h2');
        d6.append(span5);
        d6.append(span6);
        d5.append(d6);
        loading.append(d1);
        loading.append(d3);
        loading.append(d5);

        let loadingContainer = document.createElement('div');
        loadingContainer.classList.add('laydo-loading-container');

        loadingContainer.append(loading);

        container.appendChild(loadingContainer);

        this.recipesContainer.appendChild(container);
    }

    private removeLoading() {
        let loading = document.getElementById('laydoLoading');
        if (loading) {
            loading.remove();
        }
    }
}