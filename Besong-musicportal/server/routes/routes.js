const express = require('express');
const router = express.Router();
const multer = require('multer');
const contratanteController = require('../controllers/contratanteController');
const artistaController = require('../controllers/artistaController');

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

// Rotas para Contratantes
router.post('/contratantes', contratanteController.cadastrarContratante);
router.post('/contratantes/login', contratanteController.loginContratante);
router.put('/contratantes/:id', contratanteController.editarPerfilContratante);
router.delete('/contratantes/:id', contratanteController.deletarContaContratante);

// Rotas para Músicos
//router.post('/artista',  artistaController.cadastrarArtista);
router.post('/artista', upload.single('foto'), artistaController.cadastrarArtistaComFoto);
router.post('/artista/login', artistaController.loginArtista);
router.put('/artista/:id', artistaController.editarPerfilArtista);
router.delete('/artista/:id', artistaController.deletarContaArtista);
router.get('/artista', artistaController.listarArtista);
router.get('/artista/estilo/:estilo', artistaController.buscarArtistaPorEstilo);
router.get('/artista/:id', artistaController.buscarArtistaPorId);

module.exports = router;
