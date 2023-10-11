import { recipes } from "./recipes.js";
import { generateTag } from "./tags.js";

import { createRecipeCard } from "./main.js";
import { updateFilters } from "./updateFilters.js";
import { filterItemsFromSearchInFilters, filterIngredientsFromInput, filterAppliancesFromInput, filterUstensilesFromInput, removeAccents } from "./filters.js";

const cardContainer = document.querySelector(".cards-container");
const searchInput = document.getElementById("search-recipe");
const totalRecipes = document.querySelector(".total-recipes");

const closeIngredients = document.querySelector(".close-ingredients");
const closeAppliances = document.querySelector(".close-appliances");
const closeUstensiles = document.querySelector(".close-ustensiles");

const ingredientFilterInput = document.getElementById("search-ingredient");
const applianceFilterInput = document.getElementById("search-appliance");
const ustensileFilterInput = document.getElementById("search-ustensile");

const allTagsIngredients = document.querySelector(".tags-ingredients");
const allTagsAppliances= document.querySelector(".tags-appliances");
const allTagsUstensiles= document.querySelector(".tags-ustensiles");


let searchText = "";
export let uniqueIngredients = new Set();
export let uniqueTagsIngredients = new Set();
export let hiddenIngredients = new Set();

export let uniqueAppliances = new Set();
export let uniqueTagsAppliances = new Set();
export let hiddenAppliances = new Set();

export let uniqueUstensiles = new Set();
export let uniqueTagsUstensiles = new Set();
export let hiddenUstensiles = new Set();

searchInput.addEventListener("input", function () {
  searchText = removeAccents(searchInput.value.toLowerCase());
  setTimeout(function () {
    if (searchText.length >= 3) {
      cardContainer.innerHTML = "";
      searchRecipes();
      filterItemsFromSearchInFilters();
      searchByTags();
    }
    if (searchText === "") {
      cardContainer.innerHTML = "";
      searchByTags();
      filterItemsFromSearchInFilters();
    }
  }, 300);
});
// ------- -FONCTION POUR FILTRER LES RECETTES EN FONCTION DU TEXTE DANS LA BARRE DE RECHERCHE ---------
export function searchRecipes() {
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

    if (removeAccents(recipeName.toLowerCase()).includes(searchText) ||removeAccents(recipeDescription.toLowerCase()).includes(searchText)) {
      searchMatch = true;
    }

    for (let k = 0; k < ingredientsNameArray.length; k++) {
      const ingredientName = removeAccents(ingredientsNameArray[k].toLowerCase());
      if (ingredientName.includes(searchText)) {
        searchMatch = true;
      }
    }

    if (searchMatch === true) {
      // si une des trois conditions est réunie,
      searchResults.push(recipe); // on push la recette dans notre array searchResults[]
    }
   
  }

  cardContainer.innerHTML = ""; // On efface les recettes affichées par défaut
  if (searchResults.length === 0) {
    cardContainer.innerHTML = `<span class="error-message">Aucune recette ne contient '${searchText}', vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>`;
  }
  if (searchResults.length > 0) {

    // Si des recettes ont été trouvées
    for (let i = 0; i < searchResults.length; i++) {
      const recipe = searchResults[i];
      const clickableCard = createRecipeCard(recipe);
      cardContainer.appendChild(clickableCard);
    }

    totalRecipes.textContent = searchResults.length + " recettes"

    // ---- AFFICHAGE DES ITEMS INGREDIENTS DANS LE FILTRE -------- //
    updateFilters(searchResults)
    filterItemsFromSearchInFilters()
  }
  return searchResults;
}

// -----  FONCTION POUR FILTRER LES RECETTES PAR INGREDIENT AU CLIC SUR UN TAG -------------- //

export function searchRecipesFromIngredientTag(searchResults) {
  const ingredientsItemsContainer = document.querySelector(".import-ingredients");
  const itemsIngredients =
    ingredientsItemsContainer.querySelectorAll(".items-in-filter");

    for (let i = 0; i < itemsIngredients.length; i++) {
      const itemIngredient = itemsIngredients[i];

    itemIngredient.addEventListener("click", function () {
      
      const clickedIngredient = itemIngredient.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules
      generateTag(clickedIngredient, allTagsIngredients)

      uniqueTagsIngredients.add(clickedIngredient);
      hiddenIngredients.add(clickedIngredient);
      itemIngredient.style.display = "none";
      closeIngredients.style.display = "none"
      ingredientFilterInput.value = "";

      const filteredRecipes = [];

      for (let i = 0; i < searchResults.length; i++) {
        const recipe = searchResults[i];
        let includeClickedIngredient = false;

        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredientList = recipe.ingredients[j];
          if (ingredientList.ingredient.toLowerCase().includes(clickedIngredient)) {
            includeClickedIngredient = true;
            break; 
          }
        }

        if (includeClickedIngredient) {
          filteredRecipes.push(recipe);
        }
      }


      // On met à jour l'affichage des recettes avec les nouvelles recettes filtrées
      cardContainer.innerHTML = "";

      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const clickableCard = createRecipeCard(recipe);
        cardContainer.appendChild(clickableCard);
      }
      totalRecipes.textContent = filteredRecipes.length + " recettes"

      // On supprime l'élément cliqué de la liste des ingrédients
      updateFilters(filteredRecipes)

      filterItemsFromSearchInFilters()
    });
  }
}

// -----  FONCTION POUR FILTRER LES RECETTES EN FONCTION DE LA SUPPRESSION D'UN TAG INGREDIENT-------------- //

export function searchRecipesFromDeletedIngredientTag(item) {
  uniqueIngredients.delete(item.toLowerCase());
  uniqueTagsIngredients.delete(item.toLowerCase());
  hiddenIngredients.delete(item.toLowerCase());

  cardContainer.innerHTML = "";
  if (
    uniqueTagsUstensiles.size === 0 &&
    uniqueTagsIngredients.size === 0 &&
    uniqueTagsAppliances.size === 0
  ) {
    searchRecipes();
  } else {
    searchByTags(item);
  }
  filterIngredientsFromInput();
}


// -----  FONCTION POUR FILTRER LES RECETTES PAR APPAREILS AU CLIC SUR UN TAG -------------- //

export function searchRecipesFromApplianceTag(searchResults) {
  const applianceItemsContainer = document.querySelector(".import-appliances");
  const itemsAppliances =
    applianceItemsContainer.querySelectorAll(".items-in-filter");

    for (let i = 0; i < itemsAppliances.length; i++) {
      const itemAppliance = itemsAppliances[i];

    itemAppliance.addEventListener("click", function () {
      const clickedAppliance = itemAppliance.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules
      generateTag(clickedAppliance, allTagsAppliances)

      uniqueTagsAppliances.add(clickedAppliance);

      hiddenAppliances.add(clickedAppliance);
      itemAppliance.style.display = "none";
      closeAppliances.style.display = "none"
      applianceFilterInput.value = "";
   
      const filteredRecipes = [];

      for (let i = 0; i < searchResults.length; i++) {
        const recipe = searchResults[i];
        if (recipe.appliance.toLowerCase().includes(clickedAppliance)) {
          filteredRecipes.push(recipe);
        }
      }      

      // On met à jour l'affichage des recettes avec les nouvelles recettes filtrées
      cardContainer.innerHTML = "";
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const clickableCard = createRecipeCard(recipe);
        cardContainer.appendChild(clickableCard);
      }
      totalRecipes.textContent = filteredRecipes.length + " recettes"

      // On supprime l'élément cliqué de la liste des ingrédients
      updateFilters(filteredRecipes)

      filterItemsFromSearchInFilters();
    });
  };
}


// -----  FONCTION POUR FILTRER LES RECETTES EN FONCTION DE LA SUPPRESSION D'UN TAG APPAREIL-------------- //

export function searchRecipesFromDeletedApplianceTag(item) {
  uniqueAppliances.delete(item.toLowerCase());
  uniqueTagsAppliances.delete(item.toLowerCase());
  hiddenAppliances.delete(item.toLowerCase());

  cardContainer.innerHTML = "";
  if (
    uniqueTagsUstensiles.size === 0 &&
    uniqueTagsIngredients.size === 0 &&
    uniqueTagsAppliances.size === 0
  ) {
    searchRecipes();
  } else {
    searchByTags(item);
  }
  filterAppliancesFromInput();
}

// -----  FONCTION POUR FILTRER LES RECETTES PAR USTENSILE AU CLIC SUR UN TAG -------------- //

export function searchRecipesFromUstensileTag(searchResults) {
  const ustensilesItemsContainer = document.querySelector(".import-ustensiles");
  const itemsUstensiles =
    ustensilesItemsContainer.querySelectorAll(".items-in-filter");

    for (let i = 0; i < itemsUstensiles.length; i++) {
      const itemUstensile = itemsUstensiles[i];

    itemUstensile.addEventListener("click", function () {
      const clickedUstensile = itemUstensile.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules
      generateTag(clickedUstensile, allTagsUstensiles)

      uniqueTagsUstensiles.add(clickedUstensile);

      hiddenUstensiles.add(clickedUstensile);
      itemUstensile.style.display = "none";
      closeUstensiles.style.display = "none"
      ustensileFilterInput.value = "";


      // On filtre les recettes qui contiennent l'ingrédient cliqué
      const filteredRecipes = [];

      for (let i = 0; i < searchResults.length; i++) {
        const recipe = searchResults[i];
        let includeClickedUstensile = false;
      
        for (let j = 0; j < recipe.ustensils.length; j++) {
          const ustensil = recipe.ustensils[j];
          if (ustensil.toLowerCase().includes(clickedUstensile)) {
            includeClickedUstensile = true;
            break; 
          }
        }
        if (includeClickedUstensile) {
          filteredRecipes.push(recipe);
        }
      }

      // On met à jour l'affichage des recettes avec les nouvelles recettes filtrées
      cardContainer.innerHTML = "";
      for (let i = 0; i < filteredRecipes.length; i++) {
        const recipe = filteredRecipes[i];
        const clickableCard = createRecipeCard(recipe);
        cardContainer.appendChild(clickableCard);
      }
      totalRecipes.textContent = filteredRecipes.length + " recettes"

      // On supprime l'élément cliqué de la liste des ingrédients
      updateFilters(filteredRecipes)

      filterItemsFromSearchInFilters();
    });
  };
}

// -----  FONCTION POUR FILTRER LES RECETTES EN FONCTION DE LA SUPPRESSION D'UN TAG USTENSILE-------------- //

export function searchRecipesFromDeletedUstensileTag(item) {

  uniqueUstensiles.delete(item.toLowerCase());
  uniqueTagsUstensiles.delete(item.toLowerCase());
  hiddenUstensiles.delete(item.toLowerCase());

  cardContainer.innerHTML = "";
  if (
    uniqueTagsUstensiles.size === 0 &&
    uniqueTagsIngredients.size === 0 &&
    uniqueTagsAppliances.size === 0
  ) {
    searchRecipes();
  } else {
    searchByTags(item);
  }
  filterUstensilesFromInput();
}
// -----  FONCTION POUR FILTRER LES RECETTES EN FONCTION DES TAGS AFFICHÉS ET DU TEXTE DANS LA BARRE DE RECHERCHE-------------- //

function searchByTags() {
  cardContainer.innerHTML = "";
  // on crée un tableau avec les tags appareils restants
  const uniqueTagsAppliancesArray = Array.from(uniqueTagsAppliances);
  const tagsAppliancesArray = [];
  for (let i = 0; i < uniqueTagsAppliancesArray.length; i++) {
    const tag = uniqueTagsAppliancesArray[i];
    tagsAppliancesArray.push(tag.toLowerCase());
  }

  // on crée un tableau avec les tags ingrédients restants
  const uniqueTagsIngredientsArray = Array.from(uniqueTagsIngredients);
  const tagsIngredientsArray = [];
  for (let i = 0; i < uniqueTagsIngredientsArray.length; i++) {
    const tag = uniqueTagsIngredientsArray[i];
    tagsIngredientsArray.push(tag.toLowerCase());
  }

  // on crée un tableau avec les tags ustensiles restants
  const uniqueTagsUstensilesArray = Array.from(uniqueTagsUstensiles);
  const tagsUstensilesArray = [];
  for (let i = 0; i < uniqueTagsUstensilesArray.length; i++) {
    const tag = uniqueTagsUstensilesArray[i];
    tagsUstensilesArray.push(tag.toLowerCase());
  }


  // On filtre les recettes en utilisant à la fois les tags restants et le texte de recherche actuel
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const appliances = recipe.appliance.toLowerCase();
    const ingredients = [];
    const ustensiles = [];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredients.push(recipe.ingredients[j].ingredient.toLowerCase());
    }

    for (let j = 0; j < recipe.ustensils.length; j++) {
      ustensiles.push(recipe.ustensils[j].toLowerCase());
    }
    // La variable matchesText vérifie si le texte dans la barre de recherche principale correspond à des recettes
    const matchesText =
      recipeName.includes(searchText) ||
      recipeDescription.includes(searchText) ||
      ingredients.some((ingredient) => ingredient.includes(searchText));

    // cette variable contient chaque item appareil cliqué qui se trouve dans la liste d'affichage des items
    const containsTabAppliance = tagsAppliancesArray.every((tag) =>
      appliances.includes(tag)
    );
    const containsTagIngredient = tagsIngredientsArray.every((tag) =>
      ingredients.includes(tag)
    );
    const containsTagUstensile = tagsUstensilesArray.every((tag) =>
      ustensiles.includes(tag)
    );
    // ici on affiche les recettes seulement si le texte de la barre de recherche correspond et si tous les ingrédients/appareils/ustensiles encore affichés dans les filtres correspondent aux recettes
    // si par exemple dans le filtre ingrédient, 1 seul item ingrédient manque à la recette, alors elle ne sera pas affichée
    if (matchesText && containsTabAppliance && containsTagIngredient && containsTagUstensile) {
      filteredRecipes.push(recipe);
    }
  }

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipe = filteredRecipes[i];
    const clickableCard = createRecipeCard(recipe);
    cardContainer.appendChild(clickableCard);
  }

  totalRecipes.textContent = filteredRecipes.length + " recettes"
  updateFilters(filteredRecipes)
}


// Par défaut on appelle les fonctions qui permettent de faire la recherche par tag
searchRecipesFromIngredientTag(recipes);
searchRecipesFromApplianceTag(recipes);
searchRecipesFromUstensileTag(recipes);

updateFilters(recipes)



