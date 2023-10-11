import { displayItemsInFilter, filterItemsFromSearchInFilters } from "./filters.js";
import { uniqueIngredients, uniqueAppliances, uniqueUstensiles, hiddenAppliances, hiddenIngredients, hiddenUstensiles, searchRecipesFromIngredientTag, searchRecipesFromApplianceTag, searchRecipesFromUstensileTag } from "./search-native.js";



// -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE INGREDIENT -------------- //
export function updateIngredientFilter(searchResults) {
    const importContainer = document.querySelector(".import-ingredients");
    const allTagsIngredients = document.querySelector(".tags-ingredients");
  
    importContainer.innerHTML = "";

    uniqueIngredients.clear(); 
    for (let i = 0; i < searchResults.length; i++) {
      const recipe = searchResults[i];

      for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredientList = recipe.ingredients[i];
        const ingredientName = ingredientList.ingredient.toLowerCase();
  
        if (!hiddenIngredients.has(ingredientName)) {
          uniqueIngredients.add(ingredientName);
        } 
      }
    };
  
    const uniqueIngredientsArray = Array.from(uniqueIngredients);
    for (let i = 0; i < uniqueIngredientsArray.length; i++) {
      const item = uniqueIngredientsArray[i];
      displayItemsInFilter(item, importContainer, allTagsIngredients);
    }
    searchRecipesFromIngredientTag(searchResults);
  }



  // -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE APPAREILS -------------- //
export function updateApplianceFilter(searchResults) {
    const importContainer = document.querySelector(".import-appliances");
    const allTagsAppliances = document.querySelector(".tags-appliances");
  
    importContainer.innerHTML = "";
  
    uniqueAppliances.clear(); 
    for (let i = 0; i < searchResults.length; i++) {
      const recipe = searchResults[i];
      uniqueAppliances.add(recipe.appliance.toLowerCase()); 
      const applianceName = recipe.appliance.toLowerCase();
  
      if (hiddenAppliances.size > 0 ) {
        uniqueAppliances.delete(applianceName);
      }
    };
    const uniqueAppliancesArray = Array.from(uniqueAppliances);
    for (let i = 0; i < uniqueAppliancesArray.length; i++) {
      const item = uniqueAppliancesArray[i];
      displayItemsInFilter(item, importContainer, allTagsAppliances);
    };
    searchRecipesFromApplianceTag(searchResults);

  }


  // -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE USTENSILE -------------- //
export function updateUstensileFilter(searchResults) {
    const importContainer = document.querySelector(".import-ustensiles");
    const allTagsUstensiles = document.querySelector(".tags-ustensiles");
    importContainer.innerHTML = "";
    uniqueUstensiles.clear(); 

    for (let i = 0; i < searchResults.length; i++) {
      const recipe = searchResults[i];

      for (let i = 0; i < recipe.ustensils.length; i++) {
        const ustensil = recipe.ustensils[i];
        const ustensileName = ustensil.toLowerCase();
  
        if (!hiddenUstensiles.has(ustensileName)) {
          uniqueUstensiles.add(ustensileName);
        }
      };
    };
    const uniqueUstensilesArray = Array.from(uniqueUstensiles);
    for (let i = 0; i < uniqueUstensilesArray.length; i++) {
      const item = uniqueUstensilesArray[i];
      displayItemsInFilter(item, importContainer, allTagsUstensiles);
    };
    searchRecipesFromUstensileTag(searchResults);
  }

  // -----  FONCTION GÉNÉRIQUE POUR METTRE A JOUR TOUS LES ITEMS DANS LES FILTRES -------------- //

  export function updateFilters(recipes, searchResults, filteredRecipes) {
    updateIngredientFilter(recipes, searchResults, filteredRecipes)
    updateApplianceFilter(recipes, searchResults, filteredRecipes)
    updateUstensileFilter(recipes, searchResults, filteredRecipes)
    filterItemsFromSearchInFilters()
  }