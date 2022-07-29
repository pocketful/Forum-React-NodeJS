const { registerUserDb } = require('../models/registerModel');

async function registerUser(req, res) {
  console.log('req.body===', req.body);
  const { username, email, password, image } = req.body;
  try {
    const insertResult = await registerUserDb(username, email, password, image);
    console.log('insertResult:', insertResult);
    return res.status(201).json({ success: true, message: 'New user successfully created.' });
  } catch (err) {
    console.log('error in register controller:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = registerUser;
