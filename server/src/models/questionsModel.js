const executeDb = require('../utils/executeDb');

function getQuestionsDb() {
  const sql = 'SELECT * FROM questions WHERE archived = 0';
  return executeDb(sql);
}

function postQuestionDb(userId, title, content) {
  const sql = 'INSERT INTO questions (user_id, title, content) VALUES (?, ?, ?)';
  return executeDb(sql, [userId, title, content]);
}

function updateQuestionDb(questionId, title, content) {
  const sql = 'UPDATE questions SET title = ?, content = ? WHERE question_id = ?';
  return executeDb(sql, [title, content, questionId]);
}

function deleteQuestionDb(questionId) {
  const sql = 'UPDATE questions SET archived = 1 WHERE question_id = ?';
  // const sql = 'DELETE FROM questions WHERE question_id = ?';
  return executeDb(sql, [questionId]);
}

// const mysql = require('mysql2/promise');
// const { dbConfig } = require('../config');

// async function getQuestionsDb() {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'SELECT * FROM questions WHERE archived = 0';
//     const [questions] = await conn.execute(sql, []);
//     return questions;
//   } catch (err) {
//     console.log('error in get questions model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

// async function postQuestionDb(userId, title, content) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'INSERT INTO questions (user_id, title, content) VALUES (?, ?, ?)';
//     const [insertResult] = await conn.execute(sql, [userId, title, content]);
//     return insertResult;
//   } catch (err) {
//     console.log('error in post question model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

// async function updateQuestionDb(questionId, title, content) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'UPDATE questions SET title = ?, content = ? WHERE question_id = ?';
//     const [updateResult] = await conn.execute(sql, [title, content, questionId]);
//     return updateResult;
//   } catch (err) {
//     console.log('error in update question model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

// async function deleteQuestionDb(questionId) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'UPDATE questions SET archived = 1 WHERE question_id = ?';
//     // const sql = 'DELETE FROM questions WHERE question_id = ?';
//     const [deleteResult] = await conn.execute(sql, [questionId]);
//     return deleteResult;
//   } catch (err) {
//     console.log('error in delete question model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

module.exports = {
  getQuestionsDb,
  postQuestionDb,
  updateQuestionDb,
  deleteQuestionDb,
};
