const executeDb = require('../utils/executeDb');

function getQuestionsDb() {
  // with answers_count and username:
  const sql =
    'SELECT questions.*, COUNT(IF(answers.archived = 0, 1, NULL)) AS answers_count, users.username FROM questions LEFT JOIN answers ON questions.question_id = answers.question_id LEFT JOIN users ON questions.user_id = users.user_id WHERE questions.archived = 0 GROUP BY questions.question_id';
  // const sql = 'SELECT questions.*, COUNT(case when answers.archived = 0 then 1 else null end) AS answers_count FROM questions LEFT JOIN answers ON questions.question_id = answers.question_id WHERE questions.archived = 0 GROUP BY questions.question_id';
  // const sql = 'SELECT * FROM questions WHERE archived = 0';
  return executeDb(sql);
}

function getOneQuestionDb(questionId) {
  // with username, image:
  const sql =
    'SELECT questions.*, users.username, users.image FROM questions LEFT JOIN users ON questions.user_id = users.user_id WHERE question_id = ? AND archived = 0';
  // const sql = 'SELECT * FROM questions WHERE question_id = ? AND archived = 0';
  return executeDb(sql, [questionId]);
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
  getOneQuestionDb,
  postQuestionDb,
  updateQuestionDb,
  deleteQuestionDb,
};
