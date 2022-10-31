// Api url to Authenticate
const END_POINT_AUTH = "http://localhost:3000/auth/authenticate";

const statusNotLogin = document.querySelector("[data-status-not-login]");
const statusLogin = document.querySelector("[data-status-login]");
const userLoginSuccess = document.querySelector("[data-name-login-success]");

async function initialUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const res = await fetch(`${END_POINT_AUTH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

async function initialApp() {
  try {
    const user = await initialUser();

    if (!user) {
      // If User Not Login
      statusNotLogin.style.display = "flex";
      statusLogin.style.display = "none";
    } else if (user) {
      // If User Login
      // console.log(user);
      // const username_Only = capitalizeFirstLetter(user.user.username);
      const firstName = user.user.personalInformation.firstname;
      const lastName = user.user.personalInformation.lastname;
      const firstNameAndLastName =
        capitalizeFirstLetter(firstName) + capitalizeFirstLetter(lastName);

      const imgProfile_Only = user.user.imgProfile;

      statusNotLogin.style.display = "none";
      statusLogin.style.display = "flex";
      statusLogin.innerHTML = `
      <a href="./dashboard.html"><span>Hi ${firstNameAndLastName}!</span></a>
      <h2 onclick="logoutBtn()">Logout &nbsp; <i class="fa-regular fa-user"></i></h2>
      `;
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

initialApp();
