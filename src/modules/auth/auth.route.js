const router = require('express').Router();
const authController = require('./auth.controller');

router.post('/auth/login', authController.signIn);

module.exports = router;
