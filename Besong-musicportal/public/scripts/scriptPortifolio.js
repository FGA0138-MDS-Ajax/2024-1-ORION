
document.addEventListener('DOMContentLoaded', function() {
    const idArtista = sessionStorage.getItem('idArtista');

    if (idArtista) {

        fetch(`http://54.242.81.142:88/api/portifolio/${idArtista}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar dados do artista');
                }
                return response.json();
            })
            .then(data => {
                // Aqui você atualiza o DOM com os dados recebidos
                console.log("Response: ",data);

                document.getElementById('nome').textContent = data.nomeArtistico;
                document.getElementById('tipo').textContent = data.eBanda ? 'Banda, ' + data.generoMusical : 'Solo, ' + data.generoMusical;
                document.getElementById('release').textContent = data.descricao;
                document.getElementById('email').textContent = data.email;
                document.getElementById('telefone').textContent = data.telefone;
                
                document.querySelector('.video-div iframe').src = data.ytLink;
                document.querySelector('#btn1 a').href = data.ytLink;
                document.querySelector('#btn2 a').href = data.instagramLink;
                document.querySelector('#btn3 a').href = data.wppLink;
    

                // Atualizar outras informações conforme necessário
            })
            .catch(error => {
                console.error('Erro ao carregar dados do artista:', error);
               
            });

    } else {
        console.error('Nenhum idArtista encontrado no sessionStorage');}
    
});
  