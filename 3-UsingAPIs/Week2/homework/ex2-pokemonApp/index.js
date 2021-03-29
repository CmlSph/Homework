const buttonGetPokemon = document.createElement('button');
document.body.appendChild(buttonGetPokemon);

buttonGetPokemon.setAttribute('type', 'submit');
buttonGetPokemon.textContent = 'Get Pokemon!';

const form = document.createElement('form');
document.body.appendChild(form);

const selectPokemon = document.createElement('select');
form.appendChild(selectPokemon);

const pokemonImage = document.createElement('img');

async function fetchData(url) {
  // TODO complete this function
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function fetchAndPopulatePokemons(element) {
  // TODO complete this function
  element.forEach((pokemon) => {
    const option = document.createElement('option');
    selectPokemon.appendChild(option);
    option.value = pokemon.name;
    option.textContent = pokemon.name;
  });
}

selectPokemon.addEventListener('click', fetchImage);

async function fetchImage() {
  // TODO complete this function
  const urlOfThePokemonImages = `https://pokeapi.co/api/v2/pokemon/${selectPokemon.value}`;
  const response = await fetch(urlOfThePokemonImages);
  const imageOfThePokemon = await response.json();
  const imagePokemon = imageOfThePokemon.sprites.front_default;
  document.body.appendChild(pokemonImage).src = imagePokemon;
}

buttonGetPokemon.addEventListener('click', main);

async function main() {
  // TODO complete this function
  try {
    const data = await fetchData(
      'https://pokeapi.co/api/v2/pokemon/?limit=151'
    );
    fetchAndPopulatePokemons(data);
  } catch (error) {
    console.log(error);
  }
}
