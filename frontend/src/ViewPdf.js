import React, { useEffect,  useState } from 'react'
import { useLocation } from 'react-router-dom';
import { viewPdf } from './helper';

function ViewPdf() {
  const location = useLocation()
  const {pdfId} = location.state
  console.log(pdfId)
  const [pdf_file, setPdf] = useState({
    error: "",
    success: false,
    pdf:""
  });
  const { error, success, pdf } = pdf_file;
  useEffect(() => {
    viewPdf(pdfId).then((data) => {
      if (data.error) {
        setPdf({ ...pdf_file, error: data.error });
      } else {
        setPdf({
          ...pdf_file,
          success: true,
          pdf: data.pdf,
        });
      }
    });
  }, []);

console.log(pdf_file)
  return (
   
    <head></head>
  )
}

export default ViewPdf
