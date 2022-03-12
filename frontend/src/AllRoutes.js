import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignIn from "./SignIn";
import PrivateRoutes from './PrivateRoutes'
import Dashboard from "./Dashboard";
import Upload from "./Upload";
import ViewPdf from './ViewPdf'


const AllRoutes = () => {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>

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
        </Routes>
     
    </BrowserRouter>
  );
};

export default AllRoutes;