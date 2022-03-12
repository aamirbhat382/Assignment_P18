import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated, getPdf } from "./helper";
function Dashboard() {
  const { user } = isAutheticated();
  const [pdfs_files, setPdfs] = useState({
    error: "",
    success: false,
    pdfs: [],
  });
  const { error, success, pdfs } = pdfs_files;
  useEffect(() => {
    getPdf(user._id).then((data) => {
      if (data.error) {
        setPdfs({ ...pdfs_files, error: data.error });
      } else {
        setPdfs({
          ...pdfs_files,
          success: true,
          pdfs: data,
        });
      }
    });
  }, []);

 
  return (
    <div className="container py-5">
      <button className="btn btn-dark pointer ">
        <Link className="text-light" to="/dashboard/upload">
          Upload PDF
        </Link>
      </button>
      <div className="list-group py-2 mt-2">
        {pdfs_files.pdfs &&
          pdfs_files.pdfs.map((element) => {
           return( <div 
              className="list-group-item list-group-item-action flex-column align-items-start "
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{element.name}</h5>
                <small><Link to={`/dashboard/user/pdf/view/${element._id}`} state={{ pdfId: element._id }}>View</Link></small>
                <small><Link to=''>Downloaf</Link></small>
              </div>
            </div>);
          })}
      </div>
    </div>
  );
}

export default Dashboard;
