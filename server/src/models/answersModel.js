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
    console.log('error in get answers model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

async function postAnswersDb(userId, questionId, content) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO answers (user_id, question_id, content) VALUES (?, ?, ?)';
    const [insertResult] = await conn.execute(sql, [userId, questionId, content]);
    return insertResult;
  } catch (err) {
    console.log('error in post answers model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getAnswersDb,
  postAnswersDb,
};
