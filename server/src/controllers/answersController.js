const {
  getAnswersDb,
  postAnswerDb,
  updateAnswerDb,
  deleteAnswerDb,
  getAnswerVoteByUserDb,
  updateAnswerVoteDb,
  postAnswerVoteDb,
  deleteAnswerVoteDb,
} = require('../models/answersModel');

async function getAnswers(req, res) {
  const { userId } = req;
  const { questionId } = req.params;
  console.log('getAnswers controller userId :', userId);
  try {
    const answers = await getAnswersDb(userId, questionId);
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

// Voting
// Check if the user has already voted for this answer
async function getAnswerVoteByUser(req, res) {
  const { answerId } = req.params;
  const { userId } = req;
  try {
    const answerVoteByUser = await getAnswerVoteByUserDb(answerId, userId);
    console.log('answerVoteByUser:', answerVoteByUser);
    return res.json(answerVoteByUser);
  } catch (err) {
    console.log('error in get answer votes by user controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

// Update an existing user vote for the answer
async function updateAnswerVote(req, res) {
  const { vote } = req.body;
  const { answerId } = req.params;
  const { userId } = req;
  try {
    const insertResult = await updateAnswerVoteDb(vote, answerId, userId);
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'Your vote successfully updated.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to update your vote.' });
  } catch (err) {
    console.log('error in vote controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

// Insert a new vote for the answer
async function postAnswerVote(req, res) {
  const { answerId } = req.params;
  const { userId } = req;
  const { vote } = req.body;
  try {
    const insertResult = await postAnswerVoteDb(answerId, userId, vote);
    if (insertResult.affectedRows === 1) {
      return res.status(201).json({ success: true, message: 'Your vote successfully added.' });
    }
    return res.status(400).json({ success: false, message: 'Failed to add new vote.' });
  } catch (err) {
    console.log('error in vote controller:', err);
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

async function deleteAnswerVote(req, res) {
  const { answerId } = req.params;
  const { userId } = req;
  try {
    const deleteResult = await deleteAnswerVoteDb(answerId, userId);
    if (deleteResult.affectedRows === 1) {
      return res.status(200).json({ success: true, message: 'Answer vote successfully deleted.' });
    }
    if (deleteResult.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Unable to delete an answer vote.' });
    }
    throw new Error('unable to delete an answer vote');
  } catch (err) {
    console.log('error tryin to delete an answer vote:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = {
  getAnswers,
  postAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswerVoteByUser,
  updateAnswerVote,
  postAnswerVote,
  deleteAnswerVote,
};
