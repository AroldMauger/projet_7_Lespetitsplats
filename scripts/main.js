import { recipes } from "./recipes.js";

// FONCTION QUI AFFICHE TOUTES LES RECETTES //
export function displayAllRecipes() {
  const cardContainer = document.querySelector(".cards-container");

  recipes.forEach((recipe) => {
    const clickableCard = createRecipeCard(recipe);
    cardContainer.appendChild(clickableCard);
  });
}
// --------------------------------------------//

// FONCTION QUI GENERE UNE CARTE RECETTE CLIQUABLE  //
export function createRecipeCard(recipe) {
  const clickableCard = document.createElement("a");
  clickableCard.classList.add("clickable-card");

  const recipeImage = document.createElement("img");
  recipeImage.setAttribute("src", `assets/images/${recipe.image}`);
  recipeImage.classList.add("recipe-image");

  const textInRecipeContainer = document.createElement("div");
  textInRecipeContainer.classList.add("text-in-recipe-container");

  const recipeName = document.createElement("h2");
  recipeName.textContent = recipe.name;
  recipeName.classList.add("recipe-name");

  const sectionRecipe = document.createElement("span");
  sectionRecipe.textContent = "RECETTE";
  sectionRecipe.classList.add("section-in-recipe");

  const recipeDescription = document.createElement("p");
  recipeDescription.textContent = recipe.description;
  recipeDescription.classList.add("recipe-description");

  const sectionIngredients = document.createElement("span");
  sectionIngredients.textContent = "INGRÉDIENTS";
  sectionIngredients.classList.add("section-in-recipe");

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.classList.add("ingredients-container");

  const ingredientLists = recipe.ingredients;

  ingredientLists.forEach((ingredientList) => {
    const ingredientAndQuantity = document.createElement("div");
    ingredientAndQuantity.classList.add("ingredient-and-quantity");

    const ingredientName = document.createElement("span");
    ingredientName.textContent = ingredientList.ingredient;
    ingredientName.classList.add("ingredient-name");

    const quantity = document.createElement("span");
    quantity.classList.add("quantity");

    if (ingredientList.quantity != null && ingredientList.unit != null) {
      quantity.textContent = `${ingredientList.quantity} ${ingredientList.unit}`;
    } else {
      quantity.textContent = ingredientList.quantity;
    }

    ingredientsContainer.appendChild(ingredientAndQuantity);
    ingredientAndQuantity.appendChild(ingredientName);
    ingredientAndQuantity.appendChild(quantity);
  });

  clickableCard.appendChild(recipeImage);
  clickableCard.appendChild(textInRecipeContainer);
  textInRecipeContainer.appendChild(recipeName);
  textInRecipeContainer.appendChild(sectionRecipe);
  textInRecipeContainer.appendChild(recipeDescription);
  textInRecipeContainer.appendChild(sectionIngredients);
  textInRecipeContainer.appendChild(ingredientsContainer);

  return clickableCard;
}
// --------------------------------------------//

// FONCTION QUI AFFICHE LES 10 PREMIERES RECETTES //
export function displayFirstTenRecipes() {
  const cardContainer = document.querySelector(".cards-container");

  for (let i = 0; i < 10; i++) {
    const recipe = recipes[i];
    const clickableCard = createRecipeCard(recipe);
    cardContainer.appendChild(clickableCard);
  }
}

displayFirstTenRecipes();
