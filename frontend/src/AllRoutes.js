import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import PrivateRoutes from './PrivateRoutes'
import Dashboard from "./Dashboard";
import Upload from "./Upload";
import ViewPdf from './ViewPdf'
import DownloadPdf from './DownloadPdf'


const AllRoutes = () => {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/signup" element={<Home />}></Route>

          {/*Private  Routes user must be login  */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          ></Route> 
          <Route
            path="/dashboard/upload"
            element={
              <PrivateRoutes>
                <Upload />
              </PrivateRoutes>
            }
          ></Route> 
          <Route
            path="/dashboard/user/pdf/view/:pdfId"
            element={
              <PrivateRoutes>
                <ViewPdf />
              </PrivateRoutes>
            }
          ></Route> 
          <Route
            path="/dashboard/user/pdf/download/:pdfId"
            element={
              <PrivateRoutes>
                <DownloadPdf />
              </PrivateRoutes>
            }
          ></Route> 
        </Routes>
     
    </BrowserRouter>
  );
};

export default AllRoutes;