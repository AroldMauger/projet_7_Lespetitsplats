// -------------- FONCTION POUR CRÉER LES TAGS JAUNES  ------------//

export function generateTag(item, allTagsContainer) {

    const allFilters = document.querySelectorAll(".search-in-filter"); // On ferme le filtre après le clic
      allFilters.forEach((filter) => {
        const buttons = document.querySelectorAll(".buttons");
        filter.style.display = "none";
  
        buttons.forEach((button) => {
          button.style.borderRadius = "15px 15px 15px 15px"; // On ajoute un borderRadius au bouton filtre
        });
      });
      
    const tagContainer = document.createElement("div");
    tagContainer.classList.add("tag");
  
    const tagName = document.createElement("span");
    tagName.textContent = item;
  
    const closeTag = document.createElement("span");
    closeTag.classList.add("bi-x-lg");
    closeTag.classList.add("close-tag-button");
  
    closeTag.addEventListener("click", function () {
      tagContainer.remove();
    });
  
    tagContainer.appendChild(tagName);
    tagContainer.appendChild(closeTag);
    allTagsContainer.appendChild(tagContainer);
  }
  // ----------------------------------------------------------------- //