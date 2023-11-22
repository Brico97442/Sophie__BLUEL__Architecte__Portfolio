import { displayCategories, getCategories } from "./category.js";

import { getWorks, displayWorks, } from "./utils.js";

import { displayAdminPanel } from "./login.js";

import { openModal, } from "./modal.js";

//Afficher le AdminPanel si le token est présent dans le local storage 
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken");

  if (token) {
    displayAdminPanel();
  }
   
});


//déconnecter l'utilisateur et réafficher les filtres  
const loginBtn = document.getElementById("loginBtn");
const filters = document.getElementById("filters");

loginBtn.addEventListener("click", async () => {
  
  localStorage.removeItem("userToken");
  
  filters.style.visibility = "visible";
  
  const userConnected = document.querySelector(".user__connected");
  userConnected.remove();
});

const works = await getWorks();
displayWorks(works);

const categories = await getCategories();
await displayCategories(categories); 


//Ouvrir la modal
const editBtn = document.getElementById("editBtn");
editBtn.addEventListener ("click", () => {
openModal()
});




 