import {
  categoriesRequest,
  displayWorks,
  loginRequest,
  updateDisplay,
  userConnected,
} from "./utils.js";



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
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modale__container");

  document.addEventListener('click', function (event) {
    if(event.target.className === 'modale__container'){
      modalContainer.remove() 
      console.log(event)   
    }
  }, false);
  
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
  const btnAddpicture = document.createElement("input");
  btnAddpicture.type = "submit";
  btnAddpicture.value = "Ajouter une photo";
  modalContent.appendChild(btnAddpicture);

  btnAddpicture.addEventListener("click", () => {});

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

      const workId = worksToDisplay[i].id;
      
      // EventListener au click sur la corbeille pour supprimer un travail
      deleteBtn.addEventListener("click", async () => {
      
        const userToken = localStorage.getItem("userToken");

        if (userToken) {
          const responseDelete = await fetch(
            `http://localhost:5678/api/works/${workId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(userToken).token}`, 
              },
            }
          );

          if (responseDelete.ok) {
            picturesElement.remove();
            await updateDisplay(null);
          } else {
            console.error("Échec de la suppression du travail.");
          }
        } 
      });
    }
  };
  //Appel de la fonction pour afficher les travaux dans la galerie modal
  modalWorks(works);
});
