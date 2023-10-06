import { recipes } from "./recipes.js";
import { displayAllRecipes, createRecipeCard } from "./main.js";

import { displayItemsInFilter, filterIngredientsFromInput, filterAppliancesFromInput, filterUstensilesFromInput } from "./filters.js";

const cardContainer = document.querySelector(".cards-container");
const searchInput = document.getElementById("search-recipe");
const importIngredientsContainer = document.querySelector(".import-ingredients");
const importAppliancesContainer = document.querySelector(".import-appliances");
const importUstensilesContainer = document.querySelector(".import-ustensiles");

let searchText = "";
export let uniqueIngredients = new Set();
export let uniqueTagsIngredients = new Set();
let hiddenIngredients = new Set();

export let uniqueAppliances = new Set();
export let uniqueTagsAppliances = new Set();
let hiddenAppliances = new Set();

export let uniqueUstensiles = new Set();
export let uniqueTagsUstensiles = new Set();
let hiddenUstensiles = new Set();

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
    displayAllRecipes();
    importIngredientsContainer.innerHTML = "";
    importAppliancesContainer.innerHTML = "";
    importUstensilesContainer.innerHTML = "";
    updateIngredientFilter(recipes);
    updateApplianceFilter(recipes);
    updateUstensileFilter(recipes);
  }
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

    if (recipeName.toLowerCase().includes(searchText) ||recipeDescription.toLowerCase().includes(searchText)) {
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
      searchResults.push(recipe); // on push la recette dans notre array searchResults[]
    }
   
  }

  cardContainer.innerHTML = ""; // On efface les recettes affichées par défaut
  if (searchResults.length === 0) {
    cardContainer.innerHTML = `<span style="font-size: 25px; margin-left:100px; padding-bottom:150px;color: darkred;">Aucune recette ne contient '${searchText}', vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>`;
}

  if (searchResults.length > 0) {

    // Si des recettes ont été trouvées
    searchResults.forEach((recipe) => {
      const clickableCard = createRecipeCard(recipe); // On crée une carte recette pour chaque recette
      cardContainer.appendChild(clickableCard);
    });

    // ---- AFFICHAGE DES ITEMS INGREDIENTS DANS LE FILTRE -------- //
    updateIngredientFilter(searchResults);
    filterIngredientsFromInput();
    updateApplianceFilter(searchResults);
    filterAppliancesFromInput();
    updateUstensileFilter(searchResults);
    filterUstensilesFromInput();
  }
  return searchResults;
}
// -------------------------------------------------------------------------------------------------//

// -----  FONCTION POUR FILTRER LES RECETTES PAR INGREDIENT AU CLIC SUR UN TAG -------------- //

function searchRecipesFromIngredientTag(searchResults) {
  const ingredientsItemsContainer = document.querySelector(
    ".import-ingredients"
  );
  const itemsIngredients =
    ingredientsItemsContainer.querySelectorAll(".items-in-filter");

  itemsIngredients.forEach((itemIngredient) => {
    itemIngredient.addEventListener("click", function () {
      const clickedIngredient = itemIngredient.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules
      uniqueTagsIngredients.add(clickedIngredient);

      // Masquer l'item
      hiddenIngredients.add(clickedIngredient);
      itemIngredient.style.display = "none";

      console.log(uniqueTagsIngredients);
      // On filtre les recettes qui contiennent l'ingrédient cliqué
      const filteredRecipes = searchResults.filter((recipe) => {
        return recipe.ingredients.some((ingredientList) => {
          // On vérifie si au moins un élément de l'array ingredients inclue l'ingredient cliqué
          return ingredientList.ingredient
            .toLowerCase()
            .includes(clickedIngredient);
        });
      });

      // On met à jour l'affichage des recettes avec les nouvelles recettes filtrées
      cardContainer.innerHTML = "";
      filteredRecipes.forEach((recipe) => {
        const clickableCard = createRecipeCard(recipe);
        cardContainer.appendChild(clickableCard);
      });
      // On supprime l'élément cliqué de la liste des ingrédients
      updateIngredientFilter(filteredRecipes);
      updateApplianceFilter(filteredRecipes);
      updateUstensileFilter(filteredRecipes);
      filterIngredientsFromInput();
      filterAppliancesFromInput();
      filterUstensilesFromInput();
    });
  });
}
// -------------------------------------------------------------------------------------------------//

// ---------------------------------------------------------------------------- //

// -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE INGREDIENT -------------- //
function updateIngredientFilter(searchResults) {
  const importContainer = document.querySelector(".import-ingredients");
  const allTagsIngredients = document.querySelector(".tags-ingredients");

  importContainer.innerHTML = "";

  uniqueIngredients.clear(); // Réinitialisez le Set uniqueIngredients

  searchResults.forEach((recipe) => {
    recipe.ingredients.forEach((ingredientList) => {
      const ingredientName = ingredientList.ingredient.toLowerCase();

      if (!hiddenIngredients.has(ingredientName)) {
        uniqueIngredients.add(ingredientName);
      }
    });
  });
  hiddenIngredients.forEach((ingredientName) => {
    if (!uniqueIngredients.has(ingredientName)) {
      uniqueIngredients.add(ingredientName);
    }
  });

  console.log(uniqueIngredients);

  const uniqueIngredientsArray = Array.from(uniqueIngredients);

  uniqueIngredientsArray.forEach((item) => {
    displayItemsInFilter(item, importContainer, allTagsIngredients);
    searchRecipesFromIngredientTag(searchResults);
  });
}

// ---------------------------------------------------------------------------- //

export function searchRecipesFromDeletedIngredientTag(item) {
  // Supprimez l'élément cliqué des ensembles uniques
  uniqueIngredients.delete(item.toLowerCase());
  uniqueTagsIngredients.delete(item.toLowerCase());
  hiddenIngredients.delete(item.toLowerCase());

  // Réinitialisez l'affichage des recettes
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

// ---------------------------------------------------------------------------- //

// -----  FONCTION POUR FILTRER LES RECETTES PAR APPAREILS AU CLIC SUR UN TAG -------------- //

function searchRecipesFromApplianceTag(searchResults) {
  const applianceItemsContainer = document.querySelector(".import-appliances");
  const itemsAppliances =
    applianceItemsContainer.querySelectorAll(".items-in-filter");

  itemsAppliances.forEach((itemAppliance) => {
    itemAppliance.addEventListener("click", function () {
      const clickedAppliance = itemAppliance.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules

      uniqueTagsAppliances.add(clickedAppliance);

      // Masquer l'item
      hiddenAppliances.add(clickedAppliance);
      itemAppliance.style.display = "none";

      console.log(itemAppliance);
      console.log(hiddenAppliances);

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
      updateIngredientFilter(filteredRecipes);
      updateApplianceFilter(filteredRecipes);
      updateUstensileFilter(filteredRecipes);
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

  uniqueAppliances.clear(); // Réinitialisez le Set uniqueAppliances

  searchResults.forEach((recipe) => {
    uniqueAppliances.add(recipe.appliance.toLowerCase()); // CHERCHER POURQUOI L'ITEM NE S'EFFACE PAS
    const applianceName = recipe.appliance.toLowerCase();

    if (!hiddenAppliances.has(applianceName)) {
      uniqueAppliances.add(applianceName);
    }
  });

  hiddenAppliances.forEach((applianceName) => {
    if (!uniqueAppliances.has(applianceName)) {
      uniqueAppliances.add(applianceName);
    }
  });

  console.log(uniqueAppliances);

  const uniqueAppliancesArray = Array.from(uniqueAppliances);

  uniqueAppliancesArray.forEach((item) => {
    displayItemsInFilter(item, importContainer, allTagsAppliances);
    searchRecipesFromApplianceTag(searchResults);
  });
}

// ---------------------------------------------------------------------------- //

export function searchRecipesFromDeletedApplianceTag(item) {
  // Supprimez l'élément cliqué des ensembles uniques
  uniqueAppliances.delete(item.toLowerCase());
  uniqueTagsAppliances.delete(item.toLowerCase());
  hiddenAppliances.delete(item.toLowerCase());

  // Réinitialisez l'affichage des recettes
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

searchRecipesFromIngredientTag(recipes);
updateIngredientFilter(recipes);

searchRecipesFromApplianceTag(recipes);
updateApplianceFilter(recipes);

searchRecipesFromUstensileTag(recipes);
updateUstensileFilter(recipes);

// -----  FONCTION POUR FILTRER LES RECETTES PAR USTENSILE AU CLIC SUR UN TAG -------------- //

function searchRecipesFromUstensileTag(searchResults) {
  const ustensilesItemsContainer = document.querySelector(".import-ustensiles");
  const itemsUstensiles =
    ustensilesItemsContainer.querySelectorAll(".items-in-filter");

  itemsUstensiles.forEach((itemUstensile) => {
    itemUstensile.addEventListener("click", function () {
      const clickedUstensile = itemUstensile.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules
      uniqueTagsUstensiles.add(clickedUstensile);

      // Masquer l'item
      hiddenUstensiles.add(clickedUstensile);
      itemUstensile.style.display = "none";

      console.log(uniqueTagsUstensiles);

      // On filtre les recettes qui contiennent l'ingrédient cliqué
      const filteredRecipes = searchResults.filter((recipe) => {
        return recipe.ustensils.some((ustensil) => {
          // On vérifie si au moins un élément de l'array ingredients inclue l'ingredient cliqué
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
      updateIngredientFilter(filteredRecipes);
      updateApplianceFilter(filteredRecipes);
      updateUstensileFilter(filteredRecipes);
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

  uniqueUstensiles.clear(); // Réinitialisez le Set uniqueUstensiles

  searchResults.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const ustensileName = ustensil.toLowerCase();

      if (!hiddenUstensiles.has(ustensileName)) {
        uniqueUstensiles.add(ustensileName);
      }
    });
  });

  hiddenUstensiles.forEach((ustensileName) => {
    if (!uniqueUstensiles.has(ustensileName)) {
      uniqueUstensiles.add(ustensileName);
    }
  });

  const uniqueUstensilesArray = Array.from(uniqueUstensiles);

  uniqueUstensilesArray.forEach((item) => {
    displayItemsInFilter(item, importContainer, allTagsUstensiles);
    searchRecipesFromUstensileTag(searchResults);
  });
}

export function searchRecipesFromDeletedUstensileTag(item) {
  // Supprimez l'élément cliqué des ensembles uniques
  uniqueUstensiles.delete(item.toLowerCase());
  uniqueTagsUstensiles.delete(item.toLowerCase());
  hiddenUstensiles.delete(item.toLowerCase());

  // Réinitialisez l'affichage des recettes
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

function searchByTags() {
  cardContainer.innerHTML = "";

  const tagsAppliancesArray = Array.from(uniqueTagsAppliances).map((tag) =>
    tag.toLowerCase()
  );
  const tagsIngredientsArray = Array.from(uniqueTagsIngredients).map((tag) =>
    tag.toLowerCase()
  );
  const tagsUstensilesArray = Array.from(uniqueTagsUstensiles).map((tag) =>
    tag.toLowerCase()
  );

  // Filtrer les recettes en utilisant à la fois les tags restants et le texte de recherche actuel
  const filteredRecipes = recipes.filter((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const appliances = recipe.appliance.toLowerCase();
    const ingredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );
    const ustensiles = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    // Vérifiez si le nom de la recette, la description ou les ingrédients correspondent
    const matchesText =
      recipeName.includes(searchText) ||
      recipeDescription.includes(searchText) ||
      ingredients.some((ingredient) => ingredient.includes(searchText));

    // Vérifiez si la recette contient les tags restants

    const containsTabAppliance = tagsAppliancesArray.every((tag) =>
      appliances.includes(tag)
    );
    const containsTagIngredient = tagsIngredientsArray.every((tag) =>
      ingredients.includes(tag)
    );
    const containsTagUstensile = tagsUstensilesArray.every((tag) =>
      ustensiles.includes(tag)
    );

    return (
      matchesText &&
      containsTabAppliance &&
      containsTagIngredient &&
      containsTagUstensile
    );
  });

  // Affichez les recettes filtrées
  filteredRecipes.forEach((recipe) => {
    const clickableCard = createRecipeCard(recipe);
    cardContainer.appendChild(clickableCard);
  });
}
