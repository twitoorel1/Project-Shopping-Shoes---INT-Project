// API url to All Shoes
const END_POINT_ALLSHOES = "http://localhost:3000/shoe/all";

// APi url to Delete Shoe
const END_POINT_DELETE_SHOE = "http://localhost:3000/shoe/delete";

const allShoesEl = document.querySelector("[data-container-shoes]");

const messageErrorShoePage = document.querySelector("[data-messageError-Shoe]");
const messageGoodShoePage = document.querySelector("[data-messageGood-shoe]");

// async function requestShoesApi() {
//   try {
//     const res = await fetch(`${END_POINT_ALLSHOES}`);
//     const data = await res.json();
//     return data.data;
//   } catch (error) {
//     console.log(error);
//     console.log(error.message);
//   }
// }

// async function getAllShoes() {
//   try {
//     const allShoes = await requestShoesApi();
//     // console.log(allShoes);
//     const shoesElement = allShoes.map(
//       (shoe) => `
// <div class="box-shoe">
// <img src=${shoe.image} alt="${shoe.name}" />
// <div class="head-box">
//     <h1>Brand: ${shoe.brandName}</h1>
//     <h1>Price: ${shoe.price}$</h1>
// </div>
// <h1>${shoe.name}</h1>
// <div class="sizesAvailable">
//     <h3>Sizes Available:</h3>
//     <span>${shoe.size}</span>
// </div>
// <button class="buttonFavorite" onclick="btnClickShoes('${shoe._id}', '${shoe.name}')">
// My Favorite <i class="fa-regular fa-heart"></i>
// </button>
// </div>
//   `
//     );
//     allShoesEl.innerHTML = shoesElement.join("");
//   } catch (error) {
//     console.log(error);
//     console.log(error.message);
//   }
// }

const buttonFavorite = document.querySelector(".buttonFavorite");

function getAllShoes() {
  fetch(END_POINT_ALLSHOES)
    .then((res) => res.json())
    .then((shoes) => renderShoes(shoes));
}

function renderShoes(shoes) {
  // console.log(shoes.data);
  const shoeShort = shoes.data;
  if (shoeShort.length === 0) {
    allShoesEl.innerHTML = `<h1>Shoes Not Found!</h1>`;
  } else {
    const shoesElement = shoeShort.map(
      (shoe) => `
      <div class="box-shoe">
      <span><i onclick="deleteShoe('${shoe._id}')" class="fa-solid fa-trash"></i></span>
      <img src=${shoe.image} alt="${shoe.name}" />
      <div class="head-box">
          <h1>Brand: ${shoe.brandName}</h1>
          <h1>Price: ${shoe.price}$</h1>
      </div>
      <h1>${shoe.name}</h1>
      
      <h3>Sizes: <span>${shoe.size} Eu</span></h3>

      <button onclick="addToFavoriteShoe('${shoe._id}')" class="buttonFavorite">
      Add To My Favorite <i class="fa-regular fa-heart"></i>
      </button>
      </div>
    `
    );
    allShoesEl.innerHTML = shoesElement.join("");
  }
}
messageErrorShoePage.style.display = "none";
messageGoodShoePage.style.display = "none";
function addToFavoriteShoe(id) {
  if (localStorage) {
    let favoriteShoe;
    if (!localStorage["favoriteShoe"]) favoriteShoe = [];
    else favoriteShoe = JSON.parse(localStorage["favoriteShoe"]);
    if (!(favoriteShoe instanceof Array)) favoriteShoe = [];

    if (!favoriteShoe.includes(id)) {
      favoriteShoe.push(id);
      localStorage.setItem("favoriteShoe", JSON.stringify(favoriteShoe));
      messageGoodShoePage.style.display = "flex";
      setTimeout(() => {
        messageGoodShoePage.style.display = "none";
      }, 5000);
      document.activeElement.className = "activeBtn";
    } else {
      // console.log("There is such an ID on the localstorage", id);
      messageErrorShoePage.style.display = "flex";
      setTimeout(() => {
        messageErrorShoePage.style.display = "none";
      }, 5000);
      console.log(document.activeElement);
      document.activeElement.className = "activeBtn";
    }
  }
}

// function messageErrorButton() {
//   if (localStorage.getItem("favoriteShoe")) {
//     messageErrorShoePage.style.display = "flex";
//   } else if (!localStorage.getItem("favoriteShoe")) {
//     messageErrorShoePage.style.display = "flex";
//   }
// }
// messageErrorButton();

async function deleteShoe(id) {
  try {
    const res = await fetch(`${END_POINT_DELETE_SHOE}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setTimeout(() => {
      window.location.href = "./allShoes.html";
    }, 500);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

window.addEventListener("DOMContentLoaded", getAllShoes);
