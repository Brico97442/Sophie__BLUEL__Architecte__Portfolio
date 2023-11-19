import { updateDisplay } from "./utils.js";

// Fonction pour récupérer les catégories via l'api
export const getCategories = async () => {
  const categoriesApi = await fetch("http://localhost:5678/api/categories");
  const categories = await categoriesApi.json();
  categories.unshift({ name: "Tous", categoryId: null });
  return categories;
};

// Fonction pour création et affichages des boutons catégories
export const displayCategories = async (categories) => {
  const filtersElement = document.getElementById("filters");
  const categoriesContainer = document.createElement("ul");
  categoriesContainer.id = "categories__container";
  categoriesContainer.classList.add("center__row", "gap");

  for (let i = 0; i < categories.length; i++) {
    const categoryLi = document.createElement("li");
    const categoryBtn = document.createElement("button");
    const categoryId = categories[i].id;
    categoryBtn.innerHTML = categories[i].name;

    categoryLi.appendChild(categoryBtn);
    categoriesContainer.appendChild(categoryLi);
    filtersElement.appendChild(categoriesContainer);

    // Application du style sur les boutons catégories
    categoryBtn.classList.add("btn__style");

    // Ajouter un écouteur d'événements pour le clic sur chaque bouton de catégorie
    categoryLi.addEventListener("click", () => {
      updateDisplay(categoryId);
    });
  }
};
