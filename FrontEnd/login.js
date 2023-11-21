const form = document.getElementById("login__form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  postLogin();
});

//Ajout d'une fonction pour loguer l'utilisateur en communiquant avec l'Api login
const postLogin = async () => {
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
    window.location.href = "index.html";
  } else {
    const messageError = document.querySelector("#error-message");
    messageError.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
  }
};

export const displayAdminPanel = () => {
  const loginBtn = document.getElementById("login__btn");
  loginBtn.innerText ="logout";

  const body = document.querySelector("body");
  const userBanner = document.createElement("div");
  userBanner.classList.add("user__connected");
  body.appendChild(userBanner);
  
  const createEditionIcon = () => {
    const icon = document.createElement("i");
    const textIcon = document.createElement("p");
    textIcon.innerHTML = "Mode édition";
    icon.classList.add("fa-regular", "fa-pen-to-square");
    userBanner.appendChild(icon);
    userBanner.appendChild(textIcon);
    const filters = document.getElementById("filters");
    body.style.marginTop = "97px";
    filters.style.visibility = "hidden";
  };
  createEditionIcon()
 
  const createEditButton = () =>{
    const portfolio = document.getElementById("portfolio");
    const editBtn = document.createElement("button");
    editBtn.id = "editBtn";
    portfolio.appendChild(editBtn);
    const editIconBtn = document.createElement("i");
    const editTextBtn = document.createElement("p");
    editTextBtn.innerHTML = "Modifier";
    editIconBtn.classList.add("fa-regular", "fa-pen-to-square");
    editBtn.appendChild(editIconBtn);
    editBtn.appendChild(editTextBtn)
  };
  createEditButton()
};
