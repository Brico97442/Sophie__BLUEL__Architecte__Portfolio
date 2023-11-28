import { displayCategories, getCategories } from "./category.js";

import { getWorks, displayWorks, getStoredCategories, } from "./utils.js";

import { displayAdminPanel } from "./login.js";

import { openModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("userToken");

  const categories = await getCategories();
  localStorage.setItem("categories", JSON.stringify(categories));

  if (token) {
    displayAdminPanel();
  }

  const storedCategories = getStoredCategories();
  displayCategories(storedCategories);

  const works = await getWorks();
  displayWorks(works);

  const editBtn = document.getElementById("editBtn");
  editBtn.addEventListener("click", () => {
    openModal();
  });
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


