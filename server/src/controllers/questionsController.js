const { getQuestionsDb } = require('../models/questionsModel');

async function getQuestions(req, res) {
  try {
    const questions = await getQuestionsDb();
    return res.json(questions);
  } catch (err) {
    console.log('error in questions controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = getQuestions;
