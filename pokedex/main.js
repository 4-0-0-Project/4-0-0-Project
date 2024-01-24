import './style.css'

const getPokemon = async (pokemon) =>{
 try{
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if(!response) throw Error(`Error: ${response.status}`)
  const pokemonData = await response.json()
  console.log(pokemonData)
  return pokemonData;
 } catch(error) {
  console.log(error.message)
 }
}

const renderPokemonPopUp = async(pokemonData) => {
  const contain = document.getElementsByClassName('img-container')
  const img = document.createElement('img')
  img.src = await pokemonData.sprites.front_default
  contain.append(img)
  
}

const searchForPokemon = async (e) => {
e.preventDefault();

const form = e.target;
const formData = new FormData(form);
const formObj = Object.fromEntries(formData);

const pokemondata = getPokemon(formObj.pokemon)
renderPokemonPopUp(pokemondata)

form.reset()
}

const main = () => {
  const form = document.getElementById('pokemon-search-bar')
  form.addEventListener('submit', searchForPokemon)
}

main()