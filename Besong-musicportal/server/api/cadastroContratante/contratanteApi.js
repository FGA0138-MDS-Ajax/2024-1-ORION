const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
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

// Rota para receber dados do formulário e inserir no banco de dados
app.post('/api/contratantes', async (req, res) => {
  const userData = req.body;

  // Log dos valores recebidos
  console.log('Dados recebidos do formulário:');
  console.log(userData);


  try {
    // Hashear a senha do usuário
    const hashedPassword = await bcrypt.hash(userData.senha, 10);

    // Montar query SQL para inserção
    const sql = `
      INSERT INTO CONTRATANTE
      (nome, email, usuario, senha, regiao,telefone)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userData.nome,
      userData.email,
      userData.usuario,
      hashedPassword, // Usar a senha hasheada
      userData.regiao,
      userData.telefone
     
    ];

    // Executar a query usando pool.query do mysql2
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erro ao executar a query: ' + err.stack);
        res.status(500).json({ error: 'Erro interno ao salvar no banco de dados' });
        return;
      }
      console.log('Registro inserido com sucesso');
      res.json({ message: `Parabéns, ${userData.nome}! Cadastro efetuado com sucesso.` });
    });
  } catch (err) {
    console.error('Erro ao hashear a senha: ' + err.stack);
    res.status(500).json({ error: 'Erro interno ao processar a senha' });
  }
});

// Iniciar o servidor na porta 80
const PORT = process.env.PORT || 89;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});