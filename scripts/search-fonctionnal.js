import { recipes } from "./recipes.js";
import { createRecipeCard } from "./main.js";
import { updateFilters } from "./updateFilters.js";
import { filterItemsFromSearchInFilters, filterIngredientsFromInput, filterAppliancesFromInput, filterUstensilesFromInput } from "./filters.js";

const cardContainer = document.querySelector(".cards-container");
const searchInput = document.getElementById("search-recipe");
const totalRecipes = document.querySelector(".total-recipes");

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
  searchText = searchInput.value.toLowerCase();
  setTimeout(function () {
    if (searchText.length >= 3) {
      cardContainer.innerHTML = "";
      searchRecipes();
      filterItemsFromSearchInFilters();
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
    const searchResults = recipes.filter((recipe) => {
        const recipeName = recipe.name.toLowerCase();
        const recipeDescription = recipe.description.toLowerCase();
    
        const ingredientNames = recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        );
    
        return (
          recipeName.includes(searchText) ||
          recipeDescription.includes(searchText) ||
          ingredientNames.includes(searchText)
        );
      });

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

  itemsIngredients.forEach((itemIngredient) => {
    itemIngredient.addEventListener("click", function () {
      const clickedIngredient = itemIngredient.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules
      uniqueTagsIngredients.add(clickedIngredient);

      hiddenIngredients.add(clickedIngredient);
      itemIngredient.style.display = "none";

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

      totalRecipes.textContent = filteredRecipes.length + " recettes"

      // On supprime l'élément cliqué de la liste des ingrédients
      updateFilters(filteredRecipes)

      filterItemsFromSearchInFilters()
    });
  });
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

  itemsAppliances.forEach((itemAppliance) => {
    itemAppliance.addEventListener("click", function () {
      const clickedAppliance = itemAppliance.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules

      uniqueTagsAppliances.add(clickedAppliance);

      hiddenAppliances.add(clickedAppliance);
      itemAppliance.style.display = "none";

   

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
      totalRecipes.textContent = filteredRecipes.length + " recettes"

      // On supprime l'élément cliqué de la liste des ingrédients
      updateFilters(filteredRecipes)

      filterItemsFromSearchInFilters();
    });
  });
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

  itemsUstensiles.forEach((itemUstensile) => {
    itemUstensile.addEventListener("click", function () {
      const clickedUstensile = itemUstensile.textContent.toLowerCase(); // On récupère le texte de l'élément cliqué en minuscules
      uniqueTagsUstensiles.add(clickedUstensile);

      hiddenUstensiles.add(clickedUstensile);
      itemUstensile.style.display = "none";


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
      totalRecipes.textContent = filteredRecipes.length + " recettes"

      // On supprime l'élément cliqué de la liste des ingrédients
      updateFilters(filteredRecipes)

      filterItemsFromSearchInFilters();
    });
  });
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

  const tagsAppliancesArray = Array.from(uniqueTagsAppliances).map((tag) =>
    tag.toLowerCase()
  );
  const tagsIngredientsArray = Array.from(uniqueTagsIngredients).map((tag) =>
    tag.toLowerCase()
  );
  const tagsUstensilesArray = Array.from(uniqueTagsUstensiles).map((tag) =>
    tag.toLowerCase()
  );

  // On filtre les recettes en utilisant à la fois les tags restants et le texte de recherche actuel
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

    // On vérifie si le nom de la recette, la description ou les ingrédients correspondent au texte dans la barre de recherche
    const matchesText =
      recipeName.includes(searchText) ||
      recipeDescription.includes(searchText) ||
      ingredients.some((ingredient) => ingredient.includes(searchText));

    // On vérifie si la recette contient les tags restants

    const containsTabAppliance = tagsAppliancesArray.every((tag) =>
      appliances.includes(tag)
    );
    const containsTagIngredient = tagsIngredientsArray.every((tag) =>
      ingredients.includes(tag)
    );
    const containsTagUstensile = tagsUstensilesArray.every((tag) =>
      ustensiles.includes(tag)
    );

    return ( matchesText && containsTabAppliance && containsTagIngredient && containsTagUstensile );
  });

  filteredRecipes.forEach((recipe) => {
    const clickableCard = createRecipeCard(recipe);
    cardContainer.appendChild(clickableCard);
  });

  totalRecipes.textContent = filteredRecipes.length + " recettes"
  updateFilters(filteredRecipes)
}


// Par défaut on appelle les fonctions qui permettent de faire la recherche par tag
searchRecipesFromIngredientTag(recipes);
searchRecipesFromApplianceTag(recipes);
searchRecipesFromUstensileTag(recipes);

updateFilters(recipes)
