let input = document.getElementById("inp");
let button = document.getElementById("btn");
let result = document.querySelector(".result");

function action() {
  let url = `https://restcountries.com/v3.1/name/${input.value}?fullText=true`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
        <img class="banner" src="${data[0].flags.svg}" />
        <div class="title">${data[0].name.common}</div>
        <div class="data">Capital: <span>${data[0].capital[0]}</span></div>
        <div class="data">Continent: <span>${data[0].continents[0]}</span></div>
        <div class="data">Population: <span>${data[0].population}</span></div>
        <div class="data">Currency: <span>
        ${data[0].currencies[Object.keys(data[0].currencies)].name} - 
        ${Object.keys(data[0].currencies)[0]}
        </span></div>
        <div class="data">Common-Lnaguages: <span>
        ${Object.values(data[0].languages).toString().split(",").join(", ")}
        </span></div>
        `;
    })
    .catch(() => {
      input.value.length === 0
        ? (result.innerHTML = `<strong>The input field cannot be empty</strong>`)
        : (result.innerHTML = `<strong>Please enter a valid country name.</strong>`);
    });
}

button.addEventListener("click", action);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") action();
});
