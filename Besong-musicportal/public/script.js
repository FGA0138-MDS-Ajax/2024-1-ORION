document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('musicoForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('musicoNome').value;
        const usuario = document.getElementById('usuario').value;
        const telefone = document.getElementById('musicoTelefone').value;
        const email = document.getElementById('musicoEmail').value;
        const generoMusical = document.getElementById('musicoGenero').value;
        const regiao = document.getElementById('musicoRegiao').value;
        const ytLink = document.getElementById('ytLink').value;
        const spotifyLink = document.getElementById('spotifyLink').value;
        const instagramLink = document.getElementById('instaLink').value;
        const wppLink = document.getElementById('wppLink').value;
        const senha = document.getElementById('senha').value;
        const senhaConfirmada = document.getElementById('confirmeSenha').value;
        const descricao = document.getElementById('descricao').value;
        const isBanda = document.getElementById('isBanda').value;

        fetch('http://54.242.81.142:80/api/musicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nome, 
                usuario, 
                telefone, 
                email, 
                generoMusical, 
                regiao, 
                ytLink, 
                spotifyLink, 
                instagramLink, 
                wppLink, 
                senha, 
                senhaConfirmada, 
                descricao, 
                isBanda 
            }),
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Display response message or handle success
            document.getElementById('musicoForm').reset(); // Reset the form fields
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

document.getElementById('contratanteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('contratanteNome').value;
    const email = document.getElementById('contratanteEmail').value;
    const telefone = document.getElementById('contratanteTelefone').value;

    fetch('http://localhost:3000/api/contratantes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, telefone }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Login bem-sucedido.') {
            window.location.href = 'admin.html';
        } else {
            alert(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('musicosList')) {
        fetch('http://localhost:80/api/musicosList')
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
                fetch('http://localhost:3000/api/musicosList')
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
                fetch(`http://localhost:3000/api/musicos/estilo/${estilo}`)
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

    }
});



//Plugin carrosel de fotos do portfolio
var swiper = new Swiper(".swiper", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    keyboard: true,
  });
  