const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Configuração do banco de dados usando createPool do mysql2
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "54.226.24.115",    // Host do seu banco de dados MySQL
  port: 3306,                // Porta do seu banco de dados MySQL
  user: "root",              // Usuário do seu banco de dados MySQL
  password: "1234",          // Senha do seu banco de dados MySQL
  database: "beSongDB",      // Nome do banco de dados
  multipleStatements: true
});

// Middleware para parse de JSON
app.use(express.json());


// Rota para buscar dados de um artista específico
app.get('/api/portifolio/:idArtista', (req, res) => {
    const idArtista = req.params.idArtista;

    // Montar query SQL para consulta
    const sql = `SELECT idArtista, nomeArtistico, generoMusical, eBanda, descricao, ytLink, wppLink, spotfyLink, email, telefone FROM ARTISTA WHERE idArtista = ?`;

    // Executar a query usando pool.query do mysql2
    pool.query(sql, [idArtista], (err, result) => {
      if (err) {
        console.error('Erro ao executar a query: ' + err.stack);
        res.status(500).json({ error: 'Erro interno ao consultar o banco de dados' });
        return;
      }

      // Verificar se encontrou algum artista com o userId fornecido
      if (result.length === 0) {
        res.status(404).json({ error: 'Artista não encontrado' });
        return;
      }

      // Retorna os dados encontrados no banco de dados
      res.json(result[0]);
    });
  });


// Iniciar o servidor na porta 81
const PORT = process.env.PORT || 88;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});