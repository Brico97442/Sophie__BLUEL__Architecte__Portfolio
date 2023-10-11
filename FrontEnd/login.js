const form = document.getElementById("login__form");
form.addEventListener("submit", function (event) {
  
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
  .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      }
      return response.json();
  })
  .then(() => {
      window.location.href = "index.html";
  });
  
});
