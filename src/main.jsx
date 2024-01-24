import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import CartContextProvider from "./context/CartContext.jsx";
import { FormContextProvider } from "./context/CheckoutFormContext .jsx";
import SearchContextProvider from "./context/searchContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SearchContextProvider>
        <CartContextProvider>
          <FormContextProvider>
            <LoadingProvider>
              <App />
            </LoadingProvider>
          </FormContextProvider>
        </CartContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
