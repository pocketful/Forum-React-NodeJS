const executeDb = require('../utils/executeDb');

function loginUserDb(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return executeDb(sql, [email]);
}

module.exports = {
  loginUserDb,
};
