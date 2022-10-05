const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (err) {
    console.log('error in executeDb:', err);
    throw new Error('error in executeDb');
  } finally {
    conn?.end();
  }
}

module.exports = executeDb;
