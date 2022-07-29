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
    console.log('error in get questions model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

async function postQuestionDb(userId, title, content) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO questions (user_id, title, content) VALUES (?, ?, ?)';
    const [insertResult] = await conn.execute(sql, [userId, title, content]);
    return insertResult;
  } catch (err) {
    console.log('error in post question model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

async function deleteQuestionDb(questionId) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM questions WHERE question_id = ?';
    const [deleteResult] = await conn.execute(sql, [questionId]);
    return deleteResult;
  } catch (err) {
    console.log('error in delete question model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  getQuestionsDb,
  postQuestionDb,
  deleteQuestionDb,
};
