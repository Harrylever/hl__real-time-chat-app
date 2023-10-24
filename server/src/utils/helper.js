const bcryptjs = require('bcryptjs');

/**
 *
 * @param {string} password
 * @returns {string}
 * @description Hash the password from request body
 */
function passwordHash(password) {
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);

  return hashedPassword;
}

/**
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean} boolean
 * @description compares the body from request body and return boolean
 */
function comparePassword(password, hashedPassword) {
  return bcryptjs.compareSync(password, hashedPassword);
}

module.exports = {
  passwordHash, comparePassword,
};
