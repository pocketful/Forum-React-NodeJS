const bcrypt = require('bcryptjs');

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

module.exports = {
  hashPassword,
};
