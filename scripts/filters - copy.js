import { recipes } from "./recipes.js"

// OUVERTURE - FERMETURE DU FILTRE INGREDIENTS//
const buttons = document.querySelectorAll(".buttons");
const buttonIngredients = document.querySelector(".ingredient-button");
const buttonAppliances = document.querySelector(".appliance-button");
const buttonUstensiles = document.querySelector(".ustensiles-button");
const ingredients = document.querySelector(".ingredients")
const appliances = document.querySelector(".appliances")
const ustensiles = document.querySelector(".ustensiles")

//GESTION DE L'OUVERTURE, FERMETURE ET APPARITION DE LA CROIX DES FILTRES //
buttons.forEach(button => {
  const container = button.parentElement;
  const filterContainer = container.querySelector(".search-in-filter");
  const chevronDown = container.querySelector(".bi-chevron-down");
  const closeButtonInSearch = container.querySelectorAll(".close-in-search");
  const filterContent = container.querySelector(".import");

  // Apparition de la croix dans la barre de recherche
  const filterInput = container.querySelector('.input-search-filter'); 
  filterInput.addEventListener('input', function(event) {
      if(event.target.value === "") {                                              
        closeButtonInSearch.style.display = 'none';
      } else {
        closeButtonInSearch.style.display = 'block'; 
      }
    })



  // Faire apparaître la barre de recherche et le contenu du filtre
  button.addEventListener("click", function (){
    if(filterContainer.style.display === "none") {
        chevronDown.classList.add("rotate");  
        button.style.borderRadius = "15px 15px 0px 0px"

    } else {
      filterContainer.style.display === "none";
        chevronDown.classList.remove("rotate");  
        filterInput.value = "";
        closeButtonInSearch.style.display = "none";
        button.style.borderRadius = "15px 15px 15px 15px"

    }           
  });
})

buttonIngredients.addEventListener("click", function(){
  if (ingredients.style.display === "none") {
    ingredients.style.display = "block";
    displayAllIngredients();

    // Suppression du texte de l'input quand on clique sur la croix
    closeButtonInSearch.addEventListener("click", function (){
      filterInput.value = "";
      closeButtonInSearch.style.display = 'none';
      filterContent.innerHTML = "";
      displayAllIngredients();

    })

  } else {
    ingredients.style.display = "none"
  }
})
buttonAppliances.addEventListener("click", function(){
  if (appliances.style.display === "none") {
  appliances.style.display = "block";
  displayAllAppliances();

  } else {
    appliances.style.display = "none"
  }
})
buttonUstensiles.addEventListener("click", function(){
  if (ustensiles.style.display === "none") {
  ustensiles.style.display = "block";
  displayAllUstensiles();

  } else {
    ustensiles.style.display = "none";
  }
})




// AFFICHAGE DE TOUS LES INGREDIENTS A LA SUITE
function displayAllIngredients () {
      
    const listUniqueIngredients = new Set();

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredientList) => {
        listUniqueIngredients.add(ingredientList.ingredient.toLowerCase());
      });
    });
    const importContainer = document.querySelector(".import-ingredients");
    const uniqueIngredientsArray = Array.from(listUniqueIngredients); // Le tableau avec la liste de tous les ingrédients

    uniqueIngredientsArray.forEach((item) => {
    displayItemsInFilter(item, importContainer)
    });

  filterIngredientsFromInput()
}

// AFFICHAGE DE TOUS LES APPAREILS A LA SUITE
function displayAllAppliances () {
      
  const listUniqueAppliances = new Set();

  recipes.forEach((recipe) => {
    listUniqueAppliances.add(recipe.appliance.toLowerCase()); 
    });

  const importContainer = document.querySelector(".import-appliances");
  const uniqueAppliancesArray = Array.from(listUniqueAppliances); // Le tableau avec la liste de tous les appareils

  uniqueAppliancesArray.forEach((item) => {
  displayItemsInFilter(item, importContainer)
  });

filterIngredientsFromInput()
}

// AFFICHAGE DE TOUS LES USTENSILES A LA SUITE
function displayAllUstensiles() {
  const listUniqueUstensiles = new Set();

  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      listUniqueUstensiles.add(ustensil.toLowerCase()); 
    });
  });
  const importContainer = document.querySelector(".import-ustensiles");
  const uniqueUstensilesArray = Array.from(listUniqueUstensiles);

  uniqueUstensilesArray.forEach((item) => {
    displayItemsInFilter(item, importContainer);
  });

  filterIngredientsFromInput();
}



function displayItemsInFilter (item, importContainer) {

    const itemElement = document.createElement('span');
    itemElement.textContent = item;
    itemElement.classList.add('items-in-filter');

    importContainer.appendChild(itemElement);

    itemElement.addEventListener('mouseover', () => {   // GESTION DU SURVOL ET FOND JAUNE
      itemElement.style.backgroundColor = '#FFD15B';
    });
  
    itemElement.addEventListener('mouseout', () => {
      itemElement.style.backgroundColor = 'transparent';
    });
  
    // CREATION D'UN TAG AU CLIC SUR UN INGREDIENT
    itemElement.addEventListener('click', () => {
    
      const allFilters = document.querySelectorAll(".search-in-filter");
      allFilters.forEach((filter) => {
        filter.style.display = "none";
      })

        const allTagsContainer = document.querySelector(".all-tags-container");
        const tagContainer = document.createElement("div");
        tagContainer.classList.add("tag");
  
        const tagName = document.createElement("span");
        tagName.textContent = item;
  
        
        const closeTag= document.createElement("span");
        closeTag.classList.add("bi-x-lg");
        closeTag.classList.add("close-tag-button");
        closeTag.addEventListener("click", function(){
  
         
        tagContainer.style.display = "none";
  
        })
  
        tagContainer.appendChild(tagName)
        tagContainer.appendChild(closeTag)
        allTagsContainer.appendChild(tagContainer)
  
      });
  }

 



// FONCTION POUR FILTRER LES NOMS DES INGREDIENTS EN FONCTION DE CE QU'ECRIT L'UTILISATEUR DANS LA BARRE DE RECHERCHE
function filterIngredientsFromInput () {
  const filterInput = document.querySelector('.input-search-filter');     // ici on vise l'input dans le HTML
  const ingredientItems = document.querySelectorAll('.items-in-filter');

  filterInput.addEventListener('input', (event) => {
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