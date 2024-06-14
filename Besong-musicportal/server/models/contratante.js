const Usuario = require('./usuario');

class Contratante extends Usuario {
  constructor(nome, email, telefone, senha) {
    super(nome, email, telefone, senha);
  }
}

module.exports = Contratante;
