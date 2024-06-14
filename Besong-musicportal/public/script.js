document.addEventListener('DOMContentLoaded', function() {
    const musicoForm = document.getElementById('musicoForm');

    musicoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch('http://localhost:3000/api/artista', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Erro ao cadastrar músico.');
        });
    });

    if (document.getElementById('musicosList')) {
        fetch('http://localhost:3000/api/artista')
            .then(response => response.json())
            .then(data => {
                const musicosList = document.getElementById('musicosList');
                musicosList.innerHTML = '';
                data.forEach(musico => {
                    const musicoDiv = document.createElement('div');
                    musicoDiv.innerHTML = `
                        <h3>${musico.nome}</h3>
                        <p>${musico.estilo_musical}</p>
                        <a href="musico.html?id=${musico.id}">Ver Detalhes</a>
                    `;
                    musicosList.appendChild(musicoDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });

        document.getElementById('filterEstilo').addEventListener('input', function() {
            const estilo = this.value;
            if (estilo === '') {
                fetch('http://localhost:3000/api/artista')
                    .then(response => response.json())
                    .then(data => {
                        const musicosList = document.getElementById('musicosList');
                        musicosList.innerHTML = '';
                        data.forEach(musico => {
                            const musicoDiv = document.createElement('div');
                            musicoDiv.innerHTML = `
                                <h3>${musico.nome}</h3>
                                <p>${musico.estilo_musical}</p>
                                <a href="musico.html?id=${musico.id}">Ver Detalhes</a>
                            `;
                            musicosList.appendChild(musicoDiv);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                fetch(`http://localhost:3000/api/artista/estilo/${estilo}`)
                    .then(response => response.json())
                    .then(data => {
                        const musicosList = document.getElementById('musicosList');
                        musicosList.innerHTML = '';
                        data.forEach(musico => {
                            const musicoDiv = document.createElement('div');
                            musicoDiv.innerHTML = `
                                <h3>${musico.nome}</h3>
                                <p>${musico.estilo_musical}</p>
                                <a href="musico.html?id=${musico.id}">Ver Detalhes</a>
                            `;
                            musicosList.appendChild(musicoDiv);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    }

    if (window.location.pathname.endsWith('musico.html')) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        fetch(`http://localhost:3000/api/artista/${id}`)
            .then(response => response.json())
            .then(musico => {
                document.getElementById('musicoFoto').src = `img/${musico.foto}`; // Certifique-se de que as fotos estejam na pasta img
                document.getElementById('musicoNome').innerText = musico.nome;
                document.getElementById('musicoEmail').innerText = musico.email;
                document.getElementById('musicoTelefone').innerText = musico.telefone;
                document.getElementById('musicoEstilo').innerText = musico.estilo_musical;
                document.getElementById('musicoInstagram').href = musico.instagram;
                document.getElementById('musicoInstagram').innerText = 'Instagram';
                document.getElementById('musicoYoutube').innerHTML = `<iframe width="560" height="315" src="${musico.youtube}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                document.getElementById('musicoPortfolio').innerText = musico.portfolio;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});