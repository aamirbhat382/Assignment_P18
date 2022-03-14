import React , {useEffect} from "react";

import { isAutheticated , margePdf } from "./helper";
function MargePdf() {
  const { user } = isAutheticated();
  useEffect(() => {
    margePdf(user._id).then((data) => {
        const arr = new Uint8Array(data.pdf.data.data);
        var blob = new Blob([arr], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);
        window.open(url);
    });
  }, []);



 
 
  return (
    <div>Marge PDF</div>
  );
}

export default MargePdf;
