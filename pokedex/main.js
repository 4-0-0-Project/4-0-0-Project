import './style.css'

const getPokemon = async (pokemon) =>{
 try{
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if(!response) throw Error(`Error: ${response.status}`)
  const pokemonData = await response.json()
  // console.log(pokemonData)
  return pokemonData;
 } catch(error) {
  console.log(error.message)
 }
}

 
// pokemon Details function
const renderPokemonDetails = async (pokemonData) => {
  const popUp = document.getElementById('pop-up')


  //set image
  const img = document.getElementById('pop-up-img');
  img.src = pokemonData.sprites.front_default;

  //update content of existing p tags
  const nameP = document.getElementById('pop-up-name');
  nameP.textContent = `Name: ${pokemonData.name}`;

  const typeP = document.getElementById('pop-up-type');
  typeP.textContent = `Type: ${pokemonData.types.map(type => type.type.name).join(', ')}`;

  const heightP = document.getElementById('pop-up-height');
  heightP.textContent = `Height: ${pokemonData.height}`;

  const weightP = document.getElementById('pop-up-weight');
  weightP.textContent = `Weight: ${pokemonData.weight}`;

  const abilitiesP = document.getElementById('pop-up-abilities');
  abilitiesP.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`



  // const details = document.createElement('div')
  // details.innerHTML = `
  // <p>Name: ${pokemonData.name}</p>
  // <p>Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
  // <p>Height: ${pokemonData.height}</p>
  // <p>Weight: ${pokemonData.weight}</p>
  // <p>Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
  // `

  // popUp.innerHTML = '';
  // popUp.appendChild(details);

}


const renderPokemonPopUp = async (pokemonData) => {
  const img = document.querySelector('#pop-up>img')
  img.src = pokemonData.sprites.front_default;
  renderPokemonDetails(pokemonData);
}


// const renderPokemonPopUp = async(pokemonData) => {
//   const img = document.querySelector('#pop-up>img')
//   img.src = pokemonData.sprites.front_default;
// }

const searchForPokemon = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const formObj = Object.fromEntries(formData);

  const pokemondata = await getPokemon(formObj.pokemon)
  renderPokemonPopUp(pokemondata)
  renderPokemonDetails(pokemondata)

  form.reset()
}

const main = () => {
  const form = document.getElementById('pokemon-search-bar')
  form.addEventListener('submit', searchForPokemon)
}

main()