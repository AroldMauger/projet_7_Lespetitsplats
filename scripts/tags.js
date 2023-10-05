import { searchRecipesFromDeletedIngredientTag, searchRecipesFromDeletedApplianceTag, searchRecipesFromDeletedUstensileTag } from "./search-native.js";
import { uniqueTagsIngredients, uniqueIngredients, uniqueTagsAppliances, uniqueAppliances, uniqueTagsUstensiles, uniqueUstensiles} from "./search-native.js";



export function generateTag(item, allTagsContainer) {

    const tagContainer = document.createElement("div");
    tagContainer.classList.add("tag");
  
    const tagName = document.createElement("span");
    tagName.textContent = item;
    tagName.classList.add("tag-content");
    
    const closeTag = document.createElement("span");
    closeTag.classList.add("bi-x-lg");
    closeTag.classList.add("close-tag-button");
  
    closeTag.addEventListener("click", function () {
      tagContainer.remove()
      if(uniqueTagsIngredients.size > 0) {
        uniqueTagsIngredients.delete(item.toLowerCase());
        uniqueIngredients.delete(item.toLowerCase());
        
        searchRecipesFromDeletedIngredientTag(item); 
        console.log(uniqueTagsIngredients)
    
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