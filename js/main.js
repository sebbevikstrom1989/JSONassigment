const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

const APP_ID = "f41eee30";
const APP_key = "bf1fc02e2b3076b3b34480aa2755784f";
let searchQuery = "";
let searchLimit = "";
let searchMeal = "";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Check for the different value before seraching
  searchQuery = e.target.querySelector("input").value;
  searchLimit = document.querySelector("#limit").value;
  searchMeal = document.querySelector("#mealtype").value;

  //When enter is pushed the API will be fetched
  fetchAPI();
});

//Fetch function
async function fetchAPI() {
  //Take the different selected value from serach and select boxes and put it in the URL after search.
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=${searchLimit}&mealType=${searchMeal}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

//Generate the different HTML elements i want.
function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";

  //Mapping so i just get the information i want to display after the element is created.
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(1)}</p>
        <p class="item-data">Meal Type: ${result.recipe.mealType}</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
