import { generateTag } from "./tags.js";

// OUVERTURE - FERMETURE DU FILTRE INGREDIENTS//

const closeButtonInSearch = document.querySelectorAll(".close-in-search");

const ingredients = document.querySelector(".ingredients");
const appliances = document.querySelector(".appliances");
const ustensiles = document.querySelector(".ustensiles");

const buttonIngredients = document.querySelector(".ingredient-button");
const buttonAppliances = document.querySelector(".appliance-button");
const buttonUstensiles = document.querySelector(".ustensiles-button");

const chevronDown = document.querySelector(".bi-chevron-down");
const ingredientFilterInput = document.getElementById("search-ingredient"); // ici on vise l'input dans le HTML
const applianceFilterInput = document.getElementById("search-appliance");
const ustensileFilterInput = document.getElementById("search-ustensile");


// OUVERTURE - FERMETURE DU FILTRE INGREDIENT //
buttonIngredients.addEventListener("click", function () {
  if (ingredients.style.display === "none") {
    ingredients.style.display = "block";
    appliances.style.display = "none";
    ustensiles.style.display = "none";
    buttonIngredients.style.borderRadius = "15px 15px 0px 0px";
    chevronDown.classList.add("rotate");
  } else {
    ingredients.style.display = "none";
    chevronDown.classList.remove("rotate");
    buttonIngredients.style.borderRadius = "15px 15px 15px 15px";
    ingredientFilterInput.value = "";
    closeButtonInSearch.forEach((btn) => {
      btn.style.display = "none";
    });
  }
});

// OUVERTURE - FERMETURE DU FILTRE APPAREILS //
buttonAppliances.addEventListener("click", function () {
  if (appliances.style.display === "none") {
    appliances.style.display = "block";
    ingredients.style.display = "none";
    ustensiles.style.display = "none";
    buttonAppliances.style.borderRadius = "15px 15px 0px 0px";
    chevronDown.classList.add("rotate");
  } else {
    appliances.style.display = "none";
    chevronDown.classList.remove("rotate");
    buttonAppliances.style.borderRadius = "15px 15px 15px 15px";
    applianceFilterInput.value = "";
    closeButtonInSearch.forEach((btn) => {
      btn.style.display = "none";
    });
  }
});

// OUVERTURE - FERMETURE DU FILTRE USTENSILES //
buttonUstensiles.addEventListener("click", function () {
  if (ustensiles.style.display === "none") {
    ustensiles.style.display = "block";
    appliances.style.display = "none";
    ingredients.style.display = "none";
    buttonUstensiles.style.borderRadius = "15px 15px 0px 0px";
    chevronDown.classList.add("rotate");
  } else {
    ustensiles.style.display = "none";
    chevronDown.classList.remove("rotate");
    buttonUstensiles.style.borderRadius = "15px 15px 15px 15px";
    ustensileFilterInput.value = "";
    closeButtonInSearch.forEach((btn) => {
      btn.style.display = "none";
    });
  }
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
      const ingredientName = removeAccents(
        ingredientItem.textContent.toLowerCase()
      ); // ici, l'ingrédient dans la liste sans accent
      if (ingredientName.includes(filterText)) {
        ingredientItem.style.display = "block";
      } else {
        ingredientItem.style.display = "none";
      }
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
      const applianceName = removeAccents(item.textContent.toLowerCase()); // ici, l'appareil dans la liste sans accent
      if (applianceName.includes(filterText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
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
      const ustensileName = removeAccents(item.textContent.toLowerCase()); // ici, l'ustensile dans la liste sans accent
      if (ustensileName.includes(filterText)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// FONCTION POUR FAIRE APPARAITRE LA CROIX DANS LA BARRE DE RECHERCHE

closeButtonInSearch.forEach((closeBtn) => {
  ingredientFilterInput.addEventListener("input", function (event) {
    if (event.target.value === "") {
      closeBtn.style.display = "none";
    } else {
      closeBtn.style.display = "block";
    }
    closeBtn.addEventListener("click", function () {
      ingredientFilterInput.value = "";
    
      closeButtonInSearch.forEach((btn) => {
        btn.style.display = "none";
      });
    });
  });

  applianceFilterInput.addEventListener("input", function (event) {
    if (event.target.value === "") {
      closeBtn.style.display = "none";
    } else {
      closeBtn.style.display = "block";
    }
    closeBtn.addEventListener("click", function () {
      applianceFilterInput.value = "";

      closeButtonInSearch.forEach((btn) => {
        btn.style.display = "none";
      });
    });
  });

  ustensileFilterInput.addEventListener("input", function (event) {
    if (event.target.value === "") {
      closeBtn.style.display = "none";
    } else {
      closeBtn.style.display = "block";
    }
    closeBtn.addEventListener("click", function () {
      ustensileFilterInput.value = "";
 
      closeButtonInSearch.forEach((btn) => {
        btn.style.display = "none";
      });
    });
  });
});

// FONCTION POUR NORMALISER LES CARACTERES RECHERCHÉS DANS L'INPUT SANS ACCENTS
export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


filterIngredientsFromInput()
filterAppliancesFromInput()
filterUstensilesFromInput()