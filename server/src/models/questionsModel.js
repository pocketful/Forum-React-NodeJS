const executeDb = require('../utils/executeDb');

function getQuestionsDb() {
  // with answers_count and username:
  const sql =
    'SELECT questions.*, COUNT(IF(answers.archived = 0, 1, NULL)) AS answers_count, users.username, users.email FROM questions LEFT JOIN answers ON questions.question_id = answers.question_id LEFT JOIN users ON questions.user_id = users.user_id WHERE questions.archived = 0 GROUP BY questions.question_id ORDER BY questions.created_at DESC';
  return executeDb(sql);
}

function getOneQuestionDb(questionId) {
  // with username, image:
  const sql =
    'SELECT questions.*, users.username, users.email, users.image FROM questions LEFT JOIN users ON questions.user_id = users.user_id WHERE question_id = ? AND archived = 0';
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
  return executeDb(sql, [questionId]);
}

module.exports = {
  getQuestionsDb,
  getOneQuestionDb,
  postQuestionDb,
  updateQuestionDb,
  deleteQuestionDb,
};
