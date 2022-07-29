const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getAnswersDb() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM answers';
    const [answers] = await conn.execute(sql, []);
    return answers;
  } catch (err) {
    console.log('error in answers model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getAnswersDb,
};
