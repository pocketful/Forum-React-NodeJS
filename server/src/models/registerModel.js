const executeDb = require('../utils/executeDb');

function registerUserDb(username, email, password, image) {
  const sql = 'INSERT INTO users (username, email, password, image) VALUES (?, ?, ?, ?)';
  return executeDb(sql, [username, email, password, image]);
}

module.exports = {
  registerUserDb,
};
