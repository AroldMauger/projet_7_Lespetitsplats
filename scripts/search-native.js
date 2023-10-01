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
    displayAllIngredients();
    displayAllAppliances();
    displayAllUstensiles();
  }
});
// ------- -FONCTION POUR FILTRER LES RECETTES EN FONCTION DU TEXTE DANS LA BARRE DE RECHERCHE ---------
function searchRecipes() {
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
    const listFilteredIngredients = new Set();
    searchResults.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientList) => {
        listFilteredIngredients.add(ingredientList.ingredient.toLowerCase());
      });
    });
    const uniqueIngredientsArray = Array.from(listFilteredIngredients);
    const allTagsIngredients = document.querySelector(".tags-ingredients");

    uniqueIngredientsArray.forEach((item) => {
      const importContainer = document.querySelector(".import-ingredients");

      displayItemsInFilter(item, importContainer, allTagsIngredients);
    });
    filterIngredientsFromInput();
    // ---------------------------------------------------------- //

    // ---- AFFICHAGE DES ITEMS APPAREILS DANS LE FILTRE -------- //

    const listUniqueAppliances = new Set();
    searchResults.forEach((recipe) => {
      listUniqueAppliances.add(recipe.appliance.toLowerCase());
    });
    const uniqueAppliancesArray = Array.from(listUniqueAppliances); // Le tableau avec la liste de tous les appareils
    const allTagsAppliances = document.querySelector(".tags-appliances");

    uniqueAppliancesArray.forEach((item) => {
      const importContainer = document.querySelector(".import-appliances");
      displayItemsInFilter(item, importContainer, allTagsAppliances);
    });

    filterAppliancesFromInput();
    // ---------------------------------------------------------- //

    // ---- AFFICHAGE DES ITEMS USTENSILES DANS LE FILTRE -------- //

    const listUniqueUstensiles = new Set();
    searchResults.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        listUniqueUstensiles.add(ustensil.toLowerCase());
      });
    });
    const importContainer = document.querySelector(".import-ustensiles");
    const uniqueUstensilesArray = Array.from(listUniqueUstensiles);
    const allTagsUstensiles = document.querySelector(".tags-ustensiles");

    uniqueUstensilesArray.forEach((item) => {
      displayItemsInFilter(item, importContainer, allTagsUstensiles);
    });

    filterUstensilesFromInput();
    // ---------------------------------------------------------- //
  }
  return searchResults;
}
// -------------------------------------------------------------------------------------------------//
