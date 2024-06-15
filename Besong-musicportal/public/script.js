
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
  