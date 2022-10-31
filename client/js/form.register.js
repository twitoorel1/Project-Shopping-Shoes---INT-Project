// API url to login
const END_POINT_REGISTER = "http://localhost:3000/auth/register";

// Form Register
const formRegisterEl = document.querySelector("[data-form-register]");

// Input
const imgProfileInput = document.querySelector("[data-imgProfile-input]");
const usernameInput = document.querySelector("[data-username-input]");
const emailInput = document.querySelector("[data-email-input]");
const passwordInput = document.querySelector("[data-password-input]");
const firstNameInput = document.querySelector("[data-firstName-input]");
const lastNameInput = document.querySelector("[data-lastName-input]");
const ageInput = document.querySelector("[data-age-input]");
const countryInput = document.querySelector("[data-country-input]");
const cityInput = document.querySelector("[data-city-input]");
const streetInput = document.querySelector("[data-street-input]");
const zipCodeInput = document.querySelector("[data-zipCode-input]");

formRegisterEl.onsubmit = async (e) => {
  try {
    e.preventDefault();
    const formRegisterReq = {
      imgProfile: imgProfileInput.value,
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      address: {
        country: countryInput.value,
        city: cityInput.value,
        street: streetInput.value,
        zipCode: zipCodeInput.value,
      },
      personalInformation: {
        firstname: firstNameInput.value,
        lastname: lastNameInput.value,
      },
      age: ageInput.value,
    };

    const res = await fetch(`${END_POINT_REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formRegisterReq),
    });
    const data = await res.json();

    const { error, token } = data;
    if (error) {
      messageFormEl.innerHTML = error;
    } else if (token) {
      messageFormEl.innerHTML = "Register Successful";
      localStorage.setItem("token", token);
      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

// If User Register send to the dashboard page - (dashboard.html)
if (localStorage.getItem("token")) {
  formRegisterEl.style.display = "none";
  window.location.href = "./dashboard.html";
}

// Toggle Show Password In Register & Login Pages
const toggleBtnEl = document.querySelector("#toggle");
toggleBtnEl.onclick = () => {
  const type = passwordInput.getAttribute("type");
  passwordInput.setAttribute("type", type === "password" ? "text" : "password");
};
