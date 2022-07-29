const { getQuestionsDb, postQuestionsDb } = require('../models/questionsModel');

async function getQuestions(req, res) {
  try {
    const questions = await getQuestionsDb();
    return res.json(questions);
  } catch (err) {
    console.log('error in get questions controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postQuestions(req, res) {
  const { userId, title, content } = req.body;
  try {
    const insertResult = await postQuestionsDb(userId, title, content);
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'New question successfully added.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to add new question.' });
  } catch (err) {
    console.log('error in post question controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getQuestions,
  postQuestions,
};
