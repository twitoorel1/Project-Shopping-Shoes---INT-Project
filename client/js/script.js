// Main Url
const END_POINT_MAIN = "http://localhost:3000/";

// Message Fron Server to Form Login & Register
const messageFormEl = document.querySelector("[data-message-form]");

// Display Year Now
const yearNowEl = document.querySelector("[data-year-now]");
function yearNow() {
  let year = new Date().getFullYear();
  return `${year}`;
}
yearNowEl.innerHTML = yearNow();

// Capitalize First Letter
function capitalizeFirstLetter(str) {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}

// Logout Button
// const logoutButtonEl = document.querySelector("[data-logout-button]");
// logoutButtonEl.onclick = () => {
//   localStorage.removeItem("token");
//   setTimeout(() => {
//     window.location.href = "./login.html";
//   }, 1000);
// };
function logoutBtn() {
  localStorage.removeItem("token");
  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
}
