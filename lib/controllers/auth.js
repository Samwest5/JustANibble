const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TokenSecret } = require('../../config/config');
const SaltRounds = 10;
const pool = require('../../config/mysqlConnector');


// let is_valid_password = async (password) => {
//   if (password.length < 8) {
//     return false;
//   }
//   else {
//     return true;
//   }
// };

exports.register = async (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let hash = await bcrypt.hash(password, SaltRounds);
    let post = {user_name: username, password_hash: hash};
    let result = await pool.query('INSERT INTO users SET ?', post);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// CREATE TABLE IF NOT EXISTS users (
//   user_id INT AUTO_INCREMENT PRIMARY KEY,
//   user_name VARCHAR(255) NOT NULL,
//   password_hash CHAR(60) NOT NULL,
//   is_writer BOOLEAN NOT NULL DEFAULT FALSE
// );

exports.login = async (req, res, next) => {

};

exports.is_authorized = async (req, res, next) => {

};

// exports.authError = async (err, req, res, next) => {
//   res.json(false);
// };
