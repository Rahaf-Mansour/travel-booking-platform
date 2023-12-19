import React from "react";
// import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          {/* <Route path="/adminDashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
