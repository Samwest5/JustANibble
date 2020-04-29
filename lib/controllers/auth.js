const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { TokenSecret, SaltRounds } = require('../../config/config');
const pool = require('../../config/mysqlConnector');

const generateToken = async (res, user_id, username) => {
  const token = jwt.sign(
    { user_id, username },
    TokenSecret, 
    { expiresIn: '7d' }
  );
  return res.cookie(
    'token', 
    token,
    { 
      expires: new Date(Date.now() + 8 * 3600000),
      secure: false, // TODO switch to true with https
      httpOnly: true,
    },
  );
};

const verifyToken = async (req, res, next) => {
  // todo fix on not verified
  try {
    const token = req.cookies.token || '';
    if (!token) {
      return res.redirect(400, '/');
    }
    const identity = await jwt.verify(token, TokenSecret);
    req.identity = {
      user_id: identity.user_id,
      username: identidy.username
    };
    next();
  } catch (err) {
    return next(err);
  }
};

exports.verifyToken = verifyToken;

exports.registerPOST = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (password.length < 8) {
      return res.status(400).json('Password does not meet requirements');
    }
    const hash = await bcrypt.hash(password, SaltRounds);
    const post = { user_name: username, password_hash: hash };
    const result = await pool.query('INSERT INTO users SET ?', post);
    console.log(result);
    await generateToken(res, result.insertId, username);
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
    console.log(result);
    let match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      await generateToken(res, result.insertId, username);
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
 // TODO CLEAR THE COOKIE
};
