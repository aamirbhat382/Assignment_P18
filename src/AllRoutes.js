import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import PrivateRoutes from './PrivateRoutes'
import Dashboard from "./Components/Dashboard";
import Upload from "./Components/Upload";
import ViewPdf from './Components/ViewPdf'
import DownloadPdf from './Components/DownloadPdf'
import MargePdf from "./Components/MargePdf";


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
            path="/dashboard/marge"
            element={
              <PrivateRoutes>
                <MargePdf />
              </PrivateRoutes>
            }
          ></Route> 
          <Route
            path="/dashboard/user/pdf/marge/:pdfId"
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