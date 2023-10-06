import { generateTag } from "./tags.js";

// OUVERTURE - FERMETURE DU FILTRE INGREDIENTS//

const closeButtonInSearch = document.querySelectorAll(".close-in-search");

const ingredients = document.querySelector(".ingredients");
const appliances = document.querySelector(".appliances");
const ustensiles = document.querySelector(".ustensiles");

const buttonIngredients = document.querySelector(".ingredient-button");
const buttonAppliances = document.querySelector(".appliance-button");
const buttonUstensiles = document.querySelector(".ustensiles-button");

const ingredientFilterInput = document.getElementById("search-ingredient"); // ici on vise l'input dans le HTML
const applianceFilterInput = document.getElementById("search-appliance");
const ustensileFilterInput = document.getElementById("search-ustensile");

const chevronDownIng = buttonIngredients.querySelector(".bi-chevron-down");
const chevronDownAppl = buttonAppliances.querySelector(".bi-chevron-down");
const chevronDownUst = buttonUstensiles.querySelector(".bi-chevron-down");
const filters = [ingredients, appliances, ustensiles];
const buttons = [buttonIngredients, buttonAppliances, buttonUstensiles];
const inputElements = [ingredientFilterInput, applianceFilterInput, ustensileFilterInput];
const chevronDowns = [chevronDownIng, chevronDownAppl, chevronDownUst];

function displayFiltersContent(filterIndex) {
  filters.forEach((filter, index) => {
    const button = buttons[index];
    const input = inputElements[index];
    const chevronDown = chevronDowns[index];

    if (index === filterIndex) {
      filter.style.display = filter.style.display === "none" ? "block" : "none";
      button.style.borderRadius = "15px 15px 0px 0px";
      input.value = "";
      chevronDown.classList.add("rotate");
    } else {
      filter.style.display = "none";
      button.style.borderRadius = "15px";
      chevronDown.classList.remove("rotate");
    }
  });
}

buttonIngredients.addEventListener("click", function(){
  displayFiltersContent(0);
});

buttonAppliances.addEventListener("click", function(){
  displayFiltersContent(1);
});

buttonUstensiles.addEventListener("click", function (){
  displayFiltersContent(2);
});


// --------------FONCTION POUR AFFICHER LES CONTENUS DE CHAQUE FILTRE  ------------//

export function displayItemsInFilter(item, importContainer, allTagsContainer) {
  const itemElement = document.createElement("span");
  itemElement.textContent = item;
  itemElement.classList.add("items-in-filter");

  importContainer.appendChild(itemElement);

  // GESTION DU SURVOL ET FOND JAUNE

  itemElement.addEventListener("mouseover", () => {
    itemElement.style.backgroundColor = "#FFD15B";
  });

  itemElement.addEventListener("mouseout", () => {
    itemElement.style.backgroundColor = "transparent";
  });

  // CREATION D'UN TAG AU CLIC SUR UN ITEM

  itemElement.addEventListener("click", function()  {
    generateTag(item, allTagsContainer);
  });

}
// ----------------------------------------------------------------- //


// FONCTION POUR FILTRER LES NOMS DES INGREDIENTS EN FONCTION DE CE QU'ECRIT L'UTILISATEUR DANS LA BARRE DE RECHERCHE
export function filterIngredientsFromInput() {
  const ingredientFilterInput = document.getElementById("search-ingredient"); // ici on vise l'input dans le HTML
  const ingredientItems = document.querySelectorAll(".items-in-filter");

  ingredientFilterInput.addEventListener("input", (event) => {
    const filterText = removeAccents(event.target.value.toLowerCase()); // ici, le texte qu'on écrit dans l'input sans accent
    // ToLowerCase() nous permet de comparer l'input et les ingrédients avec la même casse
    
    ingredientItems.forEach((ingredientItem) => {
      ingredientItem.addEventListener("click", function () {
        // permet de supprimer le texte dans la barre de recherche
        event.target.value = "";

        closeButtonInSearch.forEach((closeBtn) => {
          closeBtn.style.display = "none";
        });
      });

      setTimeout(function () {
        const ingredientName = removeAccents(
          ingredientItem.textContent.toLowerCase()
        ); // ici, l'ingrédient dans la liste sans accent
        if (ingredientName.includes(filterText)) {
          ingredientItem.style.display = "block";
        } else {
          ingredientItem.style.display = "none";
        }
      }, 300);
    });
  });

}

// FONCTION POUR FILTRER LES NOMS DES APPAREILS EN FONCTION DE CE QU'ECRIT L'UTILISATEUR DANS LA BARRE DE RECHERCHE
export function filterAppliancesFromInput() {
  const applianceFilterInput = document.getElementById("search-appliance"); // ici on vise l'input dans le HTML
  const items = document.querySelectorAll(".items-in-filter");

  applianceFilterInput.addEventListener("input", (event) => {
    const filterText = removeAccents(event.target.value.toLowerCase()); // ici, le texte qu'on écrit dans l'input sans accent
    // ToLowerCase() nous permet de comparer l'input et les appareils avec la même casse
    items.forEach((item) => {
      item.addEventListener("click", function () {
        // permet de supprimer le texte dans la barre de recherche
        event.target.value = "";

        closeButtonInSearch.forEach((closeBtn) => {
          closeBtn.style.display = "none";
        });
      });
      setTimeout(function () {
        const applianceName = removeAccents(item.textContent.toLowerCase()); // ici, l'appareil dans la liste sans accent
        if (applianceName.includes(filterText)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }, 300);
    });
  });
}

// FONCTION POUR FILTRER LES NOMS DES USTENSILES EN FONCTION DE CE QU'ECRIT L'UTILISATEUR DANS LA BARRE DE RECHERCHE
export function filterUstensilesFromInput() {
  const ustensileFilterInput = document.getElementById("search-ustensile"); // ici on vise l'input dans le HTML
  const items = document.querySelectorAll(".items-in-filter");

  ustensileFilterInput.addEventListener("input", (event) => {
    const filterText = removeAccents(event.target.value.toLowerCase()); // ici, le texte qu'on écrit dans l'input sans accent
                                                                        // ToLowerCase() nous permet de comparer l'input et les ustensiles avec la même casse
    items.forEach((item) => {
      item.addEventListener("click", function () {
        // permet de supprimer le texte dans la barre de recherche
        event.target.value = "";

        closeButtonInSearch.forEach((closeBtn) => {
          closeBtn.style.display = "none";
        });
      });
      setTimeout(function () {
        const ustensileName = removeAccents(item.textContent.toLowerCase()); // ici, l'ustensile dans la liste sans accent
        if (ustensileName.includes(filterText)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }, 300);
    });
  });
}

// FONCTION POUR FAIRE APPARAITRE LA CROIX DANS LA BARRE DE RECHERCHE DE CHAQUE FILTRE //

function displayCloseButtonInSearchByFilter(filterInput, closeButton) {
  filterInput.addEventListener("input", function (event) {
    if (event.target.value === "") {
      closeButton.style.display = "none";
    } else {
      closeButton.style.display = "block";
    }
  });

  closeButton.addEventListener("click", function () {
    filterInput.value = "";

    closeButtonInSearch.forEach((btn) => {
      btn.style.display = "none";
    });
  });
}

displayCloseButtonInSearchByFilter(ingredientFilterInput, closeButtonInSearch[0]);
displayCloseButtonInSearchByFilter(applianceFilterInput, closeButtonInSearch[1]);
displayCloseButtonInSearchByFilter(ustensileFilterInput, closeButtonInSearch[2]);


// FONCTION POUR NORMALISER LES CARACTERES RECHERCHÉS DANS L'INPUT SANS ACCENTS
export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fonction générique pour permettre le filtre à partir du texte dans la barre de recherche des filtres

export function filterItemsFromSearchInFilters () {
  filterIngredientsFromInput()
  filterAppliancesFromInput()
  filterUstensilesFromInput()
}

filterItemsFromSearchInFilters()
