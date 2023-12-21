import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage/SearchPage";
import { AuthContext } from "./context/authContext";

function App() {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {user?.userType == "User" && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
          </>
        )}
        {user?.userType == "Admin" && (
          <Route path="/adminDashboard" element={<>Hello admin</>} />
        )}

        {/* <Route path="/adminDashboard" element={<Dashboard />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
