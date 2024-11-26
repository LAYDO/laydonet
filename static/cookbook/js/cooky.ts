// const modal = document.getElementById('recipeModal') as HTMLElement;
// const addButton = document.querySelector('.cook-add') as HTMLElement;
// const closeButton = document.querySelector('.cook-modal-close') as HTMLElement;
// const addRecipeButton = document.getElementById('recipeAdd') as HTMLButtonElement;
// const recipeTitle = document.getElementById('title') as HTMLInputElement;
// const recipeTimeRequired = document.getElementById('time_required') as HTMLInputElement;
// const recipeIngredients = document.getElementById('ingredients') as HTMLInputElement;
// const recipeInstructions = document.getElementById('instructions') as HTMLInputElement;

// // Show modal when "cook-add" button is clicked
// addButton.addEventListener('click', () => {
//     modal.style.display = 'block';
// });

// // Close modal when "close" button is clicked
// closeButton.addEventListener('click', () => {
//     modal.style.display = 'none';
// });

// // Close modal when clicking outside the modal content
// window.addEventListener('click', (event) => {
//     if (event.target === modal) {
//         modal.style.display = 'none';
//     }
// });

// // Add new recipe when "addRecipe" button is clicked
// addRecipeButton.addEventListener('click', () => {
//     const newRecipe = {
//         title: recipeTitle.value,
//         time_required: recipeTimeRequired.value,
//         ingredients: recipeIngredients.value.split(','),
//         instructions: recipeInstructions.value,
//     };

//     // Add new recipe to the list
//     addRecipe(newRecipe);
//     // Close modal
//     modal.style.display = 'none';
//     // Clear form
//     clearRecipeForm();
// });

// // Call the API to add a new recipe
// function addRecipe(recipe: any) {
//     let url = window.location.origin + window.location.pathname + 'add/';
//     // Get CSRF token from cookies
//     function getCookie(name: string) {
//         let cookieValue = '';
//         if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//             break;
//             }
//         }
//         }
//         return cookieValue;
//     }
//     const csrftoken = getCookie('csrftoken');

//     fetch(url, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         'X-CSRFToken': csrftoken,
//         },
//         body: JSON.stringify(recipe),
//     }).then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         // return response.json();
//     })
//         // .then(data => {
//         // console.log(data);
//         // })
//         .catch(error => {
//         console.error('There has been a problem with your fetch operation: ', error);
//     });
// }

// function clearRecipeForm() {
//     recipeTitle.value = '';
//     recipeTimeRequired.value = '';
//     recipeIngredients.value = '';
//     recipeInstructions.value = '';
// }
import { Cookbook } from './cookbook';
let cookbookContainer = document.getElementById('cookbookContainer') as HTMLElement;
let cookbook = new Cookbook(cookbookContainer);