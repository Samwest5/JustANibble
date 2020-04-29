const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/register', controller.registerPOST);

router.post('/login', controller.loginPOST);

router.post('/logout', controller.logoutPOST);

module.exports = router;