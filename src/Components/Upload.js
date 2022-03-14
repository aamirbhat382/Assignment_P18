import React, { useState, useEffect } from "react";
import {  isAutheticated, uploadPdf} from "./helper";
import {Link } from 'react-router-dom'



const Upload = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    pdf: "",
    loading: false,
    error: "",
    
    success:false,
    formData: new FormData()
  });

  const {
    name,
    loading,
    error,
    
    success,
    formData
  } = values;

 

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    uploadPdf(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          success: true,
          name: ""
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "pdf" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            File Uploaded SusssFully
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  const loadingMessage = () => {
    return (
      <div className="spinner-border" role="status" style={{ display: loading ? "" : "none" }}>
      <span className="visually-hidden">Loading...</span>
</div>    
    );
  };

  const uploadForm = () => {
    return (
      <div className="form-container  rounded">
          <h1>Upload PDF</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">File Name</label>
            <input
              type="text"
              value={name}
              onChange={handleChange("name")}
              className="form-control"
              aria-describedby="nameHelp"
              placeholder="File Name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="photo" className="form-label text-light">
              Choose File
            </label>
            <input
              type="file"
              name="pdf"
              accept="pdf"
              onChange={handleChange("pdf")}
              className="form-control"
              aria-describedby="pdfHelp"
            />
          </div>
          <button onClick={onSubmit} className="btn btn-primary ">
            Upload
          </button>
        <button className="btn btn-dark pointer mx-2 ">
        <Link className="text-light" to="/dashboard">
          Dashboard
        </Link>
      </button>
        </form>
      </div>
    );
  };
  return (
    <>
    <div className="container py-5">
    {loadingMessage()}
      {errorMessage()}
      {successMessage()}
      {uploadForm()}
      <Link to="https://github.com/aamirbhat382/Assignment_P18/tree/main">Github</Link>
      </div>
    </>
  );
};

export default Upload;
