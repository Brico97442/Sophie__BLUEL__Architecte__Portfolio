//Requête fetch pour récupérer la réponse de l'api works
import { getCategories } from "./category.js";
import { createButonTrash } from "./modalLayers.js";

let inputTitleValue;
let inputImgValue;

export let cachedWorks = [];
export const getWorks = async () => {
  const worksApi = await fetch("http://localhost:5678/api/works");
  const works = await worksApi.json();

  cachedWorks = works;
  return works;
};

export const removeWork = (work) => {
  cachedWorks = cachedWorks.filter(element => element !== work);
}

// Fonction pour afficher les œuvres dans la galerie
const galleryElement = document.querySelector(".gallery");
export const displayWorks = async (worksToDisplay) => {
  // Effacer le contenu actuel de la galerie
  galleryElement.innerHTML = "";
  for (let i = 0; i < worksToDisplay.length; i++) {
    const picturesElement = document.createElement("figure");
    const img = document.createElement("img");
    img.id = "workImg";
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
    ? works.filter((work) => work.categoryId === categoryId)
    : works;
  displayWorks(worksToDisplay);
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
  modalGallery.innerHTML = "";
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
      removeWork(worksToDisplay[i]);
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
          displayWorks(cachedWorks);
          
        } else {
          console.error("Échec de la suppression du travail.");
        }
      }
    });
  }
};

export const previewImg = () => {
  const addWork = document.getElementById("addWork");
  const files = addWork.files;
  inputImgValue = files;

  if (files.length > 0) {
    const ImgReader = new FileReader();
    ImgReader.readAsDataURL(files[0]);
    ImgReader.onload = function (event) {
      document
        .getElementById("preview")
        .setAttribute("src", event.target.result);

      const preview = document.getElementById("preview");
      preview.classList.remove("hidden");

      const addPicturelabel = document.getElementById("addPicturelabel");
      addPicturelabel.classList.add("hidden");

      const addPictureicon = document.getElementById("addPictureicon");
      addPictureicon.classList.remove("flex");
      addPictureicon.classList.add("hidden");

      const addWorkText = document.getElementById("addWorkText");
      addWorkText.classList.add("hidden");

      checkFormValidity();
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
    inputTitleValue = event.target.value;
    checkFormValidity();
  });
};

export const getStoredCategories = () => {
  const storedCategories = localStorage.getItem("categories");
  return storedCategories ? JSON.parse(storedCategories) : [];
};

export const createInputSelect = async () => {
  const labelSelect = document.createElement("label");
  labelSelect.id = "labelSelect";
  labelSelect.innerText = "Catégorie";

  const inputCategories = document.createElement("select");
  inputCategories.id = "inputCategories";

  // Récupérer les catégories stockées via la fonction getStoredCategories
  const storedCategories = getStoredCategories();
  storedCategories.shift({ name: "Tous"});
  inputCategories.innerHTML = "";
  inputCategories.add(new Option(""));

  storedCategories.forEach((category) => {
    inputCategories.add(new Option(category.name, category.id));
  });

  const modalAddwork = document.querySelector(".modal__addwork");
  modalAddwork.append(labelSelect, inputCategories);

  inputCategories.addEventListener("change", () => {
    checkFormValidity();
  });
};


export const postWork = async () => {
  const addWork = document.getElementById("addWork");

  const imageFile = addWork.files[0];
  const inputTitle = document.getElementById("inputTitle");
  const inputCategories = document.getElementById("inputCategories");

  // Créez un objet FormData pour envoyer des données au serveur
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", inputTitle.value);
  formData.append("category", inputCategories.value);

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
      
      addWork.value = "";
      inputTitle.value = "";
      inputCategories.selectedIndex = -1;

      preview.classList.add("hidden");
      addPicturelabel.classList.remove("hidden");

      const addPictureicon = document.getElementById("addPictureicon");
      addPictureicon.classList.remove("hidden");

      const addWorkText = document.getElementById("addWorkText");
      addWorkText.classList.remove("hidden");

      const modalAddwork = document.querySelector(".modal__addwork");
      const modalGallery = document.querySelector(".modal__gallery");

      modalTitle.innerText = "Galerie photo";

      const returnBtn = document.querySelector(".btn__return");
      returnBtn.classList.add("hidden");

      btnValid.classList.add("btn__valid--unchecked");
      btnValid.classList.remove("btn__valid--checked");
      btnValid.setAttribute("disabled", "disabled");

      modalAddwork.classList.remove("flex");
      modalAddwork.classList.add("hidden");

      modalGallery.classList.remove("hidden");
      modalGallery.classList.add("grid");
      
      const newWork = await responseAddwork.json();
      cachedWorks.push(newWork);
      const works = cachedWorks;

      await displayWorks(works);
      await displayModalWorks(works);
      
    } else {
      console.error("Échec de l'ajout du travail.");
    }
  }
};

const checkFormValidity = () => {
  const addWork = document.getElementById("addWork");
  const ImageSelected = addWork.files.length > 0;

  const inputTitle = document.getElementById("inputTitle");
  const TitleFilled = !!inputTitle.value;

  const inputCategories = document.getElementById("inputCategories");
  const isCategorySelected = !!inputCategories.value;

  const btnValid = document.getElementById("btnValid");
  
  if (ImageSelected && TitleFilled && isCategorySelected) {
    btnValid.classList.remove("btn__valid--unchecked");
    btnValid.classList.add("btn__valid--checked");
    btnValid.removeAttribute("disabled");
    
  } else {
    btnValid.classList.remove("btn__valid--checked");
    btnValid.classList.add("btn__valid--unchecked");
    btnValid.setAttribute("disabled", "true");
  }
};
