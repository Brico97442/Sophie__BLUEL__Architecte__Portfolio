import { displayCategories, getCategories } from "./category.js";

import { getWorks, displayWorks } from "./utils.js";

import { displayAdminPanel } from "./login.js";

import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken");

  if (token) {
    displayAdminPanel();
  }
});

const loginBtn = document.getElementById("login__btn");
const logoutBtn = document.getElementById("logout__btn");
const filters = document.getElementById("filters");

logoutBtn.addEventListener("click", async () => {
  localStorage.removeItem("userToken");
  logoutBtn.style.display = "none";
  loginBtn.style.display = "block";
  editBtn.style.display = "none";
  filters.style.visibility = "visible";
  const userConnected = document.querySelector(".user__connected");
  userConnected.remove();
});

const works = await getWorks();
displayWorks(works);

const categories = await getCategories();
await displayCategories(categories);

const editBtn = document.querySelector(".editBtn");
// Ajouter un écouteur d'événements pour le clic sur Edit bouton et ouverture de la fenêtre modale
editBtn.addEventListener ("click", () => {
  openModal();
});
