const executeDb = require('../utils/executeDb');

function getAnswersDb(questionId) {
  const sql = 'SELECT * FROM answers WHERE question_id = ? AND archived = 0';
  return executeDb(sql, [questionId]);
}

function postAnswerDb(userId, questionId, content) {
  const sql = 'INSERT INTO answers (user_id, question_id, content) VALUES (?, ?, ?)';
  return executeDb(sql, [userId, questionId, content]);
}

function updateAnswerDb(answerId, content) {
  const sql = 'UPDATE answers SET content = ? WHERE answer_id = ?';
  return executeDb(sql, [content, answerId]);
}

function deleteAnswerDb(answerId) {
  const sql = 'UPDATE answers SET archived = 1 WHERE answer_id = ?';
  return executeDb(sql, [answerId]);
}

function getAnswerVotesDb(answerId) {
  const sql = 'SELECT answer_id, sum(vote) AS votes FROM answers_votes WHERE answer_id = ?';
  return executeDb(sql, [answerId]);
}

function postAnswerVoteDb(answerId, userId, vote) {
  const sql = 'INSERT INTO answers_votes (answer_id, user_id, vote) VALUES (?, ?, ?)';
  return executeDb(sql, [answerId, userId, vote]);
}

// const mysql = require('mysql2/promise');
// const { dbConfig } = require('../config');

// async function getAnswersDb() {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'SELECT * FROM answers WHERE archived = 0';
//     const [answers] = await conn.execute(sql, []);
//     return answers;
//   } catch (err) {
//     console.log('error in get answers model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

// async function postAnswerDb(userId, questionId, content) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'INSERT INTO answers (user_id, question_id, content) VALUES (?, ?, ?)';
//     const [insertResult] = await conn.execute(sql, [userId, questionId, content]);
//     return insertResult;
//   } catch (err) {
//     console.log('error in post answer model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

// async function updateAnswerDb(answerId, content) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'UPDATE answers SET content = ? WHERE answer_id = ?';
//     const [updateResult] = await conn.execute(sql, [content, answerId]);
//     return updateResult;
//   } catch (err) {
//     console.log('error in update answer model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

// async function deleteAnswerDb(answerId) {
//   let conn;
//   try {
//     conn = await mysql.createConnection(dbConfig);
//     const sql = 'UPDATE answers SET archived = 1 WHERE answer_id = ?';
//     // const sql = 'DELETE FROM answers WHERE answer_id = ?';
//     const [deleteResult] = await conn.execute(sql, [answerId]);
//     return deleteResult;
//   } catch (err) {
//     console.log('error in delete answer model:', err);
//     throw err;
//   } finally {
//     conn?.end();
//   }
// }

module.exports = {
  getAnswersDb,
  postAnswerDb,
  updateAnswerDb,
  deleteAnswerDb,
  getAnswerVotesDb,
  postAnswerVoteDb,
};
