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

async function postAnswerDb(userId, questionId, content) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO answers (user_id, question_id, content) VALUES (?, ?, ?)';
    const [insertResult] = await conn.execute(sql, [userId, questionId, content]);
    return insertResult;
  } catch (err) {
    console.log('error in post answer model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

async function deleteAnswerDb(answerId) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM answers WHERE answer_id = ?';
    const [deleteResult] = await conn.execute(sql, [answerId]);
    return deleteResult;
  } catch (err) {
    console.log('error in delete answer model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getAnswersDb,
  postAnswerDb,
  deleteAnswerDb,
};
