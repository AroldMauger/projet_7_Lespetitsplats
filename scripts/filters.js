// DÉCLARATION DES VARIABLES //
const closeIngredients = document.querySelector(".close-ingredients");
const closeAppliances = document.querySelector(".close-appliances");
const closeUstensiles = document.querySelector(".close-ustensiles");

const ingredients = document.querySelector(".ingredients");
const appliances = document.querySelector(".appliances");
const ustensiles = document.querySelector(".ustensiles");

const buttonIngredients = document.querySelector(".ingredient-button");
const buttonAppliances = document.querySelector(".appliance-button");
const buttonUstensiles = document.querySelector(".ustensiles-button");

const ingredientFilterInput = document.getElementById("search-ingredient"); 
const applianceFilterInput = document.getElementById("search-appliance");
const ustensileFilterInput = document.getElementById("search-ustensile");

const chevronDownIng = buttonIngredients.querySelector(".bi-chevron-down");
const chevronDownAppl = buttonAppliances.querySelector(".bi-chevron-down");
const chevronDownUst = buttonUstensiles.querySelector(".bi-chevron-down");
const filters = [ingredients, appliances, ustensiles];
const buttons = [buttonIngredients, buttonAppliances, buttonUstensiles];
const inputElements = [ingredientFilterInput, applianceFilterInput, ustensileFilterInput];
const chevronDowns = [chevronDownIng, chevronDownAppl, chevronDownUst];

// FONCTION POUR L'OUVERTURE ET FERMETURE DES FILTRES //

function displayFiltersContent(filterIndex) {
  filters.forEach((filter, index) => {
    const button = buttons[index];
    const input = inputElements[index];
    const chevronDown = chevronDowns[index];

    if (index === filterIndex) {
      if (filter.style.display === "block") {
        filter.style.display = "none";
        button.style.borderRadius = "15px 15px 15px 15px"; 
        chevronDown.classList.remove("rotate"); 
      } else {
        filter.style.display = "block";
        button.style.borderRadius = "15px 15px 0px 0px";
        input.value = "";
        chevronDown.classList.add("rotate");
      }
    } else {
      filter.style.display = "none";
      button.style.borderRadius = "15px 15px 15px 15px";
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

export function displayItemsInFilter(item, importContainer) {
  const itemElement = document.createElement("span");
  itemElement.textContent = item;
  itemElement.classList.add("items-in-filter");

  importContainer.appendChild(itemElement);

  // Gestion du survol sur fond jaune
  itemElement.addEventListener("mouseover", () => {
    itemElement.style.backgroundColor = "#FFD15B";
  });

  itemElement.addEventListener("mouseout", () => {
    itemElement.style.backgroundColor = "transparent";
  });
}

// FONCTION POUR FILTRER LES NOMS DES INGREDIENTS EN FONCTION DE CE QU'ECRIT L'UTILISATEUR DANS LA BARRE DE RECHERCHE
export function filterIngredientsFromInput() {
  const ingredientFilterInput = document.getElementById("search-ingredient"); 
  const ingredientItems = document.querySelectorAll(".items-in-filter");

  ingredientFilterInput.addEventListener("input", (event) => {
    const filterText = removeAccents(event.target.value.toLowerCase()); // ici, le texte qu'on écrit dans l'input sans accent
    // Si aucune valeur dans la barre de recherche du filtre
    if (event.target.value === "") {
      closeIngredients.style.display = "none";
    } else {
      closeIngredients.style.display = "block";
    }
    // Pour chaque items dans les filtres
    ingredientItems.forEach((ingredientItem) => {
      setTimeout(function () {
        const ingredientName = removeAccents(ingredientItem.textContent.toLowerCase()); // ici, l'ingrédient dans la liste sans accent en minuscules
        if (ingredientName.includes(filterText)) {                   // Si ce qu'écrit l'utilisateur correspond au nom d'un item
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
  const applianceFilterInput = document.getElementById("search-appliance"); 
  const items = document.querySelectorAll(".items-in-filter");

  applianceFilterInput.addEventListener("input", (event) => {
    const filterText = removeAccents(event.target.value.toLowerCase()); // ici, le texte qu'on écrit dans l'input sans accent

    if (event.target.value === "") {
      closeAppliances.style.display = "none";
    } else {
      closeAppliances.style.display = "block";
    }

    items.forEach((item) => {
     
      setTimeout(function () {
        const applianceName = removeAccents(item.textContent.toLowerCase()); // ici, l'appareil dans la liste sans accent en minuscules
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
  const ustensileFilterInput = document.getElementById("search-ustensile"); 
  const items = document.querySelectorAll(".items-in-filter");

  ustensileFilterInput.addEventListener("input", (event) => {
    const filterText = removeAccents(event.target.value.toLowerCase()); // ici, le texte qu'on écrit dans l'input sans accent

    if (event.target.value === "") {
      closeUstensiles.style.display = "none";
    } else {
      closeUstensiles.style.display = "block";
    }
    items.forEach((item) => {
      setTimeout(function () {
        const ustensileName = removeAccents(item.textContent.toLowerCase()); // ici, l'ustensile dans la liste sans accent en minuscules
        if (ustensileName.includes(filterText)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }, 300);
    });
  });
}


// FONCTION POUR NORMALISER LES CARACTERES RECHERCHÉS DANS L'INPUT SANS ACCENTS
export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fonction générique pour permettre le filtre à partir du texte dans la barre de recherche des filtres
export function filterItemsFromSearchInFilters () {
  filterIngredientsFromInput();
  filterAppliancesFromInput();
  filterUstensilesFromInput();
}

filterItemsFromSearchInFilters()

// Gestion de la disparition de la croix dans la barre de recherche des filtres //
closeIngredients.addEventListener("click", function () {
  ingredientFilterInput.value = "";
  closeIngredients.style.display = "none";
});

closeAppliances.addEventListener("click", function () {
  applianceFilterInput.value = "";
  closeAppliances.style.display = "none";
});

closeUstensiles.addEventListener("click", function () {
  ustensileFilterInput.value = "";
  closeUstensiles.style.display = "none";
});