import { displayCategories, getCategories } from "./category.js";

import { getWorks, displayWorks, } from "./utils.js";

import { displayAdminPanel } from "./login.js";

import {  openModal, } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("userToken");

  if (token) {
    displayAdminPanel();
  }
   
});

const loginBtn = document.getElementById("login__btn");
const filters = document.getElementById("filters");



loginBtn.addEventListener("click", async () => {
  localStorage.removeItem("userToken");
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

const editBtn = document.getElementById("editBtn");
editBtn.addEventListener ("click", () => {
openModal()
});




