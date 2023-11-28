import {
  getWorks,
  createModalGallery,
  createLabelTitle,
  createInputTitle,
  createInputSelect,
  postWork,
  previewImg,
} from "./utils.js";

import {
  createModalContainer,
  createModal,
  createModalTitle,
  createButonAddPicture,
  createButonReturn,
  createBtnValid,
  createButonCloseModal,
  createAddPictureContainer,
  createHrElement,
  createModalAddWorkForm,
  createButtonAddPictureLabel,
  createPreviewZoneImg,
} from "./modalLayers.js";

const openAddpictureForm = () => {
  createModalAddWorkForm();
  createButonReturn();
  createAddPictureContainer();
  createPreviewZoneImg();
  createButtonAddPictureLabel();
  createLabelTitle();
  createInputTitle();
  createInputSelect();
};

export const openModal = async () => {
  const works = await getWorks();
  createModalContainer();
  createModal();
  createModalTitle();
  createModalGallery(works);
  openAddpictureForm();
  createHrElement();
  createButonAddPicture();
  createBtnValid();
  createButonCloseModal();

  const btnAddpicture = document.getElementById("btnAddPicture");
  const returnBtn = document.querySelector(".btn__return");
  const modalAddwork = document.querySelector(".modal__addwork");
  const modalGallery = document.querySelector(".modal__gallery");
  const btnValid = document.getElementById("btnValid");
  const modalContainer = document.querySelector(".modal__container");
  const modalTitle = document.getElementById("modalTitle");
  const addWork = document.getElementById("addWork");
  const inputTitle = document.getElementById("inputTitle");

  document.body.classList.add("modal-open");

  if (btnAddpicture) {
    btnAddpicture.addEventListener("click", () => {
      btnAddpicture.classList.add("hidden");

      modalTitle.innerText = "Ajouter une photo";

      modalGallery.classList.remove("grid");
      modalGallery.classList.add("hidden");

      const returnBtn = document.querySelector(".btn__return");
      returnBtn.classList.remove("hidden");

      btnValid.classList.add("flex");
      btnValid.classList.remove("btn__valid--checked");
      btnValid.classList.add("btn__valid--unchecked");

      modalAddwork.classList.remove("hidden");
      modalAddwork.classList.add("flex");
    });
  }

  // Ajouter un écouteur d'événements pour la fermeture de la modale au click sur la croix
  const closeModal = document.querySelector(".btn__closemodal");

  closeModal.addEventListener("click", (event) => {
    event.preventDefault();
    if (modalContainer) {
      modalContainer.remove();
      document.body.classList.remove("modal-open");
    }
  });

  returnBtn.addEventListener("click", () => {
    returnBtn.classList.add("hidden");
    modalAddwork.classList.remove("flex");
    modalAddwork.classList.add("hidden");
    modalGallery.classList.remove("hidden");
    modalGallery.classList.add("grid");
    btnAddpicture.classList.remove("hidden");
    btnValid.classList.remove("flex");
    btnValid.classList.add("hidden");
    modalTitle.innerText = "Galerie photo";

    const inputCategories = document.getElementById("inputCategories");

    addWork.value = "";
    inputTitle.value = "";
    inputCategories.selectedIndex = -1;

    preview.classList.add("hidden");
    addPicturelabel.classList.remove("hidden");

    const addPictureicon = document.getElementById("addPictureicon");
    addPictureicon.classList.remove("hidden");

    const addWorkText = document.getElementById("addWorkText");
    addWorkText.classList.remove("hidden");
  });

  btnValid.addEventListener("click", () => {
    postWork();
    btnAddpicture.classList.remove("hidden");
    btnValid.classList.remove("flex");
    btnValid.classList.add("hidden");
  });

  if (addWork) {
    addWork.addEventListener("change", () => {
      previewImg();
    });
  } else {
    console.error("L'élément avec l'ID 'addWork' n'a pas été trouvé.");
  }
};
