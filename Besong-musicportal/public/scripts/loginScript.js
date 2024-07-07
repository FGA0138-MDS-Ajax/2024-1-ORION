document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const musico = document.getElementById('musicoContratante').value;
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginPassword').value;

        if (musico === 'musico') {

            fetch('http://34.224.8.247:85/api/login', {
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
                        // Armazenar o token no localStorage
                        localStorage.setItem('token', data.token);
                        alert('Login efetuado com sucesso!');
                        document.getElementById('loginForm').reset();
                        window.location.href = './index.html';
                    } else {

                        // Exibir mensagem de erro
                        alert(data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        }else {
            fetch('http://34.224.8.247:90/api/loginContratante', {
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
                        // Armazenar o token no localStorage
                        localStorage.setItem('token', data.token);
                        alert('Login efetuado com sucesso!');
                        document.getElementById('loginForm').reset();
                        window.location.href = './index.html';
                    } else {

                        // Exibir mensagem de erro
                        alert(data.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }


        
        
    });
});