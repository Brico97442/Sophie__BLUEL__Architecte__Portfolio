import { loginRequest, updateLogoutButton } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const userToken = localStorage.getItem("userToken");
  const logoutBtn = document.getElementById("logout__btn");

  if (userToken) {
    updateLogoutButton();
  } else {
    logoutBtn.style.display = "none";
  }
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
const worksApi = await fetch("http://localhost:5678/api/works");
const works = await worksApi.json();

// Fonction pour afficher les œuvres dans la galerie
const galleryElement = document.querySelector(".gallery");
const displayWorks = async (worksToDisplay) => {
  // Effacer le contenu actuel de la galerie
  galleryElement.innerHTML = "";

  for (let i = 0; i < worksToDisplay.length; i++) {
    const picturesElement = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.src = worksToDisplay[i].imageUrl;
    img.alt = worksToDisplay[i].title;
    figCaption.innerHTML = worksToDisplay[i].title;

    picturesElement.append(img, figCaption);
    galleryElement.appendChild(picturesElement);
  }
};

// Fonction pour mettre à jour l'affichage en fonction de la catégorie
const updateDisplay = async (categoryId) => {
  const worksToDisplay = categoryId
    ? works.filter((picture) => picture.categoryId === categoryId)
    : works;
  await displayWorks(worksToDisplay);
};

// Code pour afficher tous les objets par défaut
await updateDisplay(null);

// Code pour récupérer les catégories du BackEnd
const categoriesApi = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesApi.json();

// Ajout de la catégorie "Tous" dans l'API catégories
categories.unshift({ name: "Tous", categoryId: null });
const filtersElement = document.getElementById("filters");
const categoriesContainer = document.createElement("ul");
categoriesContainer.classList.add("center__row", "gap");

// Boucle pour création et affichages des boutons catégories
for (let i = 0; i < categories.length; i++) {
  const categoryLi = document.createElement("li");
  const categoryBtn = document.createElement("button");
  const categoryId = categories[i].id;
  categoryBtn.innerHTML = categories[i].name;

  categoryLi.appendChild(categoryBtn);
  categoriesContainer.appendChild(categoryLi);
  filtersElement.appendChild(categoriesContainer);

  // Application du style sur les boutons catégories
  categoryBtn.classList.add("btn__style");

  // Ajouter un écouteur d'événements pour le clic sur chaque bouton de catégorie
  categoryLi.addEventListener("click", () => {
    updateDisplay(categoryId);
  });
}

const editBtn = document.querySelector(".editBtn");
editBtn.addEventListener("click", () => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modale__container");

  const body = document.querySelector("body");
  body.appendChild(modalContainer);

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal");
  modalContent.style.opacity = "1";
  modalContainer.appendChild(modalContent);

  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modal__gallery");
  
  const modalTittle = document.createElement("h3");
  modalContent.appendChild(modalTittle);
 
  modalTittle.innerHTML = "Galerie photo";
  modalContent.appendChild(modalGallery);
  
  const hr = document.createElement("hr");
 
  modalContent.appendChild(hr);
  const modalSubmit = document.createElement("input");
  
  modalSubmit.type = "submit";
  modalSubmit.value = "Ajouter une photo";
  modalContent.appendChild(modalSubmit);

  const modalWorks = async (worksToDisplay) => {
    // Effacer le contenu actuel de la galerie
    modalGallery.innerHTML = "";

    for (let i = 0; i < worksToDisplay.length; i++) {
      
      const picturesElement = document.createElement("figure");
      
      const img = document.createElement("img");
      const deleteBtn = document.createElement("button")
      deleteBtn.classList.add ("delete__btn")
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-can")
      deleteBtn.appendChild(deleteIcon)
      picturesElement.append(img, deleteBtn);
      picturesElement.style.position = "relative";

      img.src = worksToDisplay[i].imageUrl;
      img.alt = worksToDisplay[i].title;

      modalGallery.appendChild(picturesElement);
    }
  };
  modalWorks(works);
});
