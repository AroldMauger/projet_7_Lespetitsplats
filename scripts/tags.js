
/*

// -----  FONCTION POUR METTRE A JOUR LES ITEMS DANS LE FILTRE USTENSILE -------------- //
function updateUstensileFilter(searchResults) {
    const importContainer = document.querySelector(".import-ustensiles");
    const allTagsUstensiles = document.querySelector(".tags-ustensiles");
  
    importContainer.innerHTML = "";
  
    uniqueUstensiles.clear(); // Réinitialisez le Set uniqueUstensiles
  
    searchResults.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        uniqueUstensiles.add(ustensil.toLowerCase());
      });
    });
  
    const uniqueUstensilesArray = Array.from(uniqueUstensiles);
  
    uniqueUstensilesArray.forEach((item) => {
      displayItemsInFilter(item, importContainer, allTagsUstensiles);
      searchRecipesFromUstensileTag(searchResults);
    });
  }


  
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
  
searchRecipesFromUstensileTag(recipes)


  */