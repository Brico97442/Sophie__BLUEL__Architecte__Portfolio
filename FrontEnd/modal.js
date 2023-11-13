import {
  getWorks,
  createModalContainer,
  createModal,
  createModalTitle,
  createModalGallery,
  createHrElement,
  createButonAddPicture,
  createButonCloseModal,
  createButonReturn,
  createModalAddWorkForm,
  createAddPictureContainer,
  createPreviewZoneImg,
  createButtonAddPictureLabel,
  createLabelTitle,
  createInputTitle,
  createLabelSelect,
  createBtnValid,
  postWork,
  previewImg,
} from "./utils.js";

const openAddpictureForm = () => {
  createButonReturn();
  createAddPictureContainer();
  createPreviewZoneImg();
  createButtonAddPictureLabel();
  createLabelTitle();
  createInputTitle();
  createLabelSelect();
};

export const openModal = async () => {
  const works = await getWorks();
  createModalContainer();
  createModal();
  createModalTitle();
  createModalGallery(works);
  createModalAddWorkForm();
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

  btnAddpicture.addEventListener("click", () => {
    btnAddpicture.classList.add("hidden");

    const modalGallery = document.querySelector(".modal__gallery");
    modalGallery.classList.remove("grid");
    modalGallery.classList.add("hidden");

    const returnBtn = document.querySelector(".btn__return");
    returnBtn.classList.remove("hidden");

    const btnValid = document.getElementById("btnValid");
    btnValid.classList.remove("hidden");
    btnValid.classList.add("flex");

    const modalAddwork = document.querySelector(".modal__addwork");
    modalAddwork.classList.remove("hidden");
    modalAddwork.classList.add("flex");
  });

  // Ajouter un écouteur d'événements pour la fermeture de la modale au click sur la croix
  const closeModal = document.querySelector(".btn__closemodal");
  const modalContainer = document.querySelector(".modal__container");
  closeModal.addEventListener("click", (event) => {
    event.preventDefault();
    if (modalContainer) {
      modalContainer.remove();
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
  });

  btnValid.addEventListener("click", () => {
    postWork();
  });

  const addWork = document.getElementById("addWork");
  if (addWork) {
    addWork.addEventListener("change", () => {
      previewImg()
    });
  } else {
    console.error("L'élément avec l'ID 'addWork' n'a pas été trouvé.");
  }
};
