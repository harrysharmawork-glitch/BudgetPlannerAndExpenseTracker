const express = require('express');
const router = express.Router();

const passwordAuthMiddleware = require('../middleware/passwordChecker.middleware')
const signUpContoller = require('../controllers/auth/signup.controller');
const loginController = require('../controllers/auth/login.controller');

router.post("/signup",passwordAuthMiddleware, signUpContoller.signup);
router.post("/login", loginController.login);

module.exports = router;
