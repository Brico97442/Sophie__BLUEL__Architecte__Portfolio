// Fonction pour afficher les œuvres dans la galerie
const galleryElement = document.querySelector(".gallery");

export const displayWorks = async (worksToDisplay) => {
// Effacer le contenu actuel de la galerie
  galleryElement.innerHTML = "";

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
export const updateDisplay = async (categoryId) => {
  const worksApi = await fetch("http://localhost:5678/api/works");
  const works = await worksApi.json();
  const worksToDisplay = categoryId
    ? works.filter((picture) => picture.categoryId === categoryId)
    : works;
  await displayWorks(worksToDisplay);
};

// Fonction pour récupérer les catégories via l'api 
export const categoriesRequest = async () => {
  // Code pour récupérer les catégories du BackEnd
const categoriesApi = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesApi.json();

// Ajout de la catégorie "Tous" dans l'API catégories
categories.unshift({ name: "Tous", categoryId: null });
const filtersElement = document.getElementById("filters");
const categoriesContainer = document.createElement("ul");
categoriesContainer.classList.add("center__row", "gap");

// Boucle pour création et affichages des boutons catégories
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

//Ajout d'une fonction pour loguer l'utilisateur en communiquant avec l'Api login      
export const loginRequest = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("userToken", JSON.stringify({ token: data.token }));
    adminPanel();
    window.location.href = "index.html";
  } else {
    const messageError = document.querySelector("#error-message");
    messageError.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
  }
};

export const userConnected = () => {
  const userToken = localStorage.getItem("userToken");
  const logoutBtn = document.getElementById("logout__btn");
  if (userToken) {
    adminPanel();
  } else {
    logoutBtn.style.display = "none";
  }
};

const adminPanel = () => {
  const logoutBtn = document.getElementById("logout__btn");
  const loginBtn = document.getElementById("login__btn");

  const body = document.querySelector("body");
  const usersHeader = document.createElement("div");
  usersHeader.classList.add("user__connected");
  body.appendChild(usersHeader);

  const icon = document.createElement("i");
  const textIcon = document.createElement("p");
  textIcon.innerHTML = "Mode édition";
  icon.classList.add("fa-regular", "fa-pen-to-square");
  usersHeader.appendChild(icon);
  usersHeader.appendChild(textIcon);

  const filters = document.getElementById("filters");

  if (logoutBtn) {
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    body.style.marginTop = "97px";
    filters.style.visibility = "hidden";
    const portfolio = document.getElementById("portfolio");
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    portfolio.appendChild(editBtn);
    const iconPortfolio = document.createElement("i");
    const textPortfolio = document.createElement("p");
    textPortfolio.innerHTML = "Modifier";
    iconPortfolio.classList.add("fa-regular", "fa-pen-to-square");
    editBtn.appendChild(iconPortfolio);
    editBtn.appendChild(textPortfolio);
  }
};




