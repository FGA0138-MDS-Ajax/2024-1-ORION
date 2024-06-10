document.getElementById('musicoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('musicoNome').value;
    const email = document.getElementById('musicoEmail').value;
    const estilo = document.getElementById('musicoEstilo').value;
    const telefone = document.getElementById('musicoTelefone').value;
    const instagram = document.getElementById('musicoInstagram').value;
    const youtube = document.getElementById('musicoYoutube').value;
    const portfolio = document.getElementById('musicoPortfolio').value;

    fetch('http://localhost:3000/api/musicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, estilo_musical: estilo, portfolio, telefone, instagram, youtube }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
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
        fetch('http://localhost:3000/api/musicos')
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
                fetch('http://localhost:3000/api/musicos')
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

        fetch(`http://localhost:3000/api/musicos/${id}`)
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

document.getElementById('musicoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);

    fetch('http://localhost:3000/api/musicos', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
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
  