
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
                

                // Atualizar outras informações conforme necessário
            })
            .catch(error => {
                console.error('Erro ao carregar dados do artista:', error);
               
            });

    } else {
        console.error('Nenhum idArtista encontrado no sessionStorage');}
    
});
  