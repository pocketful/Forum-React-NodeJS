const executeDb = require('../utils/executeDb');

function getAnswersDb(questionId) {
  // with votes, user username and image
  const sql =
    'SELECT answers.*, SUM(answers_votes.vote) AS votes, users.username, users.email, users.image FROM answers LEFT JOIN answers_votes ON answers.answer_id = answers_votes.answer_id LEFT JOIN users ON answers.user_id = users.user_id WHERE answers.archived = 0 AND question_id = ? GROUP BY answers.answer_id';
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

function updateAnswerVoteDb(answerId, userId, vote) {
  const sql = 'UPDATE answers_votes SET vote = ? WHERE answer_id = ? and user_id = ?';
  return executeDb(sql, [answerId, userId, vote]);
}

function getAnswerVoteDb(answerId) {
  const sql =
    'SELECT answers_votes.*, users.email FROM answers_votes  LEFT JOIN users ON answers_votes.user_id = users.user_id WHERE answer_id = ?';
  return executeDb(sql, [answerId]);
}

module.exports = {
  getAnswersDb,
  postAnswerDb,
  updateAnswerDb,
  deleteAnswerDb,
  getAnswerVotesDb,
  postAnswerVoteDb,
  updateAnswerVoteDb,
  getAnswerVoteDb,
};
