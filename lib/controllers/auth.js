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
  // todo fix on not verified
  try {
    const token = req.cookies.token || '';
    if (!token) {
      res.status(400);
      res.send();
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
      res.status(400);
      res.json('Must be writer to access this page');
    }
  } catch (err) {
    next(err);
  }
};

exports.registerPOST = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (password.length < 8) {
      return res.status(400).json('Password does not meet requirements');
    }
    console.log("1");
    const hash = await bcrypt.hash(password, SaltRounds);
    console.log("2");
    const post = { user_name: username, password_hash: hash };
    console.log("3");
    const result = await pool.query('INSERT INTO users SET ?', post);
    console.log("4");
    await generateToken(res, result.insertId, username, false);
    console.log("5");
    res.status(200);
    res.send();
  } catch (err) {
    if (err.errno && err.errno === 1062) {
      res.status(400).json('Username already exists');
    }
    else {
      next(err);
    }
  }
};

exports.loginGET = async (req, res, next) => {
  try {
    res.render('login', {title: "Login"});
  } catch (err) {
    next(err);
  }
}


exports.loginPOST = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    queryString = 'SELECT * FROM users WHERE user_name LIKE ?';
    const result = await pool.query(queryString, username);
    if (result.length === 0) {
      res.status(400);
      return res.json("Invalid credentials");
    }
    const user = result[0];
    let match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      await generateToken(res, user.user_id, user.user_name, user.is_writer);
      res.status(200);
      res.send();
    }
    else {
      res.status(400);
      res.json("Invalid credentials");
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
