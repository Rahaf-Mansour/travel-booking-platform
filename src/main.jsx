import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import LoaderContextProvider from "./context/LoaderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoaderContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </LoaderContextProvider>
  </BrowserRouter>
);
