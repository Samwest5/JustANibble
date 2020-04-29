const express = require('express');
const router = express.Router();
const controller = require('../controllers/drinks');

router.get('/', controller.drinksGET);

module.exports = router;