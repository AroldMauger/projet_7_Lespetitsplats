import { recipes } from "./recipes.js"

// OUVERTURE - FERMETURE DU FILTRE INGREDIENTS//
const searchIngredientFilter = document.querySelector(".search-ingredient-in-filter");
const buttonIngredients = document.querySelector(".ingredient-button");
const chevronDown = document.querySelector(".bi-chevron-down");

buttonIngredients.addEventListener("click", function (){
    if(searchIngredientFilter.style.display === "none") {
        searchIngredientFilter.style.display = "block";
        chevronDown.classList.add("rotate");   
    } else {
        searchIngredientFilter.style.display = "none";
        chevronDown.classList.remove("rotate");  
    }
                    
});

// AFFICHAGE DE TOUS LES INGREDIENTS A LA SUITE
const listUniqueIngredients = new Set();

recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredientList) => {
    listUniqueIngredients.add(ingredientList.ingredient);
  });
});

const uniqueIngredientsArray = Array.from(listUniqueIngredients);
const allIngredientsText = uniqueIngredientsArray.join('<br>');
const allIngredientsList = document.querySelector(".import-ingredients");
allIngredientsList.innerHTML = allIngredientsText;




// OUVERTURE - FERMETURE DU FILTRE APPAREILS//
const searchApplianceFilter = document.querySelector(".search-appliance-in-filter");
const buttonAppliances = document.querySelector(".appliance-button");
const chevronDownAppliance = document.querySelector(".appliance-chevron");

buttonAppliances.addEventListener("click", function (){
    if(searchApplianceFilter.style.display === "none") {
        searchApplianceFilter.style.display = "block";
        chevronDownAppliance.classList.add("rotate");   
    } else {
        searchApplianceFilter.style.display = "none";
        chevronDownAppliance.classList.remove("rotate");  
    }
                    
});


// AFFICHAGE DE TOUS LES APPAREILS A LA SUITE
const listUniqueAppliances = new Set();

recipes.forEach((recipe) => {
    listUniqueAppliances.add(recipe.appliance);
  });

const uniqueAppliancesArray = Array.from(listUniqueAppliances);
const allAppliancesText = uniqueAppliancesArray.join('<br>');
const allAppliancesList = document.querySelector(".import-appliances");
allAppliancesList.innerHTML = allAppliancesText;
