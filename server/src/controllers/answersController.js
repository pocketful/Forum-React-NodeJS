const { getAnswersDb } = require('../models/answersModel');

async function getAnswers(req, res) {
  try {
    const answers = await getAnswersDb();
    return res.json(answers);
  } catch (err) {
    console.log('error in answers controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = getAnswers;
