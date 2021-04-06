async function fetchData(url) {
  // TODO complete this function
  const response = await fetch(url);
  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    console.log(response.status);
    return;
  }
}

function fetchAndPopulatePokemons(pokemonsArray) {
  // TODO complete this function
  let selectPokemon = document.querySelector('select');

  pokemonsArray.results.forEach((pokemon, index) => {
    const option = document.createElement('option');
    option.textContent = pokemon.name;
    selectPokemon.appendChild(option);
    option.value = index;
  });
  selectPokemon.addEventListener('change', function (event) {
    index = selectPokemon[selectPokemon.selectedIndex].innerText;
    fetchImage(index);
  });
}

async function fetchImage(nameOfThePokemon) {
  // TODO complete this function
  try {
    const response = await fetchData(
      `https://pokeapi.co/api/v2/pokemon/${nameOfThePokemon}`
    );
    const result = await response;
    const image = document.querySelector('img');
    image.src = result.sprites.front_default;
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  // TODO complete this function
  const buttonGetPokemon = document.createElement('button');
  document.body.appendChild(buttonGetPokemon);

  buttonGetPokemon.setAttribute('type', 'submit');
  buttonGetPokemon.textContent = 'Get Pokemon!';

  const selectPokemon = document.createElement('select');
  document.body.appendChild(selectPokemon);

  const pokemonImage = document.createElement('img');
  document.body.appendChild(pokemonImage);
  pokemonImage.style.display = 'block';

  try {
    buttonGetPokemon.addEventListener('click', async () => {
      const response = await fetchData(
        'https://pokeapi.co/api/v2/pokemon/?limit=151'
      );
      fetchAndPopulatePokemons(response);
    });
  } catch (error) {
    console.log(`Ooops, something went wrong! ${error}`);
    document.body.append(error);
  }
}
window.onload = main();
