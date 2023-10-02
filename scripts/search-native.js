import { recipes } from "./recipes.js";
import { displayFirstTenRecipes, createRecipeCard } from "./main.js";


import {
  displayAllIngredients,
  displayAllAppliances,
  displayAllUstensiles,
  displayItemsInFilter,
  filterIngredientsFromInput,
  filterAppliancesFromInput,
  filterUstensilesFromInput,
} from "./filters.js";

const cardContainer = document.querySelector(".cards-container");
const searchInput = document.getElementById("search-recipe");
const importIngredientsContainer = document.querySelector(".import-ingredients");
const importAppliancesContainer = document.querySelector(".import-appliances");
const importUstensilesContainer = document.querySelector(".import-ustensiles");

let searchText = "";

searchInput.addEventListener("input", function () {
  searchText = searchInput.value.toLowerCase();
  if (searchText.length >= 3) {
    cardContainer.innerHTML = "";
    importIngredientsContainer.innerHTML = "";
    importAppliancesContainer.innerHTML = "";
    importUstensilesContainer.innerHTML = "";
    searchRecipes();
  }
  if (searchText === "") {
    cardContainer.innerHTML = "";
    displayFirstTenRecipes();
    importIngredientsContainer.innerHTML = "";
    importAppliancesContainer.innerHTML = "";
    importUstensilesContainer.innerHTML = "";
    /*
    displayAllIngredients();
    displayAllAppliances();
    displayAllUstensiles();
    */
  }
});
// ------- -FONCTION POUR FILTRER LES RECETTES EN FONCTION DU TEXTE DANS LA BARRE DE RECHERCHE ---------
export function searchRecipes() {
  let recipesCards = 0;
  let searchResults = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeName = recipe.name; //on récupère le nom de la recette dans une variable
    const recipeDescription = recipe.description; //on récupère la description de la recette dans une variable

    const ingredientsNameArray = []; //on récupère les ingrédients de la recette dans une variable
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientsNameArray.push(recipe.ingredients[j].ingredient);
    }

    let searchMatch = false;

    if (recipeName.toLowerCase().includes(searchText) || recipeDescription.toLowerCase().includes(searchText)) {
      searchMatch = true;
    }

    for (let k = 0; k < ingredientsNameArray.length; k++) {
      const ingredientName = ingredientsNameArray[k].toLowerCase();
      if (ingredientName.includes(searchText)) {
        searchMatch = true;
      }
    }

    if (searchMatch === true) {
      // si une des trois conditions est réunie,
      recipesCards++; // on incrémente notre compteur recipesCards
      searchResults.push(recipe); // on push la recette dans notre array searchResults[]
    }
  }

  cardContainer.innerHTML = ""; // On efface les recettes affichées par défaut

  if (recipesCards > 0) {
    // Si des recettes ont été trouvées
    searchResults.forEach((recipe) => {
      const clickableCard = createRecipeCard(recipe); // On crée une carte recette pour chaque recette
      cardContainer.appendChild(clickableCard);
    });

    // ---- AFFICHAGE DES ITEMS INGREDIENTS DANS LE FILTRE -------- //
    updateIngredientFilter(searchResults)
    filterIngredientsFromInput();
    // ---------------------------------------------------------- //

    // ---- AFFICHAGE DES ITEMS APPAREILS DANS LE FILTRE -------- //

    updateApplianceFilter(searchResults);
    filterAppliancesFromInput();
    // ---------------------------------------------------------- //

    // ---- AFFICHAGE DES ITEMS USTENSILES DANS LE FILTRE -------- //
    updateUstensileFilter(searchResults);

    filterUstensilesFromInput();
    // ---------------------------------------------------------- //
  }
  return searchResults;
}
// -------------------------------------------------------------------------------------------------//

// -----  FONCTION POUR FILTRER LES RECETTES PAR INGREDIENT AU CLIC SUR UN TAG -------------- //

 function searchRecipesFromIngredientTag(searchResults) {
  const ingredientsItemsContainer = document.querySelector(".import-ingredients");
  const itemsIngredients = ingredientsItemsContainer.querySelectorAll(".items-in-filter");

  itemsIngredients.forEach((itemIngredient) => {
    itemIngredient.addEventListener("click", function() {
      const clickedIngredient = itemIngredient.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules

      // On filtre les recettes qui contiennent l'ingrédient cliqué
      const filteredRecipes = searchResults.filter((recipe) => {
        return recipe.ingredients.some((ingredientList) => {          // On vérifie si au moins un élément de l'array ingredients inclue l'ingredient cliqué
          return ingredientList.ingredient.toLowerCase().includes(clickedIngredient);
        });
      });

      // On met à jour l'affichage des recettes avec les nouvelles recettes filtrées
      cardContainer.innerHTML = "";
      filteredRecipes.forEach((recipe) => {
        const clickableCard = createRecipeCard(recipe);
        cardContainer.appendChild(clickableCard);
        
      });

      // On supprime l'élément cliqué de la liste des ingrédients
      itemIngredient.remove();
      updateIngredientFilter(filteredRecipes)
      updateApplianceFilter(filteredRecipes)
      updateUstensileFilter(filteredRecipes)
      filterIngredientsFromInput();
      filterAppliancesFromInput();
      filterUstensilesFromInput();

    });
  });
}
// -------------------------------------------------------------------------------------------------//

// -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE INGREDIENT -------------- //
function updateIngredientFilter(searchResults) {
  const importContainer = document.querySelector(".import-ingredients");
  const allTagsIngredients = document.querySelector(".tags-ingredients");

  importContainer.innerHTML = "";

  const uniqueIngredients = new Set();

  searchResults.forEach((recipe) => {
    recipe.ingredients.forEach((ingredientList) => {
      uniqueIngredients.add(ingredientList.ingredient.toLowerCase());
    });
  });

  const uniqueIngredientsArray = Array.from(uniqueIngredients);

  uniqueIngredientsArray.forEach((item) => {
    displayItemsInFilter(item, importContainer, allTagsIngredients);
    searchRecipesFromIngredientTag(searchResults)
  });
}

// ---------------------------------------------------------------------------- //

// -----  FONCTION POUR FILTRER LES RECETTES PAR APPAREILS AU CLIC SUR UN TAG -------------- //

function searchRecipesFromApplianceTag(searchResults) {
  const applianceItemsContainer = document.querySelector(".import-appliances");
  const itemsAppliances = applianceItemsContainer.querySelectorAll(".items-in-filter");

  itemsAppliances.forEach((itemAppliance) => {
    itemAppliance.addEventListener("click", function() {
      const clickedAppliance = itemAppliance.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules

      // On filtre les recettes qui contiennent l'ingrédient cliqué
      const filteredRecipes = searchResults.filter((recipe) => {
        return recipe.appliance.toLowerCase().includes(clickedAppliance);
        });

      // On met à jour l'affichage des recettes avec les nouvelles recettes filtrées
      cardContainer.innerHTML = "";
      filteredRecipes.forEach((recipe) => {
        const clickableCard = createRecipeCard(recipe);
        cardContainer.appendChild(clickableCard);
        
      });

      // On supprime l'élément cliqué de la liste des ingrédients
      itemAppliance.remove();
      updateIngredientFilter(filteredRecipes)
      updateApplianceFilter(filteredRecipes)
      updateUstensileFilter(filteredRecipes)
      filterIngredientsFromInput();
      filterAppliancesFromInput();
      filterUstensilesFromInput();
    });
  });
}
// -------------------------------------------------------------------------------------------------//

// -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE APPAREILS -------------- //
function updateApplianceFilter(searchResults) {
  const importContainer = document.querySelector(".import-appliances");
  const allTagsAppliances = document.querySelector(".tags-appliances");

  importContainer.innerHTML = "";

  const uniqueAppliances = new Set();

  searchResults.forEach((recipe) => {
      uniqueAppliances.add(recipe.appliance.toLowerCase());
    });


  const uniqueAppliancesArray = Array.from(uniqueAppliances);

  uniqueAppliancesArray.forEach((item) => {
    displayItemsInFilter(item, importContainer, allTagsAppliances);
    searchRecipesFromApplianceTag(searchResults)
  });
}

// ---------------------------------------------------------------------------- //
// -----  FONCTION POUR FILTRER LES RECETTES PAR USTENSILE AU CLIC SUR UN TAG -------------- //

function searchRecipesFromUstensileTag(searchResults) {
  const ustensilesItemsContainer = document.querySelector(".import-ustensiles");
  const itemsUstensiles = ustensilesItemsContainer.querySelectorAll(".items-in-filter");

  itemsUstensiles.forEach((itemUstensile) => {
    itemUstensile.addEventListener("click", function() {
      const clickedUstensile = itemUstensile.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules

      // On filtre les recettes qui contiennent l'ingrédient cliqué
      const filteredRecipes = searchResults.filter((recipe) => {
        return recipe.ustensils.some((ustensil) => {          // On vérifie si au moins un élément de l'array ingredients inclue l'ingredient cliqué
          return ustensil.toLowerCase().includes(clickedUstensile);
        });
      });

      // On met à jour l'affichage des recettes avec les nouvelles recettes filtrées
      cardContainer.innerHTML = "";
      filteredRecipes.forEach((recipe) => {
        const clickableCard = createRecipeCard(recipe);
        cardContainer.appendChild(clickableCard);
        
      });

      // On supprime l'élément cliqué de la liste des ingrédients
      itemUstensile.remove();
      updateIngredientFilter(filteredRecipes)
      updateApplianceFilter(filteredRecipes)
      updateUstensileFilter(filteredRecipes)
      filterIngredientsFromInput();
      filterAppliancesFromInput();
      filterUstensilesFromInput();
    });
  });
}
// -------------------------------------------------------------------------------------------------//

// -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE USTENSILE -------------- //
function updateUstensileFilter(searchResults) {
  const importContainer = document.querySelector(".import-ustensiles");
  const allTagsUstensiles = document.querySelector(".tags-ustensiles");

  importContainer.innerHTML = "";

  const uniqueUstensiles = new Set();

  searchResults.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      uniqueUstensiles.add(ustensil.toLowerCase());
    });
  });

  const uniqueUstensilesArray = Array.from(uniqueUstensiles);

  uniqueUstensilesArray.forEach((item) => {
    displayItemsInFilter(item, importContainer, allTagsUstensiles);
    searchRecipesFromUstensileTag(searchResults)
  });
}

// ---------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------- //
searchRecipesFromIngredientTag(recipes)
searchRecipesFromApplianceTag(recipes)
searchRecipesFromUstensileTag(recipes)


