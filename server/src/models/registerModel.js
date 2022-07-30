const executeDb = require('../utils/executeDb');

function registerUserDb(username, email, password, image) {
  const sql = 'INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, ?)';
  return executeDb(sql, [username, email, password, image]);
}

// const mysql = require('mysql2/promise');
// const { dbConfig } = require('../config');

// async function registerUserDb(username, email, password, image) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, ?)';
//     const [insertResult] = await conn.execute(sql, [username, email, password, image]);
//     return insertResult;
//   } catch (err) {
//     console.log('error in register model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

module.exports = {
  registerUserDb,
};
