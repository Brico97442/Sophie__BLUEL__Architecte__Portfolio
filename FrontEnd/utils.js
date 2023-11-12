//Requête fetch pour récupérer la réponse de l'api works
import { getCategories } from "./category.js";

export const getWorks = async () => {
  const worksApi = await fetch("http://localhost:5678/api/works");
  const works = await worksApi.json();
  return works;
};

// Fonction pour afficher les œuvres dans la galerie

const galleryElement = document.querySelector(".gallery");
export const displayWorks = async (worksToDisplay) => {
  // Effacer le contenu actuel de la galerie
  galleryElement.innerHTML = "";
  for (let i = 0; i < worksToDisplay.length; i++) {
    const picturesElement = document.createElement("figure");
    const img = document.createElement("img");
    img.id = "work__img";
    const figCaption = document.createElement("figcaption");

    img.src = worksToDisplay[i].imageUrl;
    img.alt = worksToDisplay[i].title;
    figCaption.innerHTML = worksToDisplay[i].title;

    picturesElement.append(img, figCaption);
    galleryElement.appendChild(picturesElement);
  }
};

// Fonction pour mettre à jour l'affichage en fonction de la catégorie
export const updateDisplay = async (categoryId) => {
  const works = await getWorks();
  const worksToDisplay = categoryId
    ? works.filter((picture) => picture.categoryId === categoryId)
    : works;
  displayWorks(worksToDisplay);
};

export const createModalContainer = () => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container");
  const body = document.querySelector("body");
  body.appendChild(modalContainer);
};

export const createModal = () => {
  const modalContainer = document.querySelector(".modal__container");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modalContainer.appendChild(modal);

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
};

export const createModalTitle = () => {
  const modal = document.querySelector(".modal");
  const modalTittle = document.createElement("h3");
  modal.appendChild(modalTittle);
  modalTittle.innerHTML = "Galerie photo";
  modal.appendChild(modalTittle);
};

// Ajout de la galerie des travaux dans la fenêtre modal
export const createModalGallery = (works) => {
  const modal = document.querySelector(".modal");
  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modal__gallery");
  modal.appendChild(modalGallery);
  displayModalWorks(works);
};

export const displayModalWorks = async (worksToDisplay) => {
  const modalGallery = document.querySelector(".modal__gallery");
  for (let i = 0; i < worksToDisplay.length; i++) {
    const picturesElement = document.createElement("figure");
    picturesElement.id = "picturesElement";
    const img = document.createElement("img");
    img.src = worksToDisplay[i].imageUrl;
    img.alt = worksToDisplay[i].title;
    modalGallery.appendChild(picturesElement);
    picturesElement.append(img);

    createButonTrash(picturesElement);
  }
};

const createButonTrash = (picturesElement) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete__btn");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-can");

  picturesElement.appendChild(deleteBtn);
  deleteBtn.appendChild(deleteIcon);
};

export const createButonAddPicture = () => {
  const btnAddpicture = document.createElement("button");
  btnAddpicture.id = "btnAddPicture";
  btnAddpicture.innerHTML = "Ajouter une photo";
  btnAddpicture.type = "submit";
  const modal = document.querySelector(".modal");
  modal.appendChild(btnAddpicture);
};

export const createBtnValid = () => {
  const btnValid = document.createElement("buttton");
  btnValid.innerText = "Valider";
  btnValid.id = "btnValid";
  btnValid.classList.add("hidden")
  const modal = document.querySelector(".modal");
  modal.appendChild(btnValid);
};

export const createButonReturn = () => {
  //  Ajout du bouton retour pour fermer la modale
  const returnBtn = document.createElement("button");
  const modal = document.querySelector(".modal");
  modal.appendChild(returnBtn);
  returnBtn.classList.add("btn__return");
  returnBtn.classList.add("hidden")
  // Ajout Icone left-Arrow pour la fermeture de la modale
  const returnIcons = document.createElement("i");
  returnIcons.classList.add("fas", "fa-arrow-left");
  returnBtn.appendChild(returnIcons);
};

export const createButonCloseModal = () => {
  //Ajout du bouton close pour fermer la modale
  const closeModal = document.createElement("button");
  const modal = document.querySelector(".modal");
  modal.appendChild(closeModal);
  closeModal.classList.add("btn__closemodal");

  //Ajout Icone x-mark pour la fermeture de la modale
  const closeModalicons = document.createElement("i");
  closeModalicons.classList.add("fas", "fa-xmark");
  closeModal.appendChild(closeModalicons);
};

export const createModalAddWorkForm = () => {
  const modal = document.querySelector(".modal");
  const modalAddwork = document.createElement("div");
  modalAddwork.classList.add("modal__addwork");
  modal.appendChild(modalAddwork);
};

export const createAddPictureContainer = () => {
  const addPicturecontainer = document.createElement("div");
  addPicturecontainer.classList.add("add__picture__container");
  const modalAddwork = document.querySelector(".modal__addwork");
  modalAddwork.appendChild(addPicturecontainer);
};

export const createHrElement = () => {
  const modal = document.querySelector(".modal");
  const hr = document.createElement("hr");
  modal.appendChild(hr);
};

// Ajout d'une zone preview pour l'aperçu de notre intput file

export const createPreviewZoneImg = () => {
  const preview = document.createElement("img");
  preview.id = "preview";
  preview.classList.add("hidden");

  const addPicturecontainer = document.querySelector(
    ".add__picture__container"
  );
  addPicturecontainer.appendChild(preview);
};

export const createButtonAddPictureLabel = () => {
  const addPicturelabel = document.createElement("label");
  addPicturelabel.innerText = "+ Ajouter photo";
  addPicturelabel.id = "addPicturelabel";

  const addPictureicon = document.createElement("i");
  addPictureicon.id = "addPictureicon";
  addPictureicon.classList.add("far", "fa-image", "fa-5x");

  const addWork = document.createElement("input");
  addWork.id = "addWork";
  addWork.type = "file";
  addWork.accept = ".jpg,.png";

  const addWorkText = document.createElement("p");
  addWorkText.id = "addWorkText";
  addWorkText.innerText = "jpg, png : 4mo max";

  const addPicturecontainer = document.querySelector(
    ".add__picture__container"
  );
  addPicturecontainer.append(addPictureicon, addPicturelabel, addWorkText);
  addPicturelabel.appendChild(addWork);

  previewImg();
  addWork.addEventListener("change", previewImg);
};

const previewImg = () => {
  const files = addWork.files;
  if (files.length > 0) {
    
    const ImgReader = new FileReader();

    ImgReader.onload = function (event) {
      document
        .getElementById("preview")
        .setAttribute("src", event.target.result);

      const preview = document.getElementById("preview");
      preview.classList.remove("hidden");

      const addPicturelabel = document.getElementById("addPicturelabel");
      addPicturelabel.remove();

      const addPictureicon = document.getElementById("addPictureicon");
      addPictureicon.remove();

      const addWorkText = document.getElementById("addWorkText");
      addWorkText.remove()
    };

    ImgReader.readAsDataURL(files[0]);
  }
};

export const createLabelTitle = () => {
  const labelTitle = document.createElement("label");
  labelTitle.id = "label__title";
  labelTitle.innerText = "Titre";
  const modalAddwork = document.querySelector(".modal__addwork");
  modalAddwork.appendChild(labelTitle);
};

export const createInputTitle = () => {
  const inputTitle = document.createElement("input");
  inputTitle.type = "Text";
  inputTitle.classList.add("input__title");
  const modalAddwork = document.querySelector(".modal__addwork");
  modalAddwork.appendChild(inputTitle);
};

export const createLabelSelect = async () => {
  const labelSelect = document.createElement("label");
  labelSelect.id = "label__select";
  labelSelect.innerText = "Catégorie";

  const selectCategories = document.createElement("select");
  selectCategories.id = "select__categories";

  // Récupérer les catégories via la fonction getCategories
  const categories = await getCategories(); // Attendre la résolution de la promesse

  // selectCategories.innerHTML = "";
  selectCategories.add(new Option(""));

  categories.forEach((category) => {
    selectCategories.add(new Option(category.name, category.id));
  });

  const modalAddwork = document.querySelector(".modal__addwork");
  modalAddwork.append(labelSelect, selectCategories);
};
