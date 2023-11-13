//Requête fetch pour récupérer la réponse de l'api works
import { getCategories } from "./category.js";

let inputTitleValue
let inputImgValue

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
  modalGallery.classList.add("grid");
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

    const deleteBtn = picturesElement.querySelector(".delete__btn");
    const workId = worksToDisplay[i].id;

    deleteBtn.addEventListener("click", async (event) => {
      event.preventDefault();

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
        } else {
          console.error("Échec de la suppression du travail.");
        }
      }
    });
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
  const btnValid = document.createElement("button");
  btnValid.innerText = "Valider";
  btnValid.id = "btnValid";
  btnValid.classList.add("hidden");
  btnValid.classList.add("btn__valid__unchecked")
  const modal = document.querySelector(".modal");
  modal.appendChild(btnValid);
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

export const createModalAddWorkForm = () => {
  const modal = document.querySelector(".modal");
  const modalAddwork = document.createElement("div");
  modalAddwork.classList.add("modal__addwork");
  modalAddwork.classList.add("hidden");
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
  
  // document.addEventListener("DOMContentLoaded", function () {
  //   const addWork = document.getElementById("addWork");
  //   if (addWork) {
  //     addWork.addEventListener("change", previewImg);
  //   } else {
  //     console.error("L'élément avec l'ID 'addWork' n'a pas été trouvé.");
  //   }
  // });
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

export const previewImg = () => {
  const addWork = document.getElementById("addWork");
  const files = addWork.files;
  inputImgValue = files;
  checkFormValidity()
  if (files.length > 0) {
    const ImgReader = new FileReader();
    ImgReader.readAsDataURL(files[0]);
    ImgReader.onload = function (event) {
      document.getElementById("preview").setAttribute("src", event.target.result);

      const preview = document.getElementById("preview");
      preview.classList.remove("hidden");

      const addPicturelabel = document.getElementById("addPicturelabel");
      addPicturelabel.classList.add("hidden");

      const addPictureicon = document.getElementById("addPictureicon");
      addPictureicon.remove();

      const addWorkText = document.getElementById("addWorkText");
      addWorkText.remove();
    };
  }
};

export const createLabelTitle = () => {
  const labelTitle = document.createElement("label");
  labelTitle.id = "labelTitle";
  labelTitle.innerText = "Titre";
  const modalAddwork = document.querySelector(".modal__addwork");
  modalAddwork.appendChild(labelTitle);
};

export const createInputTitle = () => {
  const inputTitle = document.createElement("input");
  inputTitle.type = "Text";
  inputTitle.id = "inputTitle";
  const modalAddwork = document.querySelector(".modal__addwork");
  modalAddwork.appendChild(inputTitle);
  
  inputTitle.addEventListener("change", (event) => {
    inputTitleValue = event.target.value
    checkFormValidity()
  })
};

export const createLabelSelect = async () => {
  const labelSelect = document.createElement("label");
  labelSelect.id = "labelSelect";
  labelSelect.innerText = "Catégorie";

  const selectCategories = document.createElement("select");
  selectCategories.id = "selectCategories";

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

export const postWork = async () => {
  const addWork = document.getElementById("addWork");
  
  const tittleValue = document.getElementById("inputTitle").value;
  const selectValue = document.getElementById("selectCategories").value;
  const imageFile = addWork.files[0];


  // Créez un objet FormData pour envoyer des données au serveur
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", tittleValue);
  formData.append("category", selectValue);

  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    const responseAddwork = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(userToken).token}`,
      },
      body: formData,
    });

    if (responseAddwork.ok) {
      const updatedWorks = await getWorks();
      await displayWorks(updatedWorks);
    } else {
      // La requête a échoué
      console.error("Échec de l'ajout du travail.");
    }
  }
};

const checkFormValidity = () => {
  //si input length img value alors je chope le btn valider 
  const addWork = document.getElementById("addWork");
  const isImageSelected = addWork.files.length > 0;

  const inputTitle = document.getElementById("inputTitle");
  const isTitleFilled = inputTitle.value.trim() !== "";

  const btnValid = document.getElementById("btnValid");

  if (isImageSelected && isTitleFilled) {
    btnValid.classList.add("btn__valid__checked");
    console.log("tata");
  } else {
    btnValid.classList.remove("btn__valid__checked");
    btnValid.classList.add("btn__valid__unchecked");
    console.log("toto");
  }

}
