import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import FileUpload from "./FileUpload";
import OurCollections from "./OurCollections";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import AdminLogin from "./AdminLogin";
import OCUser from "./OCUser";
import Feedback from "./Feedback";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/fp" element={<ForgotPassword />} />
          <Route path="/cp" element={<ChangePassword />} />
          <Route path="*" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/collections" element={<OurCollections />} />
          <Route path="/ocuser" element={<OCUser />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
