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
 const renderAllPokemon = async(allPokemonData) => {
  const ul = document.getElementById('pokemon-ul')
  allPokemonData.forEach(async(pokemon) =>{
    const currPokemon = await getPokemon(pokemon.name)
    console.log(currPokemon)
    let li = document.createElement('li')
    let img = document.createElement('img')
    let p = document.createElement('p')

    img.src = currPokemon.sprites.front_default
    p.textContent = pokemon.name
    li.classList.add('poke-card', 'flex-item') 
    li.appendChild(img)
    li.appendChild(p)
    ul.appendChild(li)
  })
}

const popUp = document.getElementById('pop-up') //global so it can access anywhere
const getAllPokemon = async () =>{
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`)
    if(!response) throw Error(`Error: ${response.status}`)
    const pokemonData = await response.json()
    console.log(pokemonData.results)
    return pokemonData.results;
   } catch(error) {
    console.log(error.message)
   }
} 
// pokemon Details function

const renderPokemonDetails = async (pokemonData) => {
 
  

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
  
}


const renderPokemonPopUp = async (pokemonData) => {
  const img = document.querySelector('#pop-up>img')
  img.src = pokemonData.sprites.front_default;
  renderPokemonDetails(pokemonData);
  popUp.style.display = 'block'     // parent container for pop up is default invisible - becomes visible when submit 
  
}


// const renderPokemonPopUp = async(pokemonData) => {
//   const img = document.querySelector('#pop-up>img')
//   img.src = pokemonData.sprites.front_default;
// }

const searchForPokemon = async (e) => {
  e.preventDefault();
  e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);

  const pokemondata = await getPokemon(formObj.pokemon)
  renderPokemonPopUp(pokemondata)
  renderPokemonDetails(pokemondata)

  form.reset()
}

const main = async() => {
  const form = document.getElementById('pokemon-search-bar')
  form.addEventListener('submit', searchForPokemon)
  const allPokemon = await getAllPokemon()
  renderAllPokemon(allPokemon)
}

main()