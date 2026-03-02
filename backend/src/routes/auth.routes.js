const express = require('express');
const router = express.Router();

const passwordAuthMiddleware = require('../middleware/passwordChecker.middleware')
const signUpContoller = require('../controllers/auth/signup.controller');
const loginController = require('../controllers/auth/login.controller');
const {forgetpassword} = require('../controllers/auth/forgetpassword.controller');
const {resetPassword} = require('../controllers/auth/resetpassword.controller');

router.post("/signup",passwordAuthMiddleware, signUpContoller.signup);
router.post("/login", loginController.login);
router.post("/forgot-password-otp", forgetpassword);
router.post("/reset-password-otp", resetPassword);
module.exports = router;
