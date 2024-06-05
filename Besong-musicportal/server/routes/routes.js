const express = require('express');
const router = express.Router();
const db = require('./db');
const multer = require('multer');

// Cadastro de músicos
router.post('/musicos', (req, res) => {
    const { nome, email, estilo_musical, portfolio, telefone, instagram, youtube } = req.body;
    const query = 'INSERT INTO musicos (nome, email, estilo_musical, portfolio, telefone, instagram, youtube) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, email, estilo_musical, portfolio, telefone, instagram, youtube], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Musico cadastrado com sucesso.');
        }
    });
});

// Cadastro de contratantes
router.post('/contratantes', (req, res) => {
    const { nome, email, telefone } = req.body;
    const query = 'INSERT INTO contratantes (nome, email, telefone) VALUES (?, ?, ?)';
    db.query(query, [nome, email, telefone], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Contratante cadastrado com sucesso.');
        }
    });
});

// Login de contratante
router.post('/login', (req, res) => {
    const { email } = req.body;
    const query = 'SELECT * FROM contratantes WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.length === 0) {
            res.status(401).send('Contratante não encontrado.');
        } else {
            res.status(200).send('Login bem-sucedido.');
        }
    });
});

// Listar músicos
router.get('/musicos', (req, res) => {
    const query = 'SELECT * FROM musicos';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// Buscar músico por estilo musical
router.get('/musicos/estilo/:estilo', (req, res) => {
    const { estilo } = req.params;
    const query = 'SELECT * FROM musicos WHERE estilo_musical = ?';
    db.query(query, [estilo], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// Buscar músico por ID
router.get('/musicos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM musicos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send('Músico não encontrado.');
        } else {
            res.status(200).json(results[0]);
        }
    });
});

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

// Cadastro de músicos com upload de foto
router.post('/musicos', upload.single('foto'), (req, res) => {
    const { nome, email, estilo_musical, portfolio, telefone, instagram, youtube } = req.body;
    const foto = req.file.filename;
    const query = 'INSERT INTO musicos (nome, email, estilo_musical, portfolio, telefone, instagram, youtube, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, email, estilo_musical, portfolio, telefone, instagram, youtube, foto], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Músico cadastrado com sucesso.');
        }
    });
});


module.exports = router;
