import { getCategories } from "./category.js";
// import { getWorks, displayWorks } from "./utils.js";

// // export const openModal = async () => {

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

//   //Fermeture de la modale au clic à l'exterieur de la modal

// Ajout de la galerie des travaux dans la fenêtre modal

export const createModalGallery = () => {
  const modal = document.querySelector(".modal")
  const modalGallery = document.createElement("div");
  modalGallery.classList.add("modal__gallery");
  modal.appendChild(modalGallery)
};

export const createModalAddWorkForm = () => {
  const modal = document.querySelector(".modal")
  const modalAddwork = document.createElement("form");
  modalAddwork.classList.add("modal__addwork");
  modal.appendChild(modalAddwork)
};

export const createAddPictureContainer = () => {
  const addPicturecontainer = document.createElement("div");
  addPicturecontainer.classList.add("add__picture__container");
};

// Ajout d'une zone preview pour l'aperçu de notre intput file
export const createPreviewZoneImg = () => {
  const preview = document.createElement("img");
  preview.id = "preview";
  preview.classList.add = "hidden";
};

export const createButtonAddPictureLabel = () => {
  const addPicturelabel = document.createElement("label");
  addPicturelabel.innerText = "+ Ajouter photo";
  const addPictureicon = document.createElement("i");
  addPictureicon.classList.add("far", "fa-image", "fa-5x");
  addPicturelabel.id = "addpicture";
};

export const createAddPictureInputFile = () => {
  //Ajout d'une input pour pouvoir ajouter une nouvelle photo
  const addWork = document.createElement("input");
  addWork.id = "add__Work";
  addWork.type = "file";
  addWork.accept = ".jpg,.png";
};

export const createAddPictureText = () => {
  const addPictureAccepted = document.createElement("p");
  addPictureAccepted.classList.add("add__picture__text");
  addPictureAccepted.innerText = "jpg, png : 4mo max";
};

export const createButtonValid = () => {
  //Ajout du bouton valider l'ajout d'une nouvelle photo caché par défaut
  const modal = document.querySelector(".modal");
  const btnValid = document.createElement("input");
  btnValid.id = "btnValid";
  btnValid.type = "submit";
  btnValid.value = "Valider";
  modal.appendChild(btnValid);
  btnValid.remove;
};

export const createHrAddworkElement = () => {
  const hrAddwork = document.createElement("hr");
};

export const createHrValidWorkElement = () => {
  const hrValidwork = document.createElement("hr");
};

export const previewImg = () => {
  const files = addWork.files;
  if (files.length > 0) {
    const ImgReader = new FileReader();
    ImgReader.onload = function (event) {
      document
        .getElementById("preview")
        .setAttribute("src", event.target.result);
      addPicturelabel.style.display = "none";
      addPictureicon.style.display = "none";
      addPictureAccepted.style.display = "none";
      preview.style.display = "block";
    };
    ImgReader.readAsDataURL(files[0]);
  }
};

export const createLabelTitle = () => {
  const labelTitle = document.createElement("label");
  labelTitle.id = "label__title";
  labelTitle.innerText = "Titre";
};

export const createInputTitle = () => {
  const inputTitle = document.createElement("input");
  inputTitle.type = "Text";
  inputTitle.id = "input__title";
};

export const createLabelSelect = () => {
  const labelSelect = document.createElement("label");
  labelSelect.id = "label__select";
  labelSelect.innerText = "Catégorie";
};

// addWork.addEventListener("change", previewImg);

export const createSelectCategoriesElement = () => {
  const selectCategories = document.createElement("select");
  selectCategories.id = "select__categories";

  // Récupérer les catégories via la fonction getCategories
  // const categories = await getCategories();

  // Effacer toutes les options actuelles du select
  selectCategories.innerHTML = "";

  // Ajouter une option "" par défaut
  selectCategories.add(new Option(""));

  // Ajouter les catégories récupérées comme options

  categories.forEach((category) => {
    selectCategories.add(new Option(category.name, category.id));
  });
};

// };
// const modalAddwork = document.querySelector(".modal__addwork");
// modalAddwork.append(
//   addPicturecontainer,
//   labelTitle,
//   inputTitle,
//   labelSelect,
//   selectCategories,
//   hrValidwork,
//   btnValid
// );

// addPicturecontainer.append(
//   preview,
//   addPictureicon,
//   addPicturelabel,
//   addPictureAccepted
// );

  // //Ancrage de l'input file au label
  // addPicturelabel.appendChild(addWork);

//   //cacher la modaladdwork
//   modalAddwork.style.display = "none";

//   // Ajout du titre de la fenêtre modale
//   const modalTittle = document.createElement("h3");
//   modal.appendChild(modalTittle);
//   modalTittle.innerHTML = "Galerie photo";

//   //Ancrage de la div modal__gallery à la div modal
//   modal.append(modalGallery, hrAddwork, modalAddwork);

//   //Ajout de la barre de séparation de la fenêtre modal
//   // modal.appendChild(hr);

//   //Ajout du bouton "Ajouter" de la fenêtre modale
//   const btnAddpicture = document.createElement("button");
//   btnAddpicture.id ="btnAddPicture"
//   btnAddpicture.type = "submit";
//   btnAddpicture.innerHTML = "Ajouter une photo";
//   modal.appendChild(btnAddpicture);

//   // Ajouter un addEventListener pour pouvoir ajouter un nouveau travail
//   btnAddpicture.addEventListener("click", (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     //Changement tu titre de la modale;
//     modalTittle.innerHTML = "Ajout photo";

//     //Cacher le bouton Ajouter une photo au click sur le bouton ajouter une photo
//     btnAddpicture.style.display = "none";

//     //Cacher la gallerie au click sur le bouton ajouter
//     modalGallery.style.display = "none";
//     modalAddwork.style.display = "flex";

//     hrAddwork.style.display = "none";

//     //Aficher le bouton valider grisé au click sur le bouton ajouter la photo
//     btnValid.style.display = "block";

//     //Ajout du bouton retour pour fermer la modale
//     const returnBtn = document.createElement("button");
//     modal.appendChild(returnBtn);
//     returnBtn.classList.add("btn__return");

//     //Ajout Icone left-Arrow pour la fermeture de la modale
//     const returnIcons = document.createElement("i");
//     returnIcons.classList.add("fas", "fa-arrow-left");
//     returnBtn.appendChild(returnIcons);

//     // Ajouter un addEventListener pour pouvoir réafficher la gallerie au click et réinitialiser l'aperçu afin d'afficher de nouveau les élements pour un nouveau travail
//     returnBtn.addEventListener("click", () => {

//       btnAddpicture.setAttribute("display", "block");
//       btnValid.style.display = "none";
//       returnBtn.style.display = "none";
//       modalGallery.style.display = "grid";
//       modalAddwork.style.display = "none";
//       addPicturelabel.style.display = "block";
//       addPictureicon.style.display = "block";
//       hrAddwork.style.display = "block";
//       addPictureAccepted.style.display = "block";
//       preview.style.display = "none";
//     });
//   });

//   //Ajout du bouton close pour fermer la modale
//   const closeModal = document.createElement("button");
//   modal.appendChild(closeModal);
//   closeModal.classList.add("btn__closemodal");

//   //Ajout Icone x-mark pour la fermeture de la modale
//   const closeModalicons = document.createElement("i");
//   closeModalicons.classList.add("fas", "fa-xmark");
//   closeModal.appendChild(closeModalicons);

//   // Ajouter un écouteur d'événements pour la fermeture de la modale au click sur la croix
//   const modalContainer = document.querySelector(".modal__container")
//   closeModal.addEventListener("click", (event) => {
//     event.preventDefault()
//     event.stopPropagation()
//     if (modalContainer) {
//       modalContainer.remove();
//     }
//   });

//   // Ajouter d'une fonctions pour récuper les travaux existant
//   const displayModalWorks = async (worksToDisplay) => {

//     modalGallery.innerHTML = "";

//     for (let i = 0; i < worksToDisplay.length; i++) {
//       const picturesElement = document.createElement("figure");
//       const img = document.createElement("img");
//       img.src = worksToDisplay[i].imageUrl;
//       img.alt = worksToDisplay[i].title;

//       //Ajout du bouton corbeille (suprimer) à chaque élément de la boucle
//       const deleteBtn = document.createElement("button");
//       deleteBtn.classList.add("delete__btn");
//       const deleteIcon = document.createElement("i");
//       deleteIcon.classList.add("fas", "fa-trash-can");

//       deleteBtn.appendChild(deleteIcon);
//       picturesElement.append(img, deleteBtn);
//       modalGallery.appendChild(picturesElement);
//       picturesElement.style.position = "relative";

//       const workId = worksToDisplay[i].id;

//       // EventListener au click sur la corbeille pour supprimer un travail
//       deleteBtn.addEventListener("click", async (event) => {
//         event.preventDefault();
//         event.stopPropagation()
//         const userToken = localStorage.getItem("userToken");

//         if (userToken) {
//           const responseDelete = await fetch(
//             `http://localhost:5678/api/works/${workId}`,
//             {
//               method: "DELETE",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${JSON.parse(userToken).token}`,
//               },
//             }
//           );

//           if (responseDelete.ok) {
//             picturesElement.remove();
//           } else {
//             console.error("Échec de la suppression du travail.");
//           }
//         }
//       });
//     }
//   };

//   const works = await getWorks();
//   displayModalWorks(works);

//   modalAddwork.addEventListener("submit", (event) => {
//     event.preventDefault();
//     event.stopPropagation()
//     postWork();
//   });
// // };

// export const postWork = async () => {

//   const addWork = document.getElementById("add__Work");
//   const tittleValue = document.getElementById("input__tittle").value;
//   const selectValue = document.getElementById("select__categories").value;
//   const imageFile = addWork.files[0];

//   // Créez un objet FormData pour envoyer des données au serveur
//   const formData = new FormData();
//   formData.append("image", imageFile);
//   formData.append("title", tittleValue);
//   formData.append("category", selectValue);

//   const userToken = localStorage.getItem("userToken");
//   if (userToken) {
//     const responseAddwork = await fetch("http://localhost:5678/api/works", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${JSON.parse(userToken).token}`,
//       },
//       body: formData,
//     });

//     if (responseAddwork.ok) {
//       // La requête a réussi, vous pouvez traiter la réponse si nécessaire
//       const newWork = await responseAddwork.json();
//       await displayWorks([newWork, ...works]);
//     } else {
//       // La requête a échoué
//       console.error("Échec de l'ajout du travail.");
//     }
//   }
// };
