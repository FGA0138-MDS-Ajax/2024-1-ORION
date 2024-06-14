const db = require('../db/db');
const multer = require('multer');

// Configuração do multer para armazenar as fotos dos músicos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
const upload = multer({ storage: storage });

class ArtistaController {
  //async cadastrarArtista(req, res) {
   // const { nome, email, telefone, senha, estiloMusical, portfolio, instagram, youtube } = req.body;
   // const query = 'INSERT INTO musicos (nome, email, telefone, senha, estilo_musical, portfolio, instagram, youtube) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
   // try {
    //  await db.query(query, [nome, email, telefone, senha, estiloMusical, portfolio, instagram, youtube]);
     // res.status(200).send('Cadastrado com sucesso.');
   // } catch (err) {
   //   res.status(500).send(err);
   // }
  //}
  async cadastrarArtistaComFoto(req, res) {
    const { nome, email, telefone, senha, estiloMusical, portfolio, instagram, youtube } = req.body;
    const foto = req.file ? req.file.filename : null; // Verifica se há uma foto no request
    const query = 'INSERT INTO musicos (nome, email, telefone, senha, estilo_musical, portfolio, instagram, youtube, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    try {
      await db.query(query, [nome, email, telefone, senha, estiloMusical, portfolio, instagram, youtube, foto]);
      res.status(200).send('Cadastrado com sucesso.');
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async loginArtista(req, res) {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM musicos WHERE email = ? AND senha = ?';
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

  async editarPerfilArtista(req, res) {
    const { id } = req.params;
    const { nome, email, telefone, estiloMusical, portfolio, instagram, youtube } = req.body;
    const query = 'UPDATE musicos SET nome = ?, email = ?, telefone = ?, estilo_musical = ?, portfolio = ?, instagram = ?, youtube = ? WHERE id = ?';
    try {
      await db.query(query, [nome, email, telefone, estiloMusical, portfolio, instagram, youtube, id]);
      res.status(200).send('Perfil atualizado com sucesso.');
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async deletarContaArtista(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM musicos WHERE id = ?';
    try {
      await db.query(query, [id]);
      res.status(200).send('Conta excluída com sucesso.');
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async listarArtista(req, res) {
    const query = 'SELECT * FROM musicos';
    try {
      const results = await db.query(query);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async buscarArtistaPorEstilo(req, res) {
    const { estilo } = req.params;
    const query = 'SELECT * FROM musicos WHERE estilo_musical = ?';
    try {
      const results = await db.query(query, [estilo]);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  async buscarArtistaPorId(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM musicos WHERE id = ?';
    try {
      const results = await db.query(query, [id]);
      if (results.length === 0) {
        res.status(404).send('Músico não encontrado.');
      } else {
        res.status(200).json(results[0]);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

}

module.exports = new ArtistaController();
