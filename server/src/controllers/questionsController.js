const { getQuestionsDb, postQuestionDb, updateQuestionDb, deleteQuestionDb } = require('../models/questionsModel');

async function getQuestions(req, res) {
  try {
    const questions = await getQuestionsDb();
    return res.json(questions);
  } catch (err) {
    console.log('error in get questions controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postQuestion(req, res) {
  const { userId } = req;
  const { title, content } = req.body;
  try {
    const insertResult = await postQuestionDb(userId, title, content);
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

async function updateQuestion(req, res) {
  const { questionId } = req.params;
  const { title, content } = req.body;
  try {
    const updateResult = await updateQuestionDb(questionId, title, content);
    console.log('updateResult', updateResult);
    if (updateResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'Question successfully updated.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to update a question.' });
  } catch (err) {
    console.log('error in update a question controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function deleteQuestion(req, res) {
  const { questionId } = req.params;
  try {
    const deleteResult = await deleteQuestionDb(questionId);
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
  postQuestion,
  updateQuestion,
  deleteQuestion,
};
