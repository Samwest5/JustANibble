const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TokenSecret, SaltRounds } = require('../../config/config');
const pool = require('../../config/mysqlConnector');

const generateToken = async (res, user_id, username, is_writer) => {
  const token = jwt.sign(
    { user_id, username, is_writer },
    TokenSecret, 
    { expiresIn: '7d' }
  );
  res.cookie(
    'token', 
    token,
    { 
      expires: new Date(Date.now() + 8 * 3600000),
      secure: false, // TODO switch to true with https
      httpOnly: true,
    },
  );
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || '';
    if (!token) {
      return res.redirect('/');
    }
    const identity = await jwt.verify(token, TokenSecret);
    req.identity = {
      user_id: identity.user_id,
      username: identity.username,
      is_writer: identity.is_writer
    };
    next();
  } catch (err) {
    next(err);
  }
};

exports.isWriter = async (req, res, next) => {
  try {
    if (req.identity.is_writer) {
      next();
    }
    else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
};

const checkRegistrationFields = async (username, password) => {
  let errors = {};
  if (username.length < 1) {
    errors.username_error = 'Please enter a username.';
  }
  else {
    const result = await pool.query('SELECT * FROM users WHERE user_name LIKE ?', username);
    if (result.length > 0) {
      errors.username_error = 'Username already taken.';
    }
  }
  if (password.length < 8) {
    errors.password_error = 'Password must be 8 or more characters.';
  }
  console.log(errors);
  return errors;
};

exports.registerPOST = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const errors = await checkRegistrationFields(username, password);
    if (Object.keys(errors).length > 0) {
      res.render('login', errors);
    }
    const hash = await bcrypt.hash(password, SaltRounds);
    const post = { user_name: username, password_hash: hash };
    const result = await pool.query('INSERT INTO users SET ?', post);
    await generateToken(res, result.insertId, username, false);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};


exports.loginGET = async (req, res, next) => {
  try {
    res.render('login', {title: "Login"});
  } catch (err) {
    next(err);
  }
};


exports.loginPOST = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    queryString = 'SELECT * FROM users WHERE user_name LIKE ?';
    const result = await pool.query(queryString, username);
    if (result.length === 0) {
      res.render('login', {login_error: 'Invalid credentials'})
    }
    const user = result[0];
    let match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      await generateToken(res, user.user_id, user.user_name, user.is_writer);
      res.rediret('/');
    }
    else {
      res.render('login', {login_error: 'Invalid credentials'})
    }
  } catch (err) {
    next(err);
  }
};

exports.logoutPOST = async (req, res, next) => {
  try {
    res.clearCookie('token',
    { 
      expires: new Date(Date.now() + 8 * 3600000),
      secure: false, // TODO switch to true with https
      httpOnly: true,
    })
    res.send();
  } catch (err) {
    next(err);
  }
};
