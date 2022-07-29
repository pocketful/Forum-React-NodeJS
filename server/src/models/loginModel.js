const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function loginUserDb(email) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [foundUserArr] = await conn.execute(sql, [email]);
    return foundUserArr[0];
  } catch (err) {
    console.log('error in login model:', err);
    throw err;
  } finally {
    conn?.end();
  }
}

module.exports = {
  loginUserDb,
};
