const nameDashBoard = document.querySelector("[data-nameUser-dashboard]");

// Main Account
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

const imageProfileUser = document.querySelector("[data-imgProfile-login]");

async function initialApp() {
  try {
    const user = await initialUser();

    if (!user) {
      // If User Not Login
      statusNotLogin.style.display = "flex";
      statusLogin.style.display = "none";
    } else if (user) {
      // If User Login
      // const username_Only = capitalizeFirstLetter(user.user.username);
      const firstName = user.user.personalInformation.firstname;
      const lastName = user.user.personalInformation.lastname;
      const firstNameAndLastName =
        capitalizeFirstLetter(firstName) + capitalizeFirstLetter(lastName);

      const imgProfile_Only = user.user.imgProfile;

      nameDashBoard.innerHTML = `<h3 style="font-size: 30px; padding: 15px 0;">Welcome: ${firstNameAndLastName}
      <br/> You Are Login</h3>`;

      statusNotLogin.style.display = "none";
      statusLogin.style.display = "flex";
      statusLogin.innerHTML = `
      <a href="./dashboard.html"><span>Hi ${firstNameAndLastName}!</span></a>
      <h2 onclick="logoutBtn()">Logout &nbsp; <i class="fa-regular fa-user"></i></h2>
      `;

      imgProfile_Only
        ? (imageProfileUser.innerHTML = `<img src=${imgProfile_Only} alt="">`)
        : (imageProfileUser.innerHTML = `<h4 style="color: red">Please Set Profile Image!</h4>`);

      // Update User
      updateUserShowValue();
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

if (localStorage.getItem("token") == null) {
  window.location.href = "./login.html";
}

/////// Edit Account ///////

// API url to Update User
const END_POINT_UPDATE = "http://localhost:3000/auth/update/";

const formUpdateEl = document.querySelector("[data-update-form]");
const messageEditAccount = document.querySelector("[data-message-editAccount]");

// Input For Update
const usernameUpdateInput = document.querySelector("[data-update-username]");
const emailUpdateInput = document.querySelector("[data-update-email]");
const firstnameUpdateInput = document.querySelector("[data-update-firstname]");
const lastnameUpdateInput = document.querySelector("[data-update-lastname]");
const ageUpdateInput = document.querySelector("[data-update-age]");
const countryUpdateInput = document.querySelector("[data-update-country]");
const cityUpdateInput = document.querySelector("[data-update-city]");
const streetUpdateInput = document.querySelector("[data-update-street]");
const zipcodeUpdateInput = document.querySelector("[data-update-zipcode]");

let userIdGlobal;

async function updateUserShowValue() {
  const user = await initialUser();
  userIdGlobal = user.user._id;
  usernameUpdateInput.value = user.user.username;
  emailUpdateInput.value = user.user.email;
  firstnameUpdateInput.value = user.user.personalInformation.firstname;
  lastnameUpdateInput.value = user.user.personalInformation.lastname;
  ageUpdateInput.value = user.user.age;
  countryUpdateInput.value = user.user.address.country;
  cityUpdateInput.value = user.user.address.city;
  streetUpdateInput.value = user.user.address.street;
  zipcodeUpdateInput.value = user.user.address.zipCode;
}

formUpdateEl.onsubmit = async (e) => {
  try {
    e.preventDefault();

    const formUpdateReq = {
      // username: usernameUpdateInput.value,
      // email: emailUpdateInput.value,
      address: {
        country: countryUpdateInput.value,
        city: cityUpdateInput.value,
        street: streetUpdateInput.value,
        zipCode: zipcodeUpdateInput.value,
      },
      personalInformation: {
        firstname: firstnameUpdateInput.value,
        lastname: lastnameUpdateInput.value,
      },
      age: ageUpdateInput.value,
    };
    const res = await fetch(`${END_POINT_UPDATE}${userIdGlobal}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formUpdateReq),
    });
    const data = await res.json();

    const { Message, error } = data;
    if (Message) {
      messageEditAccount.innerHTML = `<h1>${data.Message}</h1>`;
      setTimeout(() => {
        window.location.href = "./login.html";
      }, 1000);
    } else if (error) {
      messageEditAccount.innerHTML = `<h1>${data.error}</h1>`;
    }

    // console.log(data);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

// Accordion
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

/////// Delete Account ///////

// API url to Delete User
const END_POINT_DELETE = "http://localhost:3000/auth/delete/";

function openBoxDelete() {
  document.querySelector(".deleteBox").style.display = "flex";
}
function closeBoxDelete() {
  document.querySelector(".deleteBox").style.display = "none";
}

let userIdForDeleteUser;
async function DeleteAccount() {
  try {
    const user = await initialUser();
    userIdForDeleteUser = user.user._id;

    const res = await fetch(`${END_POINT_DELETE}${userIdForDeleteUser}`, {
      method: "DELETE",
    });
    const data = await res.json();

    document.querySelector(".messageDeleteBox").style.display = "flex";

    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 2000);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

/////// Add Brand ///////

// API url to Add Brand
const END_POINT_ADD_BRAND = "http://localhost:3000/brand";

const formAddBrandEl = document.querySelector("[data-addBrand-form]");
const messageAddBrand = document.querySelector("[data-message-addBrand]");

// Input
const imageAddBrandInput = document.querySelector("[data-addBrand-image]");
const nameAddBrandInput = document.querySelector("[data-addBrand-name]");
const btnAddBrand = document.querySelector("[data-addBrand-button]");

formAddBrandEl.onsubmit = async (e) => {
  try {
    e.preventDefault();

    const formAddBrandReq = {
      image: imageAddBrandInput.value,
      name: nameAddBrandInput.value,
    };

    const res = await fetch(`${END_POINT_ADD_BRAND}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formAddBrandReq),
    });
    const data = await res.json();
    console.log(data);

    const { Message, error } = data;

    if (Message) {
      messageAddBrand.innerHTML = `<h1>${data.Message}!</h1>`;
      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 1000);
    } else if (error) {
      messageAddBrand.innerHTML = `<h1>${data.error}!</h1>`;
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

/////// Add Product ///////

// API url to Add Product
const END_POINT_ADD_PRODUCT = "http://localhost:3000/shoe";

// Api Url All Brands
const END_POINT_ALL_BRANDS = "http://localhost:3000/brand/all";

const formAddProductEl = document.querySelector("[data-addProduct-form]");
const messageAddProduct = document.querySelector("[data-message-addProduct]");

// Input
const imageAddProductInput = document.querySelector("[data-addProduct-image]");
const nameAddProductInput = document.querySelector("[data-addProduct-name]");
const sizeAddProductInput = document.querySelector("[data-addProduct-size]");
const nameBrandAddProductInput = document.querySelector(
  "[data-addProduct-nameBrand]"
);
const priceAddProductInput = document.querySelector("[data-addProduct-price]");

const optionsBrandAddProduct = document.querySelector(
  "[data-addProduct-optionBrand]"
);

async function getAllBrandsForOptions() {
  try {
    const res = await fetch(`${END_POINT_ALL_BRANDS}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

async function allBrandsOptions() {
  try {
    const allBrands = await getAllBrandsForOptions();
    // console.log(allBrands);

    const brandsElement = allBrands.map((brand) => {
      return `<option value="${brand._id}">${brand.name}</option>`;
    });
    optionsBrandAddProduct.innerHTML = brandsElement.join("");
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}
allBrandsOptions();

formAddProductEl.onsubmit = async (e) => {
  try {
    e.preventDefault();

    const formAddProductReq = {
      image: imageAddProductInput.value,
      name: nameAddProductInput.value,
      size: sizeAddProductInput.value,
      brandName:
        optionsBrandAddProduct.options[optionsBrandAddProduct.selectedIndex]
          .text,
      price: priceAddProductInput.value,
      brand: optionsBrandAddProduct.value,
    };

    const res = await fetch(`${END_POINT_ADD_PRODUCT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formAddProductReq),
    });
    const data = await res.json();
    console.log(data);

    const { Message, error } = data;
    if (Message) {
      messageAddProduct.innerHTML = `<h1>${data.Message}</h1>`;
      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 1000);
    } else if (error) {
      messageAddProduct.innerHTML = `<h1>${data.error}!</h1>`;
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

initialApp();
