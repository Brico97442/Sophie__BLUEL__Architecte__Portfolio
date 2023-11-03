//Requête fetch pour récupérer la réponse de l'api works
export const getWorks = async () => {
  const worksApi = await fetch("http://localhost:5678/api/works");
  const works = await worksApi.json();
  return works;
};

export const postWork = async () => {
  const responseAddwork = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(userToken).token}`,
    },
    body: formData,
  });
  const newWork = await responseAddwork.json();
  return newWork;
};

// Fonction pour afficher les œuvres dans la galerie
const galleryElement = document.querySelector(".gallery");
export const displayWorks = async (worksToDisplay) => {
  // Effacer le contenu actuel de la galerie
  galleryElement.innerHTML = "";
  for (let i = 0; i < worksToDisplay.length; i++) {
    const picturesElement = document.createElement("figure");
    const img = document.createElement("img");
    img.id = "work__img"
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
