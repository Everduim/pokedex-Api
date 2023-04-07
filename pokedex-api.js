const main = document.querySelector("main");
const input = document.querySelector("#buscador");

const getPokemon = async () => {
  const link = "https://pokeapi.co/api/v2/pokemon/";
  const pokemons = [];
  console.log(pokemons);
  for (let numeroPokemon = 1; numeroPokemon <= 150; numeroPokemon++) {
    const pokemonsResponse = await fetch(`${link}${numeroPokemon}`);
    const pokemonsJson = await pokemonsResponse.json();
    pokemons.push(pokemonsJson);
  }
  return pokemons;
};

const mapeo = (pokemons) => {
  const mapear = pokemons.map((pokemon) => ({
    nombre: pokemon.name,
    imagen: pokemon.sprites.front_default,
    tipo: pokemon.types[0].type.name,
    id: pokemon.id,
  }));
  return mapear;
};

const div$$ = document.querySelector(".container");
const h1$$ = document.querySelector(".titulo");

const draw = (results) => {
  div$$.innerHTML = "";
  for (const resultado of results) {
    div$$.innerHTML += `
            <div class="carta">
            <h1 class="nombre">${resultado.nombre}</h1>
            <ol class="tipo">${resultado.tipo}</ol>
            <img class="imagen" src='${resultado.imagen}'>
            <ol class="id">#${resultado.id}</ol>
            
            
    </div>`;
  }
};

const searchPokemons = (mapeados) => {
  input.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    const filtroPokemons = mapeados.filter((results) => {
      return results.nombre.includes(inputValue);
    });
    console.log(filtroPokemons);
    draw(filtroPokemons);
  });
};

const init = async () => {
  const results = await getPokemon();
  const mapeados = mapeo(results);
  draw(mapeados);
  searchPokemons(mapeados);
};
init();
