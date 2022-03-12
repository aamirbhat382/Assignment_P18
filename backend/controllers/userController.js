const Upload = require('../models/pdf')
const formidable = require("formidable");
const User = require('../models/user')
const Pdf = require('../models/pdf')
const fs = require("fs");

exports.uploadPDF = (req, res) => {
  const userId  = req.params.userId
    let form = new formidable.IncomingForm();
    // console.log(form);
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      // console.log(file)
      if (err) {
          // console.log(err)
        return res.status(400).json({
          error: "problem with PDF file",
        });
      }
  
      
      let upload = new Upload(fields);
  // console.log(pdf)
      //handle file here
      if (file.pdf) {
        if (file.pdf.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        // console.log(file.pdf.filepath)
        upload.pdf.data = fs.readFileSync(file.pdf.filepath);
        upload.pdf.contentType = file.pdf.mimetype;
      }
  
      //save to the DB
      // console.log(pdf)
      upload.save((err, pdf) => {
        if (err) {
            console.log(err)
          res.status(400).json({
            error: "Saving PDF in DB failed",
          });
        }
        User.findByIdAndUpdate(
          {_id:userId},
          {$push:{uploads:pdf._id}},
          {new:true},
          (err,pdfs)=>{
            if(err){
              return res.status(400).json({error:"Unable to save PDF"})
            }
          }
        )
      
        res.json(pdf);
      });
    });
  };

exports.getPdfs = async(req,res)=>{
  const userId  = req.params.userId
  const pdfIds  = await User.findById({_id:userId})
  let documents;
  try {
    documents = await Pdf.find({
      _id: { $in: pdfIds.uploads},
    }).select("-pdf");
  } catch (err) {
    return res.status(400).json({ err: "Something went wrong" });
  }
  // console.log(documents)
  return res.json(documents);
}
exports.viewPdf = async(req,res)=>{
  const pdfId  = req.params.pdfId
  let document;
  try {
    document = await Pdf.findById(
      {_id:pdfId}
    )
  } catch (err) {
    return res.status(400).json({ err: "Something went wrong" });
  }
  console.log(document)
  return res.json(document);
}
exports.downloadPdf = async(req,res)=>{
  const pdfId  = req.params.pdfId
  let document;
  try {
    document = await Pdf.findById(
      {_id:pdfId}
    )
  } catch (err) {
    return res.status(400).json({ err: "Something went wrong" });
  }
  console.log(document)
  return res.json(document);
}