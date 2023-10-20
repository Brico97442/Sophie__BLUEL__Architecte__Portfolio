document.addEventListener("DOMContentLoaded", () => {
  const userToken = localStorage.getItem("userToken");
  const logoutBtn = document.getElementById("logout__btn");

  if (userToken) {
    updateLogoutButton();
  } else {
    logoutBtn.style.display = "none";
  }
});

const form = document.getElementById("login__form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
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
    updateLogoutButton();
    window.location.href = "index.html";
  } else {
    const messageError = document.querySelector("#error-message");
    messageError.innerHTML = "Erreur dans l'identifiant ou le mot de passe";
  }
});

const updateLogoutButton = () => {
  const logoutBtn = document.getElementById("logout__btn");
  const loginBtn = document.getElementById("login__btn");
  
  const Header = document.querySelector("body");
  const usersHeader = document.createElement("div");
  usersHeader.classList.add("user__connected");
  Header.appendChild(usersHeader);

  const icon = document.createElement("i")
  const textIcon = document.createElement("p")
  textIcon.innerHTML = "Mode édition";
  icon.classList.add("fa-regular","fa-pen-to-square");
  usersHeader.appendChild(icon);
  usersHeader.appendChild(textIcon);
 
  // const portfolio = document.getElementById("portfolio");
  const editContainer = document.createElement("button");
  editContainer.classList.add("editBtn");
  // portfolio.appendChild(editContainer);
  const iconPortfolio = document.createElement("i");
  const textPortfolio = document.createElement("p");
  textPortfolio.innerHTML = "Modifier";
  iconPortfolio.classList.add("fa-regular","fa-pen-to-square");
  editContainer.appendChild(iconPortfolio);
  editContainer.appendChild(textPortfolio);

  const filters = document.getElementById("filters");

  if (logoutBtn) {
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    
    Header.style.marginTop = "97px";
    filters.style.visibility = "hidden";
  }
};

const logoutBtn = document.getElementById("logout__btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    window.location.href = "login.html";
  });
}
