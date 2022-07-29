const express = require('express');
const mysql = require('mysql2/promise');
const controller = require('../controllers/questionsController');
const { dbConfig } = require('../config');

const questionsRoute = express.Router();

questionsRoute.get('/questions', controller.getQuestions);
questionsRoute.post('/questions', controller.postQuestions);

questionsRoute.delete('/questions/:questionId', async (req, res) => {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const { questionId } = req.params;
    console.log('questionId', typeof questionId);
    const sql = 'DELETE FROM questions WHERE question_id = ?';
    const [deleteResult] = await conn.execute(sql, [questionId]);
    console.log('deleteResult', deleteResult);
    if (deleteResult.affectedRows === 1) {
      return res.status(200).json({ success: true, message: 'Question successfully deleted.' });
    }
    if (deleteResult.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Unable to delete question.' });
    }
    throw new Error('unable to delete a question');
  } catch (err) {
    console.log('error tryin to delete a question:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  } finally {
    conn?.end();
  }
});

module.exports = questionsRoute;
