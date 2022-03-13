const express = require( 'express');
const router = express.Router();
const authControlle = require('../controllers/authController')
const {uploadPDF, getPdfs, viewPdf, downloadPdf} = require('../controllers/userController')


router.post('/register', authControlle().register);
router.post('/login', authControlle().login);
router.post('/user/upload/:userId', uploadPDF)
router.get('/user/pdfs/:userId', getPdfs)
router.get('/user/pdf/view/:pdfId', viewPdf)
router.get('/user/pdf/download/:pdfId', downloadPdf)

module.exports = router