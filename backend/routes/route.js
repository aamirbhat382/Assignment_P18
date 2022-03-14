const express = require( 'express');
const router = express.Router();
const authControlle = require('../controllers/authController')
const {uploadPDF, getPdfs, viewPdf, downloadPdf} = require('../controllers/userController')

// POST Routes

router.post('/register', authControlle().register); // Register Route
router.post('/login', authControlle().login); // Login Route
router.post('/user/upload/:userId', uploadPDF); //Upload PDF Route
router.get('/user/pdfs/:userId', getPdfs); // Show PDF's Route

// GET  Routes
router.get('/user/pdf/view/:pdfId', viewPdf); // View PDF File Route 
router.get('/user/pdf/download/:pdfId', downloadPdf); // Download PDF File Route
// router.get('/user/pdfs/marge/:userId', margePdfs); Marge PDF Files *@Panding

module.exports = router