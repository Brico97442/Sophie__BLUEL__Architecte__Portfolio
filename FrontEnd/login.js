const form = document.getElementById("login__form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginRequest();
});

//Ajout d'une fonction pour loguer l'utilisateur en communiquant avec l'Api login
const loginRequest = async () => {
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

  
  
  body.style.marginTop = "97px";
  filters.style.visibility = "hidden";
  const portfolio = document.getElementById("portfolio");
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.id = "edit__btn";
  portfolio.appendChild(editBtn);
  const editIconBtn = document.createElement("i");
  const editTextBtn = document.createElement("p");
  editTextBtn.innerHTML = "Modifier";
  editIconBtn.classList.add("fa-regular", "fa-pen-to-square");
  editBtn.appendChild(editIconBtn);
  editBtn.appendChild(editTextBtn);
};
