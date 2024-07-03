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

// Rota para receber dados do formulário e consultar no banco de dados
app.post('/api/musicosList', (req, res) => {
  const userData = req.body;
  const generoMusical = req.body.estiloMusical;

  // Log dos valores recebidos
  console.log('Dados recebidos do formulário:');
  console.log(userData);

  // Converte isBanda para booleano
  const eBanda = userData.isBanda === 'true';

  // Montar query SQL para consulta
  const sql = `SELECT idArtista, nomeArtistico, generoMusical, eBanda, regiao, descricao FROM ARTISTA WHERE generoMusical = ?`;

  // Valores para substituir os placeholders na query SQL
  const values = [generoMusical];

  // Executar a query usando pool.query do mysql2
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao executar a query: ' + err.stack);
      res.status(500).json({ error: 'Erro interno ao consultar o banco de dados' });
      return;
    }

    // Log do resultado da consulta
    console.log('Consulta executada com sucesso');
    console.log(result); // Aqui logamos o resultado da consulta

    // Retorna os dados encontrados no banco de dados
    res.json(result);
  });
});

// Iniciar o servidor na porta 81
const PORT = process.env.PORT || 81;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});