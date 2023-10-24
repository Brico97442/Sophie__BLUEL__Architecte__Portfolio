import { loginRequest, userConnected, } from "./utils.js";

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

// Ajouter un écouteur d'événements pour le clic sur Edit bouton et ouverture de la fenêtre modale
editBtn.addEventListener("click", () => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modale__container");

  const body = document.querySelector("body");
  body.appendChild(modalContainer);

  //création de la modale
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal");
  modalContent.style.opacity = "1";
  modalContainer.appendChild(modalContent);

  //Ajout de la galerie des travaux dasns la fenêtre modal
  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modal__gallery");

  // Ajout du titre de la fenêtre modale
  const modalTittle = document.createElement("h3");
  modalContent.appendChild(modalTittle);
  modalTittle.innerHTML = "Galerie photo";
  modalContent.appendChild(modalGallery);

  //Ajout de la barre de séparation de la fenêtre modal
  const hr = document.createElement("hr");
  modalContent.appendChild(hr);

  //Ajout du bouton Submit de la fenêtre modale
  const addPicture = document.createElement("input");
  addPicture.type = "submit";
  addPicture.value = "Ajouter une photo";
  modalContent.appendChild(addPicture);

  //Ajout du bouton close pour fermer la modale
  const closeModal = document.createElement("button");
  modalContent.appendChild(closeModal);
  closeModal.classList.add("btn__closemodal");

  //Ajout Icone x-mark pour la fermeture de la modale
  const closeModalicons = document.createElement("i");
  closeModalicons.classList.add("fas", "fa-xmark");
  closeModal.appendChild(closeModalicons);

  // Ajouter un écouteur d'événements pour la fermeture de la modale au click
  closeModal.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
  
  //  modalContent.addEventListener("mouseleave", () => {
  //  modalContainer.style.display = "none";
  //  });

  
  // Ajouter d'une fonctions pour récuper les travaux existant 
  const modalWorks = async (worksToDisplay) => {
   
    // Effacer le contenu actuel de la galerie
    modalGallery.innerHTML = "";

    //Boucle pour récupérer les travaux
    for (let i = 0; i < worksToDisplay.length; i++) {
      
      const picturesElement = document.createElement("figure");
      const img = document.createElement("img");
      img.src = worksToDisplay[i].imageUrl;
      img.alt = worksToDisplay[i].title;
      
      //Ajout du bouton corbeille (suprimer) à chaque élément de la boucle 
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete__btn");
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-can");
      
      deleteBtn.appendChild(deleteIcon);
      picturesElement.append(img, deleteBtn);
      modalGallery.appendChild(picturesElement);
      picturesElement.style.position = "relative";
      
    }
  };
  
  //Appel de la fonction pour afficher les travaux dans la galerie modal 
  modalWorks(works);
});
