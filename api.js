document.addEventListener('DOMContentLoaded', function () {
    function getRandomPokemon() {
        return new Promise((resolve, reject) => {
            try {
                const ran = Math.floor(Math.random() * 807) + 1;
                const apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + ran + '/';

                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Fallo de conexion con la pokedex: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    function revealColor() {
        const imageElement = document.getElementById('pokemon-image');
        imageElement.style.filter = 'brightness(100%)';
    }

    getRandomPokemon()
        .then(data => {
            try {
                const pokemonName = data.name;
                const imageUrl = data.sprites.front_default;

                const nameElement = document.getElementById('pokemon-name');
                nameElement.textContent = `¡EEEEEEEES: ${pokemonName}!`;

                const imageElement = document.getElementById('pokemon-image');
                imageElement.src = imageUrl;

                imageElement.style.width = '500px';
                imageElement.style.height = '500px';

                nameElement.style.display = 'none';

                let eventoDisparado = false;

                imageElement.addEventListener('click', function () {
                    if (!eventoDisparado) {
                        eventoDisparado = true;
                        nameElement.style.display = 'block';
                        revealColor();
                    }
                });
            } catch (error) {
                throw new Error(`El click no funciona porque el Team Rocket a saboteado la web: ${error}`);
            }
        })
        .catch(error => {
            console.error('Los pokemon han escapado:', error);
            const pokemonInfo = document.getElementById('pokemon-info');
            pokemonInfo.innerHTML = '<p>Pokerror: el profesor Oak está triste...</p>';
        });
});