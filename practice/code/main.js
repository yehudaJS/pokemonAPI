let pokemons = [];
ajaxRequest();

async function ajaxRequest() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon");
        pokemons = await response.json();
        console.log(pokemons);
        displayPokemons(pokemons);
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}

function displayPokemons(pokemons){
    let content = "";
    for (const pokemon of pokemons) {
        const li = createUl(pokemon);
        content += pokemon;
    }
    console.log(content);
    document.getElementById("allPokemons").innerHTML = content;
}

function createUl(pokemon) {
    let pok = `<li>${pokemon.name}<li/>`
    return pok
}