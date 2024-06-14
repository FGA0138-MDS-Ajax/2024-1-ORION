const db = require('../db/db');

class ContratanteController {
  async cadastrarContratante(req, res) {
    const { nome, email, telefone, senha } = req.body;
    const query = 'INSERT INTO contratantes (nome, email, telefone, senha) VALUES (?, ?, ?, ?)';
    try {
      await db.query(query, [nome, email, telefone, senha]);
      res.status(200).send('Cadastrado com sucesso.');
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async loginContratante(req, res) {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM contratantes WHERE email = ? AND senha = ?';
    try {
      const result = await db.query(query, [email, senha]);
      if (result.length === 0) {
        res.status(401).send('Credenciais inválidas.');
      } else {
        res.status(200).send('Login bem-sucedido.');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async editarPerfilContratante(req, res) {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const query = 'UPDATE contratantes SET nome = ?, email = ?, telefone = ? WHERE id = ?';
    try {
      await db.query(query, [nome, email, telefone, id]);
      res.status(200).send('Perfil atualizado com sucesso.');
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async deletarContaContratante(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM contratantes WHERE id = ?';
    try {
      await db.query(query, [id]);
      res.status(200).send('Conta excluída com sucesso.');
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new ContratanteController();