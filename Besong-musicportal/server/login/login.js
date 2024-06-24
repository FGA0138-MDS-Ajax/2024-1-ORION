const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

const secretKey = 'sua_chave_secreta'; // Use uma chave secreta forte e guarde-a em um local seguro

// Middleware para permitir CORS
app.use(cors());

// Middleware para parse de JSON
app.use(express.json());
app.use(bodyParser.json());

// Configuração do banco de dados usando createPool do mysql2
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "54.242.81.142",    
  port: 3306,                
  user: "root",              
  password: "1234",          
  database: "beSongDB",      
  multipleStatements: true
});

// Rota para login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  // Query para verificar o usuário
  const sql = `SELECT * FROM users WHERE email = ? AND senha = ?`; 
  pool.query(sql, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno ao consultar o banco de dados' });
    }

    if (results.length > 0) {
      // Usuário autenticado, gerar token JWT
      const token = jwt.sign({ userId: results[0].id }, secretKey, { expiresIn: '1h' });
      return res.json({ token });
    } else {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

// Middleware para verificar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rota para receber dados do formulário e consultar no banco de dados
app.post('/api/musicosList', authenticateToken, (req, res) => {
  const userData = req.body;
  const generoMusical = req.body.estiloMusical;

  // Log dos valores recebidos
  console.log('Dados recebidos do formulário:');
  console.log(userData);

  // Montar query SQL para consulta
  const sql = `SELECT nomeArtistico, generoMusical, eBanda, regiao FROM ARTISTA WHERE generoMusical = ?`;

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
