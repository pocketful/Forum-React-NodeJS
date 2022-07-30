const { loginUserDb } = require('../models/loginModel');
const { passwordsMatch } = require('../utils/hashPass');
const { signingJwt } = require('../utils/jwtTokens');

async function loginUser(req, res) {
  const emailInput = req.body.email;
  console.log('emailInput ===', emailInput);
  const passwordInput = req.body.password;
  console.log('passwordInput ===', passwordInput);

  try {
    // if user with this email exists
    const [foundUser] = await loginUserDb(emailInput);
    console.log('user with this email ===', foundUser);

    if (!foundUser) throw new Error(400);

    // if passwords match
    if (!passwordsMatch(passwordInput, foundUser.password)) throw new Error(402);

    // signing jwt
    const payload = { userId: foundUser.user_id };
    const token = signingJwt(payload);
    console.log('token', token);

    return res.json({ success: true, message: 'Login success.', token });
  } catch (err) {
    console.log('error in login controller:', err);
    if (err.message === '400') {
      return res.status(400).json({ success: false, message: 'Wrong email or password.' });
    }
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = loginUser;
