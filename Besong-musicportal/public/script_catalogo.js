document.addEventListener('DOMContentLoaded', function() {
    const musicians = [
        { name: 'Cabeção', genre: 'rock', type: 'Banda', photo: 'imagens/cabecao.jpg', portfolio: 'portfolio/cabecao.html' },
        { name: 'Liberdade Sinfonia', genre: 'MPB', type: 'Banda', photo: 'imagens/liberdade.jpg', portfolio: 'portfolio/liberdade.html' },
        { name: 'Amélia', genre: 'pagode', type: 'Artista Solo', photo: 'imagens/amelia.jpg', portfolio: 'portfolio/amelia.html' },
        { name: 'Carlos Castro', genre: 'classica', type: 'Artista Solo', photo: 'imagens/carlos_castro.jpg', portfolio: 'portfolio/carlos_castro.html' },
        { name: 'Chad', genre: 'rock', type: 'Artista Solo', photo: 'imagens/chad.jpg', portfolio: 'portfolio/chad.html' },
        { name: 'Emily Batista', genre: 'MPB', type: 'Artista Solo', photo: 'imagens/emily_batista.jpg', portfolio: 'portfolio/emily_bastita.html' }
    ];

    const genreFilter = document.getElementById('genre-filter');
    const nameSearch = document.getElementById('name-search');
    const musicianList = document.getElementById('musician-list');

    function displayMusicians(filterGenre, filterName) {
        musicianList.innerHTML = '';
        let filteredMusicians = musicians;

        if (filterGenre !== 'todos') {
            filteredMusicians = filteredMusicians.filter(musician => musician.genre === filterGenre);
        }

        if (filterName) {
            filteredMusicians = filteredMusicians.filter(musician => musician.name.toLowerCase().includes(filterName.toLowerCase()));
        }

        filteredMusicians.forEach(musician => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${musician.portfolio}" target="_blank">
                    <img src="${musician.photo}" alt="Foto de ${musician.name}">
                    <h2>${musician.name}</h2>
                    <p>Gênero: ${musician.genre}</p>
                    <p>Tipo: ${musician.type}</p>
                </a>`;
            musicianList.appendChild(li);
        });
    }

    genreFilter.addEventListener('change', function() {
        displayMusicians(this.value, nameSearch.value);
    });

    nameSearch.addEventListener('input', function() {
        displayMusicians(genreFilter.value, this.value);
    });

    // Exibe todos os músicos ao carregar a página
    displayMusicians('todos', '');
});
