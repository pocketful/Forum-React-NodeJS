require('dotenv').config();

const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('No JWT in .env');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

module.exports = {
  PORT,
  dbConfig,
  jwtSecret,
};
