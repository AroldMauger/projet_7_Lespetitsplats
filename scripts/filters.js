import { recipes } from "./recipes.js"

// OUVERTURE - FERMETURE DU FILTRE INGREDIENTS//
const searchIngredientFilter = document.querySelector(".search-in-filter");
const buttonIngredients = document.querySelector(".ingredient-button");
const chevronDown = document.querySelector(".bi-chevron-down");
const ingredientFilterInput = document.getElementById('search-ingredient');     // ici on vise l'input dans le HTML
const closeButtonInSearch = document.querySelector(".close-in-search");
const allIngredientsList = document.querySelector(".import-ingredients");

buttonIngredients.addEventListener("click", function (){
    if(searchIngredientFilter.style.display === "none") {
        searchIngredientFilter.style.display = "block";
        buttonIngredients.style.borderRadius  = "15px 15px 0px 0px";
        chevronDown.classList.add("rotate");  
        allIngredientsList.innerHTML = "";
        displayAllIngredients()
    } else {
        searchIngredientFilter.style.display = "none";
        chevronDown.classList.remove("rotate");  
        buttonIngredients.style.borderRadius  = "15px 15px 15px 15px";
        ingredientFilterInput.value = "";
        closeButtonInSearch.style.display = "none";
    }
                    
});

// AFFICHAGE DE TOUS LES INGREDIENTS A LA SUITE
function displayAllIngredients () {
const listUniqueIngredients = new Set();

recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredientList) => {
    listUniqueIngredients.add(ingredientList.ingredient);
  });
});

const uniqueIngredientsArray = Array.from(listUniqueIngredients);

uniqueIngredientsArray.forEach((ingredient) => {
  const ingredientElement = document.createElement('span');
  ingredientElement.textContent = ingredient;
  ingredientElement.classList.add('items-in-filter');

  allIngredientsList.appendChild(ingredientElement);

  ingredientElement.addEventListener('mouseover', () => {   // GESTION DU SURVOL ET FOND JAUNE
    ingredientElement.style.backgroundColor = '#FFD15B';
  });

  ingredientElement.addEventListener('mouseout', () => {
    ingredientElement.style.backgroundColor = 'transparent';
  });

  ingredientElement.addEventListener('click', () => {
    searchIngredientFilter.style.display = "none";
    chevronDown.classList.remove("rotate");  
    buttonIngredients.style.borderRadius  = "15px 15px 15px 15px";

    const allTagsContainer = document.querySelector(".all-tags-container");
    const tagContainer = document.createElement("div");
    tagContainer.classList.add("tag");

    const tagIngredient = document.createElement("span");
    tagIngredient.textContent = ingredient;
    const closeTagIngredient = document.createElement("span");
    closeTagIngredient.classList.add("bi-x-lg");
    closeTagIngredient.classList.add("close-tag-button");
    closeTagIngredient.addEventListener("click", function(){
    tagContainer.style.display ="none";
    })

    tagContainer.appendChild(tagIngredient)
    tagContainer.appendChild(closeTagIngredient)
    allTagsContainer.appendChild(tagContainer)
});

});
filterIngredientsFromInput()

}

// FONCTION POUR FILTRER LES NOMS DES INGREDIENTS EN FONCTION DE CE QU'ECRIT L'UTILISATEUR DANS LA BARRE DE RECHERCHE
function filterIngredientsFromInput () {
  const ingredientFilterInput = document.getElementById('search-ingredient');     // ici on vise l'input dans le HTML
  const ingredientItems = document.querySelectorAll('.items-in-filter');

  ingredientFilterInput.addEventListener('input', (event) => {
    const filterText = removeAccents(event.target.value.toLowerCase());           // ici, le texte qu'on écrit dans l'input sans accent
                                                                                // ToLowerCase() nous permet de comparer l'input et les ingrédients avec la même casse
    ingredientItems.forEach((ingredientItem) => { 
      ingredientItem.addEventListener("click", function() {                   // permet de supprimer le texte dans la barre de recherche 
        event.target.value = "";   
        closeButtonInSearch.style.display = "none";

      })
      const ingredientName = removeAccents(ingredientItem.textContent.toLowerCase()); // ici, l'ingrédient dans la liste sans accent
      if (ingredientName.includes(filterText)) {
        ingredientItem.style.display = 'block'; 
      } else {
        ingredientItem.style.display = 'none'; 
      }
    });
  });

}

// FONCTION POUR FAIRE APPARAITRE LA CROIX DANS LA BARRE DE RECHERCHE
function displayCloseButtonInSearchBar (event) {

  if(event.target.value === "") {                                              
    closeButtonInSearch.style.display = 'none';
  } else {
    closeButtonInSearch.style.display = 'block'; 
  }
  closeButtonInSearch.addEventListener("click", function (e){
    ingredientFilterInput.value = "";
    allIngredientsList.innerHTML = "";
    displayAllIngredients()
  })

}

ingredientFilterInput.addEventListener('input', displayCloseButtonInSearchBar);

// FONCTION POUR NORMALISER LES CARACTERES RECHERCHÉS DANS L'INPUT SANS ACCENTS
function removeAccents(str) {
    return str
      .normalize("NFD") 
      .replace(/[\u0300-\u036f]/g, ""); 
  }

/*
// AFFICHAGE DE TOUS LES APPAREILS A LA SUITE
const listUniqueAppliances = new Set();

recipes.forEach((recipe) => {
    listUniqueAppliances.add(recipe.appliance);
  });

const uniqueAppliancesArray = Array.from(listUniqueAppliances);
const allAppliancesText = uniqueAppliancesArray.join('<br>');
const allAppliancesList = document.querySelector(".import-appliances");
allAppliancesList.innerHTML = allAppliancesText;
*/