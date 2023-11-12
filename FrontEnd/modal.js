// import { getCategories } from "./category.js";
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
} from "./utils.js";

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
  createButonReturn();
  
  
  const btnAddpicture = document.getElementById("btnAddPicture");
  
  btnAddpicture.addEventListener("click", () => {
    

    btnAddpicture.classList.add("hidden");
    
    const modalGallery = document.querySelector(".modal__gallery");
    modalGallery.remove()
    
    const returnBtn = document.querySelector(".btn__return")
    returnBtn.classList.remove("hidden")

    // const btnValid = document.getElementById("btnValid")

    const modalAddwork = document.querySelector(".modal__addwork");
    modalAddwork.classList.remove("hidden")
  });

  // Ajouter un écouteur d'événements pour la fermeture de la modale au click sur la croix
  const closeModal = document.querySelector(".btn__closemodal")
  const modalContainer = document.querySelector(".modal__container");
  closeModal.addEventListener("click", (event) => {
    
    event.preventDefault();
    if (modalContainer) {
      modalContainer.remove();
    }
  });
  
  
  
  const returnBtn = document.querySelector(".btn__return")
  
  // const modalGallery = document.querySelector(".modal__gallery")
  const btnValid = document.getElementById("btnValid")
  
  
  returnBtn.addEventListener("click", () => {
    
    returnBtn.classList.add("hidden")
    // modalAddwork.classList.add("hidden")
    // modalGallery.classList.remove("hidden")    
    btnAddpicture.classList.remove("hidden")
    btnValid.classList.add("hidden")
    
  });
};

const openAddpictureForm = () => {
  createAddPictureContainer();
  createPreviewZoneImg();
  createButtonAddPictureLabel();
  createLabelTitle();
  createInputTitle();
  createLabelSelect();
};




//     // Ajouter un addEventListener pour pouvoir réafficher la gallerie au click et réinitialiser l'aperçu afin d'afficher de nouveau les élements pour un nouveau travail
//    
//   });

//   // Ajouter d'une fonctions pour récuper les travaux existant

      
    
  

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
