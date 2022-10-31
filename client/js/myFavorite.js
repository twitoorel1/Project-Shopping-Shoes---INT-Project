const allFavoriteEl = document.querySelector("[data-container-favorite]");

const END_POINT_ALLSHOES = "http://localhost:3000/shoe/all";

const btnDeleteAllFavorite = document.querySelector(
  "[data-delete-allFavorite]"
);

let basket = JSON.parse(localStorage.getItem("favoriteShoe")) || [];

async function shoeFavorite() {
  try {
    const res = await fetch(`${END_POINT_ALLSHOES}`);
    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

async function shoesFavorite() {
  try {
    buttonDeleteAllFavorite();

    const allShoes = await shoeFavorite();
    // console.log(allShoes);
    if (basket.length !== 0) {
      return (allFavoriteEl.innerHTML = basket
        .map((x) => {
          let search = allShoes.find((y) => {
            return y._id == x;
          });
          // console.log(search);
          return `
        <div class="box-shoe">
        <span><i onclick="deleteShoeFromFavorite('${search._id}')" class="fa-solid fa-x"> DELETE</i></span>
        <img src=${search.image} />
        <div class="head-box">
          <h1>Brand: ${search.brandName}</h1>
          <h1>Price: ${search.price}$</h1>
        </div>
        <h1>${search.name}</h1>
        <h3>Sizes: <span>${search.size} Eu</span></h3>
      </div>
        `;
        })
        .join(""));
    } else {
      allFavoriteEl.innerHTML = `<h1>Shoe Favorite Empty!</h1>`;
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

function deleteShoeFromFavorite(id) {
  basket = basket.filter((x) => x !== id);
  shoesFavorite();
  localStorage.setItem("favoriteShoe", JSON.stringify(basket));
}

btnDeleteAllFavorite.onclick = () => {
  localStorage.removeItem("favoriteShoe");
  setTimeout(() => {
    window.location.href = "./myFavorite.html";
  }, 1000);
};

function buttonDeleteAllFavorite() {
  if (localStorage.getItem("favoriteShoe")) {
    btnDeleteAllFavorite.style.display = "flex";
  } else {
    btnDeleteAllFavorite.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", shoesFavorite);
