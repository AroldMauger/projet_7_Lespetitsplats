import { recipes } from "./recipes.js"


 function displayData() {
	const cardContainer = document.querySelector(".cards-container");

	recipes.forEach((recipe) => {
        if(recipe.id <=10) {
            const clickableCard = document.createElement("a");
            clickableCard.classList.add("clickable-card");

            const recipeImage = document.createElement("img");
            recipeImage.setAttribute("src", `assets/images/${recipe.image}`);
            recipeImage.classList.add("recipe-image");

            const recipeName = document.createElement("h2");
            recipeName.textContent = recipe.name;

            const sectionRecipe = document.createElement("span");
            sectionRecipe.textContent = "RECETTE";

            const recipeDescription = document.createElement("p");
            recipeDescription.textContent = recipe.description;
            recipeDescription.classList.add("recipe-description");

    
            const sectionIngredients = document.createElement("span");
            sectionIngredients.textContent = "INGRÉDIENTS";

            const ingredientsContainer = document.createElement("div");
            ingredientsContainer.classList.add("ingredients-container");


            const ingredientLists = recipe.ingredients;

            ingredientLists.forEach((ingredientList) => {
            
            const ingredientAndQuantity = document.createElement("div");
            ingredientAndQuantity.classList.add("ingredient-and-quantity");

            const ingredientName = document.createElement("span");
            ingredientName.textContent = ingredientList.ingredient;

            const quantity = document.createElement("span");
            quantity.textContent = ingredientList.quantity + ingredientList.unit;


            ingredientsContainer.appendChild(ingredientAndQuantity);
            ingredientAndQuantity.appendChild(ingredientName);
            ingredientAndQuantity.appendChild(quantity);

            });

            cardContainer.appendChild(clickableCard);
            clickableCard.appendChild(recipeImage);
            clickableCard.appendChild(recipeName);
            clickableCard.appendChild(sectionRecipe);
            clickableCard.appendChild(recipeDescription);
            clickableCard.appendChild(sectionIngredients);
            clickableCard.appendChild(ingredientsContainer);

           

        }
	});
}
displayData()
