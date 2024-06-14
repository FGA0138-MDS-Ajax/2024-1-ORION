const Usuario = require('./usuario');

class Artista extends Usuario {
  constructor(nome, email, telefone, senha, estiloMusical, portfolio, instagram, youtube) {
    super(nome, email, telefone, senha);
    this.estiloMusical = estiloMusical;
    this.portfolio = portfolio;
    this.instagram = instagram;
    this.youtube = youtube;
  }
}

module.exports = Artista;
