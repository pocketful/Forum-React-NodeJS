const { getQuestionsDb, postQuestionsDb, deleteQuestionsDb } = require('../models/questionsModel');

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

async function deleteQuestions(req, res) {
  const { questionId } = req.params;
  console.log('req.params', req.params);
  console.log('questionId', questionId);
  try {
    const deleteResult = await deleteQuestionsDb(questionId);
    console.log('deleteResult', deleteResult);
    if (deleteResult.affectedRows === 1) {
      return res.status(200).json({ success: true, message: 'Question successfully deleted.' });
    }
    if (deleteResult.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Unable to delete a question.' });
    }
    throw new Error('unable to delete a question');
  } catch (err) {
    console.log('error tryin to delete a question:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getQuestions,
  postQuestions,
  deleteQuestions,
};
