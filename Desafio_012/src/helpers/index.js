const bcrypt = require('bcrypt');

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const validatePassword = (password, passwordEncrypt) => {
  return bcrypt.compareSync(password, passwordEncrypt);
};

module.exports = {
  createHash,
  validatePassword,
};
