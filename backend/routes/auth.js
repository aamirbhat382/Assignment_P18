const express = require( 'express');
const router = express.Router();
const authControlle = require('../controllers/authController')



router.post('/register', authControlle().register);
// router.post('/login', loginController.login);

module.exports = router