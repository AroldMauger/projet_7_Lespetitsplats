import { searchRecipesFromDeletedIngredientTag, searchRecipesFromDeletedApplianceTag, searchRecipesFromDeletedUstensileTag, 
  uniqueTagsIngredients, uniqueIngredients, uniqueTagsAppliances, uniqueAppliances, uniqueTagsUstensiles, uniqueUstensiles } from "./search-fonctionnal.js";

// FONCTION POUR GÉNÉRER LES TAGS AVEC FOND JAUNE //
export function generateTag(item, allTagsContainer) {

    const tagContainer = document.createElement("div");
    tagContainer.classList.add("tag");
  
    const tagName = document.createElement("span");
    tagName.textContent = item;
    tagName.classList.add("tag-content");
    
    const closeTag = document.createElement("span");
    closeTag.classList.add("bi-x-lg");
    closeTag.classList.add("close-tag-button");
  
    // quand on clique sur la croix pour supprimer un tag, on appelle la fonction de recherche des recettes qui correspond //
    closeTag.addEventListener("click", function () {
      tagContainer.remove()                                 // efface le tag
      if(uniqueTagsIngredients.size > 0) {
        uniqueTagsIngredients.delete(item.toLowerCase());   // actualisation du set uniqueTagsIngredients
        uniqueIngredients.delete(item.toLowerCase());       // actualisation du set uniqueIngredients
        searchRecipesFromDeletedIngredientTag(item);        // appel de la fonction de recherche des recettes à partir de suppression de tag
    
      } if(uniqueTagsAppliances.size > 0) {
        uniqueTagsAppliances.delete(item.toLowerCase());
        uniqueAppliances.delete(item.toLowerCase());
        searchRecipesFromDeletedApplianceTag(item)

      } if (uniqueTagsUstensiles.size > 0) {
        uniqueTagsUstensiles.delete(item.toLowerCase());
        uniqueUstensiles.delete(item.toLowerCase());
        searchRecipesFromDeletedUstensileTag(item)
      }
    });
    tagContainer.appendChild(tagName);
    tagContainer.appendChild(closeTag);
    allTagsContainer.appendChild(tagContainer);
  }