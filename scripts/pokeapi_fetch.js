let currentPokemonId = 1;
const boton = document.getElementById('Encender');
const pantalla = document.getElementById('pantalla');
let encendido = new Boolean(false);
let audio = document.getElementById("pokemonThemeAudio");


function fetchPokemonImage() {
  
    // URL de la API para el primer Pokémon (Bulbasaur)
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemonId}`;

    // Realizar la solicitud fetch a la API
    fetch(apiUrl)
        .then(response => response.json())  // Convertir la respuesta a JSON
        .then(data => {
            // Obtener la URL de la imagen del Pokémon
            const pokemonImageUrl = data.sprites.front_default;

            // Mostrar la imagen en el elemento img
            document.getElementById('pokemonImage').src = pokemonImageUrl;
      
        })
        .catch(error => {
            console.error('Error al obtener la imagen del Pokémon:', error);
        });
}

function goNext() {

  if (encendido == true) {
    currentPokemonId++;
    fetchPokemonImage();
  }
  else {
    alert("Enciende la consola");
  }
}
function goBack() {

  if (encendido == true) {
    if(currentPokemonId == 1) {
      alert("No hay pokemon anteriores a Bulbasaur");
    } else {
      currentPokemonId = currentPokemonId - 1;
  
      fetchPokemonImage();
    }
  }
}



// boton.addEventListener('click', function() {
//   pantalla.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/fondo-efecto-zoom-degradado-azul_23-2149762303.jpg?semt=ais_hybrid')";
// });


function EncenderGameboy() {
  if (encendido == false) {
    encendido = true;
    playAudio();
    pantalla.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/fondo-efecto-zoom-degradado-azul_23-2149762303.jpg?semt=ais_hybrid')";
    fetchPokemonImage();

  }
  else {
    encendido = false;
    apagarPantalla();
  }
}

function apagarPantalla() {
  stopAudio();
  pantalla.style.backgroundImage = "";
  document.getElementById('pokemonImage').src = "";
  currentPokemonId = 1;
}

function playAudio() {
  audio.play();
}

function stopAudio() {
  audio.pause();    
  audio.currentTime = 0;
}