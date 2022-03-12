const express = require( 'express');
const router = express.Router();
const authControlle = require('../controllers/authController')
const {uploadPDF} = require('../controllers/userController')


router.post('/register', authControlle().register);
router.post('/login', authControlle().login);
router.post('/user/upload/:userId', uploadPDF)

module.exports = router