const express = require( 'express');
const router = express.Router();
const authControlle = require('../controllers/authController')
const {uploadPDF, getPdfs, viewPdf} = require('../controllers/userController')


router.post('/register', authControlle().register);
router.post('/login', authControlle().login);
router.post('/user/upload/:userId', uploadPDF)
router.get('/user/pdfs/:userId', getPdfs)
router.get('/user/pdf/view/:pdfId', viewPdf)

module.exports = router