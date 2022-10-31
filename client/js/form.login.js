// API url to login
const END_POINT_LOGIN = "http://localhost:3000/auth/login";

// Form Login
const formLoginEl = document.querySelector("[data-form-login]");

// Input
const usernameInput = document.querySelector("[data-username-inputLogin]");
const passwordInput = document.querySelector("[data-password-inputLogin]");

const formLoginBox = document.querySelector(".container-form");

formLoginEl.onsubmit = async (e) => {
  try {
    e.preventDefault();
    const formLoginReq = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const res = await fetch(`${END_POINT_LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formLoginReq),
    });
    const data = await res.json();
    const { error, token } = data;
    if (error) {
      messageFormEl.innerHTML = error;
    } else if (token) {
      messageFormEl.innerHTML = "Login Successful";
      localStorage.setItem("token", token);

      // localStorage.setItem("idUser", data.);
      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

// If User Login send to the dashboard page - (dashboard.html)
if (localStorage.getItem("token")) {
  formLoginBox.style.display = "none";
  window.location.href = "./dashboard.html";
}

// Toggle Show Password In Register & Login Pages
const toggleBtnEl = document.querySelector("#toggle");
toggleBtnEl.onclick = () => {
  const type = passwordInput.getAttribute("type");
  passwordInput.setAttribute("type", type === "password" ? "text" : "password");
};
