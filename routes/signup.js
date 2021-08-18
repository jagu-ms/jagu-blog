const express = require('express');

const router = express.Router();

const controller = require('../controllers/signUpController');

const authMiddleware = require('../middlewares/authMiddleware')

router.post('/',authMiddleware.guest, controller.signup);

module.exports = router;