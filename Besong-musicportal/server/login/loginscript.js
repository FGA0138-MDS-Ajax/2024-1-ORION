document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginPassword').value;

        fetch('http://54.242.81.142:82/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email,  
                senha 
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Armazene o token no localStorage ou sessionStorage
                localStorage.setItem('token', data.token);
                alert('Login bem-sucedido');
                window.location.href = './index.html';
            } else {
                alert('Credenciais inválidas');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

// Função para enviar uma requisição autenticada
function fetchMusicosList() {
    const token = localStorage.getItem('token');

    fetch('http://54.242.81.142:82/api/musicosList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            estiloMusical: 'Rock'
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Manipule os dados recebidos
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
