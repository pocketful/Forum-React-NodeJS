const { getAnswersDb, postAnswersDb } = require('../models/answersModel');

async function getAnswers(req, res) {
  try {
    const answers = await getAnswersDb();
    return res.json(answers);
  } catch (err) {
    console.log('error in get answers controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postAnswers(req, res) {
  const { userId, questionId, content } = req.body;
  try {
    const insertResult = await postAnswersDb(userId, questionId, content);
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'New answer successfully added.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to add new answer.' });
  } catch (err) {
    console.log('error in post answer controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getAnswers,
  postAnswers,
};
