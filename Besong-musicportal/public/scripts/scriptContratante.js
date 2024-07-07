document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('musicoForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('contratanteNome').value;
        const usuario = document.getElementById('usuario').value;
        const telefone = document.getElementById('contratanteTelefone').value;
        const email = document.getElementById('contratanteEmail').value;
        const regiao = document.getElementById('contratanteRegiao').value;
        const senha = document.getElementById('senha').value;
        
     

        fetch('http://34.224.8.247:89/api/contratantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                nome, 
                usuario, 
                telefone, 
                email,
                regiao, 
                senha
                
                
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
