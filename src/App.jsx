import React from "react";
import Home from "./pages/Home.jsx";
import Layout from "./pages/Layout.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />}/>
          <Route path="login" element={<LogIn/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
