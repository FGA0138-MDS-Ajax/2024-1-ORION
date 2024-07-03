
document.addEventListener('DOMContentLoaded', function() {
    const idArtista = sessionStorage.getItem('idArtista');

    if (idArtista) {

        fetch(`http://54.226.24.115:88/api/portifolio/${idArtista}`)
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
                document.getElementById('btn1').textContent = data.ytLink;
                
                document.querySelector('.video-div iframe').src = data.ytLink;           
                document.getElementById('btn1').getElementsByTagName('a')[0].href = data.ytLink;            
                document.getElementById('btn2').getElementsByTagName('a')[0].href = data.instagramLink;           
                document.getElementById('btn3').getElementsByTagName('a')[0].href = data.wppLink;

    

                // Atualizar outras informações conforme necessário
            })
            .catch(error => {
                console.error('Erro ao carregar dados do artista:', error);
               
            });

    } else {
        console.error('Nenhum idArtista encontrado no sessionStorage');}
    
});
  