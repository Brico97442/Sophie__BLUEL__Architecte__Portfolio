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
        document.body.classList.remove("modal-open");
      }
    },
    false
  );
};

export const createModalTitle = () => {
  const modal = document.querySelector(".modal");
  const modalTitle = document.createElement("h3");
  modalTitle.id = "modalTitle";
  modal.appendChild(modalTitle);
  modalTitle.innerHTML = "Galerie photo";
  modal.appendChild(modalTitle);
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
  const btnValid = document.createElement("button");
  btnValid.innerText = "Valider";
  btnValid.id = "btnValid";
  btnValid.classList.add("hidden");
  btnValid.classList.add("btn__valid--unchecked");
  btnValid.setAttribute("disabled", "disabled");
  const modal = document.querySelector(".modal");
  modal.appendChild(btnValid);
};

export const createButonTrash = (picturesElement) => {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete__btn");

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash-can");

  picturesElement.appendChild(deleteBtn);
  deleteBtn.appendChild(deleteIcon);
};

export const createButonReturn = () => {
  //  Ajout du bouton retour pour fermer la modale
  const returnBtn = document.createElement("button");
  const modal = document.querySelector(".modal");
  modal.appendChild(returnBtn);
  returnBtn.classList.add("btn__return");
  returnBtn.classList.add("hidden");
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

export const createModalAddWorkForm = () => {
  const modal = document.querySelector(".modal");
  const modalAddwork = document.createElement("div");
  modalAddwork.classList.add("modal__addwork");
  modalAddwork.classList.add("hidden");
  modal.appendChild(modalAddwork);
};

export const createButtonAddPictureLabel = () => {
  const addPicturelabel = document.createElement("label");
  addPicturelabel.innerText = "+ Ajouter photo";
  addPicturelabel.id = "addPicturelabel";

  const addPictureicon = document.createElement("i");
  addPictureicon.id = "addPictureicon";
  addPictureicon.classList.add("far", "fa-image", "fa-5x");
  addPictureicon.classList.add("flex");

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
};

export const createPreviewZoneImg = () => {
  const preview = document.createElement("img");
  preview.id = "preview";
  preview.classList.add("hidden");

  const addPicturecontainer = document.querySelector(
    ".add__picture__container"
  );
  addPicturecontainer.appendChild(preview);
};

