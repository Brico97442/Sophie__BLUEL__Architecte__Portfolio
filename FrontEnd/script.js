const galleryElement = document.querySelector(".gallery");

// Code pour récupérer les travaux du BackEnd
const worksApi = await fetch("http://localhost:5678/api/works");
const works = await worksApi.json();

// Fonction pour afficher les œuvres dans la galerie
const displayWorks = async (worksToDisplay) => {
  galleryElement.innerHTML = ""; // Effacer le contenu actuel de la galerie

  for (let i = 0; i < worksToDisplay.length; i++) {
    const picturesElement = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");
    img.src = worksToDisplay[i].imageUrl;
    img.alt = worksToDisplay[i].title;
    figCaption.innerHTML = worksToDisplay[i].title;
    picturesElement.append(img, figCaption);
    galleryElement.appendChild(picturesElement);
  }
};

// Fonction pour mettre à jour l'affichage en fonction de la catégorie
const updateDisplay = async (categoryId) => {
  const worksToDisplay = categoryId ? works.filter((picture) => picture.categoryId === categoryId) : works;
  await displayWorks(worksToDisplay);
};

// Code pour afficher tous les objets par défaut
await updateDisplay(null);

// Code pour récupérer les catégories du BackEnd
const categoriesApi = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesApi.json();

// Ajout de la catégorie "Tous" dans l'API catégories
categories.unshift({ name: "Tous", categoryId: null });
const filtersElement = document.getElementById("filters");
const categoriesContainer = document.createElement("ul");
categoriesContainer.classList.add("center__row", "gap");



// Boucle pour création et affichages des boutons catégories //
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
  
  // Ajouter un écouteur d'événements pour le clic sur chaque bouton de catégorie //
  categoryLi.addEventListener("click", () => {
    updateDisplay(categoryId);
  });
}




