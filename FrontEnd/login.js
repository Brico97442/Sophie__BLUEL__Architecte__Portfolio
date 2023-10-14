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
  Header.appendChild(usersHeader);
  
  const filters = document.getElementById("filters")

  const porfolioDiv = document.getElementById("portfolio")
  
  if (logoutBtn) {
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    usersHeader.classList.add("user__connected");
    Header.style.marginTop = "97px";
    filters.style.display = "none"
  }
};

const logoutBtn = document.getElementById("logout__btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userToken");
    window.location.href = "login.html";
  });
}
