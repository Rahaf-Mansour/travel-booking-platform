import React from "react";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom"; // 'Navigate' is used instead of 'Redirect', and 'Switch' is removed
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import { AuthContext } from "./context/authContext";
import Hotel from "./pages/Hotel";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Cities from "./pages/Admin/pages/Cities";
import Hotels from "./pages/Admin/pages/Hotels";
import Rooms from "./pages/Admin/pages/Rooms/Rooms";

function App() {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {user?.userType === "User" && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/hotel/:hotelId" element={<Hotel />} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </>
        )}
        {user?.userType === "Admin" && (
          <>
            <Route path="/adminDashboard/cities" element={<Cities />} />
            <Route path="/adminDashboard/hotels" element={<Hotels />} />
            <Route path="/adminDashboard/rooms" element={<Rooms />} />
            <Route
              path="/adminDashboard/*"
              element={<Navigate to="/adminDashboard/cities" replace />}
            />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
