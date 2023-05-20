const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("login button clicked");
  login();
});

function login() {
  console.log("login form submitted");
  const email = document.getElementById("login-email")
  const password = document.getElementById("login-password")
  const loginInfo = document.getElementById("login-info")

  loginInfo.innerHTML = "Loading...";
  fetch("http://localhost:4000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then((response) => response.json())
    .then((data) => {
      console.log(data);
      loginInfo.innerHTML = "user_api_key = " + data.user_api_key;
    })
}