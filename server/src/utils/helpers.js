const bcrypt = require('bcryptjs');

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function passwordsMatch(passwordInput, foundedHashedPass) {
  return bcrypt.compareSync(passwordInput, foundedHashedPass);
}

module.exports = {
  hashPassword,
  passwordsMatch,
};
