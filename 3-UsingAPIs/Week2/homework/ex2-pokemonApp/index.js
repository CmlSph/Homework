'use strict';
/*------------------------------------------------------------------------------
Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populates the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Try and avoid using global variables. Instead, use function parameters and 
return values to pass data back and forth.
------------------------------------------------------------------------------*/
function main() {
  // TODO complete this function
  const buttonGetPokemon = document.createElement('button');
  buttonGetPokemon.id = 'myButton';
  buttonGetPokemon.innerText = 'Get Pokemon';
  document.body.appendChild(buttonGetPokemon);
  const pokemonSelect = document.createElement('select');
  pokemonSelect.id = 'pokemon';
  document.body.appendChild(pokemonSelect);
  const imageOfThePokemon = document.createElement('img');
  imageOfThePokemon.id = 'pokemonImage';
  document.body.appendChild(imageOfThePokemon);
  pokemonImage.style.display = 'block';
  let pokemonsArray;
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  function fetchData() {
    // TODO complete this function
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        pokemonsArray = jsonData.results;
        fetchAndPopulatePokemons(pokemonsArray);
      });
  }
  buttonGetPokemon.addEventListener('click', fetchData);
  function fetchAndPopulatePokemons(array) {
    // TODO complete this function
    array.forEach((element, index) => {
      const pokemonOptions = document.createElement('option');
      pokemonOptions.innerText = element.name;
      pokemonSelect.appendChild(pokemonOptions);
      pokemonOptions.value = index;
    });
  }
  function fetchImage(event) {
    // TODO complete this function
    const urlOfThePokemonImages = pokemonsArray[event.target.value].url;
    fetch(urlOfThePokemonImages)
      .then((response) => response.json())
      .then((data) => {
        imageOfThePokemon.src = data.sprites.front_default;
      });
  }
  pokemonSelect.addEventListener('change', fetchImage);
}
window.onload = main();
