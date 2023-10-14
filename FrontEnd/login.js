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
  
  if (logoutBtn) {
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none"
  }
};

const logoutBtn = document.getElementById("logout__btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Supprimer le token utilisateur du localStorage
    localStorage.removeItem("userToken");
    // Rediriger vers la page de connexion (ou toute autre page appropriée)
    window.location.href = "login.html";
  });
}
