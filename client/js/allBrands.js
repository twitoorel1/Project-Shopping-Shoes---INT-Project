// API url to All Brands
const END_POINT_ALLSHOES = "http://localhost:3000/brand/all";

// Api url to Delete Brand
const END_POINT_DELETE_BRAND = "http://localhost:3000/brand/delete";

const allBrandsEl = document.querySelector("[data-container-brands]");

async function requestBrandsApi() {
  try {
    const res = await fetch(`${END_POINT_ALLSHOES}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

async function getAllBrands() {
  const allBrands = await requestBrandsApi();
  // console.log(allBrands);
  if (allBrands.length === 0) {
    allBrandsEl.innerHTML = `<h1>Brands Not Found!</h1>`;
  } else {
    const brandsElement = allBrands.map(
      (brand) => `
      <div class="box-brand">
      <span><i onclick="deleteBrand('${brand._id}')" class="fa-solid fa-trash"></i></span>
      <img src=${brand.image} alt="${brand.name}" />
      <div class="head-box">
        <h1>Name Company: <span>${brand.name}</span></h1>
      </div>
    </div>
    `
    );
    allBrandsEl.innerHTML = brandsElement.join("");
  }
}

async function deleteBrand(id) {
  try {
    const res = await fetch(`${END_POINT_DELETE_BRAND}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setTimeout(() => {
      window.location.href = "./allBrands.html";
    }, 500);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

window.addEventListener("DOMContentLoaded", getAllBrands);
