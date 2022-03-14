import React , {useEffect} from 'react'
import {dowmloadPdf} from './helper'
import { useLocation } from "react-router-dom";

function DownloadPdf() {
    const location = useLocation();
    const { pdfId } = location.state;
    useEffect(() => {
        dowmloadPdf(pdfId).then((data)=>{
            // console.log(data)
            const arr = new Uint8Array(data.pdf.data.data);
                var blob = new Blob([arr], { type: 'application/pdf' });
                var url = URL.createObjectURL(blob);
                window.open(url);
            
        });
      }, []);
  return (
    <div>DownloadPdf</div>
  )
}

export default DownloadPdf