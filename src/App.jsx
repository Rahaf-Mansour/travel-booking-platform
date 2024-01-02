import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage/SearchPage.jsx";
import { AuthContext } from "./context/authContext";
import SearchContextProvider from "./context/searchContext.jsx";
import Hotel from "./pages/Hotel";

function App() {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      <SearchContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          {user?.userType == "User" && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              {/* <Route path="/hotel" element={<Hotel />} /> */}
              <Route path="/hotel/:hotelId" element={<Hotel />} />
            </>
          )}
          {user?.userType == "Admin" && (
            <Route path="/adminDashboard" element={<>Hello admin</>} />
          )}

          {/* <Route path="/adminDashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </SearchContextProvider>
    </>
  );
}

export default App;
