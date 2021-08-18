const express = require('express');

const router = express.Router();

const controller = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware')
// authenticates that our user is a guest and he didn't sugn up
router.post('/',authMiddleware.guest, controller.login);

router.get('/me', authMiddleware.authenticated, controller.me);

module.exports = router;