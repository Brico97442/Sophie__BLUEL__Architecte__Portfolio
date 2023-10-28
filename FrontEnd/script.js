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
  modalContainer.classList.add("modal__container");

  const body = document.querySelector("body");
  body.appendChild(modalContainer);

  //Fermeture de la modale au clic à l'exterieur de la modal
  document.addEventListener(
    "click",
    function (event) {
      if (event.target.className === "modal__container") {
        modalContainer.remove();
      }
    },
    false
  );

  //création de la modale
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal");
  modalContent.style.opacity = "1";
  modalContainer.appendChild(modalContent);

  //Ajout de la galerie des travaux dans la fenêtre modal
  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modal__gallery");

  const modalAddwork = document.createElement("div");
  const addPicturecontainer = document.createElement("div");

  modalAddwork.classList.add("modal__addwork");
  addPicturecontainer.classList.add("add__picture__container");

  //Ajout d'une input pour pouvoir ajouter une nouvelle photo
  const addPicturelabel = document.createElement("label");
  addPicturelabel.innerText = "+ Ajouter photo";

  const addPictureicon = document.createElement("i");
  addPictureicon.classList.add("far", "fa-image", "fa-5x");
  addPicturelabel.id = "addpicture";

  const addWork = document.createElement("input");
  addWork.type = "file";
  addWork.accept = ".jpg,.png";

  const addPictureAccepted = document.createElement("p");
  addPictureAccepted.classList.add("add__picture__text");
  addPictureAccepted.innerText = "jpg, png : 4mo max";

  const labelTittle = document.createElement("label");
  labelTittle.id = ("label__tittle");
  labelTittle.innerText = "Titre";

  const inputTittle = document.createElement("input");
  inputTittle.type = "Text";
  inputTittle.id = ("input__tittle");

  const labelSelect = document.createElement("label");
  labelSelect.id = ("label__select")
  labelSelect.innerText = "Catégorie";
  
  const selectCategories = document.createElement("select");
  selectCategories.id = "select__categories";
  
  
  modalAddwork.append(
    addPicturecontainer,
    labelTittle,
    inputTittle,
    labelSelect,
    selectCategories
  );

  addPicturecontainer.append(
    addPictureicon,
    addPicturelabel,
    addPictureAccepted
  );

  //Ancrage de l'input file au label
  addPicturelabel.appendChild(addWork);

  //cacher la modaladdwork
  modalAddwork.style.display = "none";

  // Ajout du titre de la fenêtre modale
  const modalTittle = document.createElement("h3");
  modalContent.appendChild(modalTittle);
  modalTittle.innerHTML = "Galerie photo";

  //Ancrage de la div modal__gallery à la div modal
  modalContent.appendChild(modalGallery);

  //Ancrage de la div modal__addwork à la div modal
  modalContent.appendChild(modalAddwork);

  //Ajout de la barre de séparation de la fenêtre modal
  const hr = document.createElement("hr");
  modalContent.appendChild(hr);

  //Ajout du bouton "Ajouter" de la fenêtre modale
  const btnAddpicture = document.createElement("input");
  btnAddpicture.type = "submit";
  btnAddpicture.value = "Ajouter une photo";
  modalContent.appendChild(btnAddpicture);
  
  //Ajout du bouton valider l'ajout d'une nouvelle photo caché par défaut
  const btnValid = document.createElement("input");
  btnValid.id =("btn__valid");
  btnValid.type = "submit";
  btnValid.value = "Valider";
  modalContent.appendChild(btnValid);
  btnValid.style.display = "none";

  // Ajouter un addEventListener pour pouvoir ajouter un nouveau travail
  btnAddpicture.addEventListener("click", () => {
    
    //Changement tu titre de la modale;
    modalTittle.innerHTML = "Ajout photo";
    
    //Cacher le bouton Ajouter une photo au click sur le bouton ajouter une photo
    btnAddpicture.style.display = "none"
    
    //Cacher la gallerie au click sur le bouton ajouter
    modalGallery.style.display = "none";
    modalAddwork.style.display = "flex";
    
    //Aficher le bouton valider grisé au click sur le bouton ajouter la photo
    btnValid.style.display = "block";
    
    //Ajout du bouton retour pour fermer la modale
    const returnBtn = document.createElement("button");
    modalContent.appendChild(returnBtn);
    returnBtn.classList.add("btn__return");

    //Ajout Icone left-Arrow pour la fermeture de la modale
    const returnIcons = document.createElement("i");
    returnIcons.classList.add("fas", "fa-arrow-left");
    returnBtn.appendChild(returnIcons);

    // Ajouter un addEventListener pour pouvoir réafficher la gallerie au click
    returnBtn.addEventListener("click", () => {
      btnAddpicture.style.display = "block";
      btnValid.style.display = "none";
      returnBtn.style.display = "none";
      modalGallery.style.display = "grid";
      modalAddwork.style.display = "none";
    });
  });

  //Ajout du bouton close pour fermer la modale
  const closeModal = document.createElement("button");
  modalContent.appendChild(closeModal);
  closeModal.classList.add("btn__closemodal");

  //Ajout Icone x-mark pour la fermeture de la modale
  const closeModalicons = document.createElement("i");
  closeModalicons.classList.add("fas", "fa-xmark");
  closeModal.appendChild(closeModalicons);

  // Ajouter un écouteur d'événements pour la fermeture de la modale au click sur la croix
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
