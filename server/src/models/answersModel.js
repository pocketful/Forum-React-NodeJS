const executeDb = require('../utils/executeDb');

function getAnswersDb(userId, questionId) {
  // with votes, my_vote (1 / -1), username, image
  const sql =
    'SELECT answers.*, users.username, users.email, users.image, SUM(answers_votes.vote) AS votes, MAX(CASE WHEN answers_votes.user_id = ? THEN answers_votes.vote END) AS my_vote FROM answers LEFT JOIN users ON answers.user_id = users.user_id LEFT JOIN answers_votes ON answers.answer_id = answers_votes.answer_id WHERE answers.archived = 0 AND question_id = ? GROUP BY answers.answer_id';
  return executeDb(sql, [userId, questionId]);
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

// Voting for an answer:
function getAnswerVoteByUserDb(answerId, userId) {
  const sql = 'SELECT * FROM answers_votes WHERE answer_id = ? AND user_id = ?';
  return executeDb(sql, [answerId, userId]);
}

function updateAnswerVoteDb(vote, answerId, userId) {
  const sql = 'UPDATE answers_votes SET vote = ? WHERE answer_id = ? AND user_id = ?';
  return executeDb(sql, [vote, answerId, userId]);
}

function postAnswerVoteDb(answerId, userId, vote) {
  const sql = 'INSERT INTO answers_votes (answer_id, user_id, vote) VALUES (?, ?, ?)';
  return executeDb(sql, [answerId, userId, vote]);
}

function deleteAnswerVoteDb(voteId) {
  const sql = 'DELETE FROM answers_votes WHERE vote_id = ?';
  return executeDb(sql, [voteId]);
}

module.exports = {
  getAnswersDb,
  postAnswerDb,
  updateAnswerDb,
  deleteAnswerDb,
  getAnswerVoteByUserDb,
  updateAnswerVoteDb,
  postAnswerVoteDb,
  deleteAnswerVoteDb,
};
