import { displayItemsInFilter } from "./filters.js";
import { uniqueIngredients, uniqueAppliances, uniqueUstensiles, hiddenAppliances, hiddenIngredients, hiddenUstensiles, searchRecipesFromIngredientTag, searchRecipesFromApplianceTag, searchRecipesFromUstensileTag } from "./search-fonctionnal.js";



// -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE INGREDIENT -------------- //
export function updateIngredientFilter(searchResults) {
    const importContainer = document.querySelector(".import-ingredients");
    const allTagsIngredients = document.querySelector(".tags-ingredients");
  
    importContainer.innerHTML = "";

    uniqueIngredients.clear(); 
  
    searchResults.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientList) => {
        const ingredientName = ingredientList.ingredient.toLowerCase();
  
        if (!hiddenIngredients.has(ingredientName)) {
          uniqueIngredients.add(ingredientName);
        } 
      });
    });
  
    const uniqueIngredientsArray = Array.from(uniqueIngredients);
    uniqueIngredientsArray.forEach((item) => {
      displayItemsInFilter(item, importContainer, allTagsIngredients);
    });
    searchRecipesFromIngredientTag(searchResults);
  }



  // -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE APPAREILS -------------- //
export function updateApplianceFilter(searchResults) {
    const importContainer = document.querySelector(".import-appliances");
    const allTagsAppliances = document.querySelector(".tags-appliances");
  
    importContainer.innerHTML = "";
  
    uniqueAppliances.clear(); 
  
    searchResults.forEach((recipe) => {
      uniqueAppliances.add(recipe.appliance.toLowerCase()); 
      const applianceName = recipe.appliance.toLowerCase();
  
      if (hiddenAppliances.size > 0 ) {
        uniqueAppliances.delete(applianceName);
      }
    });
    const uniqueAppliancesArray = Array.from(uniqueAppliances);
    uniqueAppliancesArray.forEach((item) => {
      displayItemsInFilter(item, importContainer, allTagsAppliances);
    });
    searchRecipesFromApplianceTag(searchResults);

  }


  // -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE USTENSILE -------------- //
export function updateUstensileFilter(searchResults) {
    const importContainer = document.querySelector(".import-ustensiles");
    const allTagsUstensiles = document.querySelector(".tags-ustensiles");
    importContainer.innerHTML = "";
    uniqueUstensiles.clear(); 
  
    searchResults.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        const ustensileName = ustensil.toLowerCase();
  
        if (!hiddenUstensiles.has(ustensileName)) {
          uniqueUstensiles.add(ustensileName);
        }
      });
    });
    const uniqueUstensilesArray = Array.from(uniqueUstensiles);
    uniqueUstensilesArray.forEach((item) => {
      displayItemsInFilter(item, importContainer, allTagsUstensiles);
    });
    searchRecipesFromUstensileTag(searchResults);

  }

  // -----  FONCTION GÉNÉRIQUE POUR METTRE A JOUR TOUS LES ITEMS DANS LES FILTRES -------------- //

  export function updateFilters(recipes, searchResults, filteredRecipes) {
    updateIngredientFilter(recipes, searchResults, filteredRecipes)
    updateApplianceFilter(recipes, searchResults, filteredRecipes)
    updateUstensileFilter(recipes, searchResults, filteredRecipes)
  }