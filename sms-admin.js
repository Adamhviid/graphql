const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
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
      loginInfo.innerHTML = JSON.stringify(data, undefined, 2);
    })
});

const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("register form submitted");
  const email = document.getElementById("register-email")
  const phone = document.getElementById("register-phone")
  const password = document.getElementById("register-password")
  const confirmPassword = document.getElementById("register-confirm-password")
  const registerInfo = document.getElementById("register-info")

  registerInfo.innerHTML = "Loading...";
  fetch("http://localhost:4000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      phone: phone.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    })
  }).then((response) => response.json())
    .then((data) => {
      console.log(data);
      registerInfo.innerHTML = JSON.stringify(data, undefined, 2);
    })
});

const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("send form submitted");
  const apiKey = document.getElementById("send-api-key")
  const phone = document.getElementById("send-phone")
  const message = document.getElementById("send-message")
  const sendInfo = document.getElementById("send-info")

  sendInfo.innerHTML = "Loading...";
  fetch("http://localhost:4000/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: apiKey.value,
      phone: phone.value,
      message: message.value
    })
  }).then((response) => response.json())
    .then((data) => {
      console.log(data);
      sendInfo.innerHTML = JSON.stringify(data, undefined, 2);
    })
});