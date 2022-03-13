import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { viewPdf } from "./helper";

function ViewPdf() {
  const location = useLocation();
  const { pdfId } = location.state;
  console.log(pdfId);
  const [pdf_file, setPdf] = useState({
    error: "",
    success: false,
    pdf: {},
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

  function showPdfFile() {
    if (pdf_file.success === true) {
      return (
        <embed
          src={`data:application/pdf;base64,${btoa(
            String.fromCharCode(...new Uint8Array(pdf_file.pdf.data.data))
          )}`}
          id="displayFile"
          alt="your image"
          width="100%"
          height="1200px"
          style={{ borderStyle: "none" }}
          type="application/pdf"
        />
      );
    }
  }
  console.log(pdf_file);
  return <>{pdf_file.success === true && showPdfFile()}</>;
}

export default ViewPdf;
