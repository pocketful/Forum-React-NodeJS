const {
  getAnswersDb,
  postAnswerDb,
  updateAnswerDb,
  deleteAnswerDb,
  getAnswerVotesDb,
} = require('../models/answersModel');

async function getAnswers(req, res) {
  const { questionId } = req.params;
  try {
    const answers = await getAnswersDb(questionId);
    return res.json(answers);
  } catch (err) {
    console.log('error in get answers controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function postAnswer(req, res) {
  const { userId } = req;
  const { questionId } = req.params;
  const { content } = req.body;
  try {
    const insertResult = await postAnswerDb(userId, questionId, content);
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

async function updateAnswer(req, res) {
  const { answerId } = req.params;
  const { content } = req.body;
  try {
    const updateResult = await updateAnswerDb(answerId, content);
    console.log('updateResult', updateResult);
    if (updateResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'Answer successfully updated.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to update an answer.' });
  } catch (err) {
    console.log('error in update an answer controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function deleteAnswer(req, res) {
  const { answerId } = req.params;
  try {
    const deleteResult = await deleteAnswerDb(answerId);
    if (deleteResult.affectedRows === 1) {
      return res.status(200).json({ success: true, message: 'Answer successfully deleted.' });
    }
    if (deleteResult.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Unable to delete an answer.' });
    }
    throw new Error('unable to delete an answer');
  } catch (err) {
    console.log('error tryin to deleten a answer:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function getAnswerVotes(req, res) {
  const { answerId } = req.params;
  try {
    const answerVotes = await getAnswerVotesDb(answerId);
    return res.json(answerVotes);
  } catch (err) {
    console.log('error in get answer votes controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getAnswers,
  postAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswerVotes,
};
