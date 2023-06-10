const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, authController.getUserList);
router.post('/token',  authController.getToken);
router.post('/signup', authController.signUpUser);
router.post('/login', authController.loginUser);
module.exports = router;