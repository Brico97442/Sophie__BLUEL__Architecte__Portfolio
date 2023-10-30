import { categoriesRequest,  } from "./category.js";

import { loginRequest, userConnected } from "./login.js";

import { getWorks, displayWorks, updateDisplay } from "./utils.js";

import { openModal} from "./modal.js"

document.addEventListener("DOMContentLoaded", () => {
  userConnected();
});

const form = document.getElementById("login__form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginRequest();
});

const logoutBtn = document.getElementById("logout__btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    window.location.href = "login.html";
  });
}

// Code pour récupérer les travaux du BackEnd
const works = await getWorks();
displayWorks(works);

// Fonction pour mettre à jour l'affichage en fonction de la catégorie
updateDisplay();

// Code pour afficher tous les objets par défaut
await updateDisplay(null);

// Récupération de la fonction categories request pour récuperer
await categoriesRequest();

const editBtn = document.querySelector(".editBtn");
// Ajouter un écouteur d'événements pour le clic sur Edit bouton et ouverture de la fenêtre modale
editBtn.addEventListener("click", () => {
  openModal()
});
