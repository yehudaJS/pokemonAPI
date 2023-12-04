let pokemons = [];
ajaxRequest();

async function ajaxRequest() {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon");
        pokemons = await response.json();
        console.log(pokemons.results);
        displayPokemons(pokemons);
        getTheAbilities(pokemons)
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}

function displayPokemons(pokemons){
    let content = "";
    for (const pokemon of pokemons.results) {
        content+=`
                <li>${pokemon.name}</li>

                `
    }
  
    document.getElementById("allPokemons").innerHTML = content;
}

//-------------------------

function search() {
    let input = document.getElementById("searchBox").value
    ajaxRequestSearch(input)
}


async function ajaxRequestSearch(input) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        searchPokemon = await response.json();
        displayPokemonSearch(searchPokemon);
    } catch (error) {
        console.error('Something went wrong:', error);
    }
}

function  displayPokemonSearch(searchPokemon) {
    console.log(searchPokemon);

    let abilitiesArr = searchPokemon.abilities.map(key => key.ability.name)
    let movesArr = searchPokemon.moves.map(key => key.move.name)
    let pic = searchPokemon.sprites.other[`official-artwork`].front_default

    let content = `
        <h1>name : ${searchPokemon.forms[0].name}</h1>
        <p> Type : ${searchPokemon.types[0].type.name}</p>
        <p> Abilities : ${abilitiesArr.join(" | ")} </p>
        <p> Moves : ${movesArr.join(" , ")}</p>
        <img src="${pic}" alt="${searchPokemon.forms[0].name}">
    `
  
    document.getElementById("searchArea").innerHTML += content;
    
}

 async function getTheAbilities(pokemons) {
    let abilitiesArr = []
    for (let i = 0; i < 200; i++) {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        key = await response.json();
       // abilitiesArr += key.abilities.map(key => key.ability.name)
        abilitiesArr = abilitiesArr.concat(key.abilities.map(key => key.ability.name));

    } catch (error) {
        console.error('Something went wrong:', error);
    }
  }
    console.log(abilitiesArr);
    console.log("oved");
   // document.write(abilitiesArr.join(" | "))
   console.log(abilitiesArr.join(" | "));
   findMostCommonWord(abilitiesArr)
}


function findMostCommonWord(abilitiesArr) {
    // יצירת אובייקט לספירת מספר המילים במערך/
    const wordCount = {};

    // מעבר על כל מחרוזת במערך
    abilitiesArr.forEach((str) => {
        // הפרדת המילים במחרוזת
        const words = str.split(/\s+/);

        // ספירת מספר המילים באמצעות אובייקט
        words.forEach((word) => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
    });

    // מציאת המילה הנפוצה ביותר
    let mostCommonWord = '';
    let maxCount = 0;

    for (const word in wordCount) {
        if (wordCount[word] > maxCount) {
            mostCommonWord = word;
            maxCount = wordCount[word];
        }
    }
    console.log(mostCommonWord);
    console.log("ovad2");
    return mostCommonWord;
}

// דוגמה לשימוש
const stri = ["hello world", "world of programming", "hello programming", "programming is fun"];
const mostCommonWord = findMostCommonWord(stri);
console.log("The most common word is:", mostCommonWord);
