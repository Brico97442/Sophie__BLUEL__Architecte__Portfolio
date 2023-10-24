
//Ajout d'une fonction pour loguer l'utilisateur    
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


