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

        fetch('http://34.224.8.247:100/api/musicos', {
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
            window.location.href = './login.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    });
});
