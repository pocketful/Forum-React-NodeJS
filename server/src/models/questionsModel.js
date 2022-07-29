const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getQuestionsDb() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM questions';
    const [questions] = await conn.execute(sql, []);
    return questions;
  } catch (err) {
    console.log('error in questions model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getQuestionsDb,
};
