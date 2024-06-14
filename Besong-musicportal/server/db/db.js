const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sua-senha',
  database: 'besong',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verifica se a conexão foi estabelecida com sucesso
pool.getConnection()
  .then(connection => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    connection.release(); // libera a conexão de teste
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err.message);
  });

module.exports = pool;
