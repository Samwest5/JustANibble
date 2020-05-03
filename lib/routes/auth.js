const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/register', controller.registerPOST);

router.post('/login', controller.loginPOST);

router.get('/login', controller.loginGET);

router.post('/logout', [controller.verifyToken, controller.logoutPOST]);

module.exports = router;