import React from "react";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Hotel from "./pages/Hotel";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Cities from "./pages/Admin/pages/Cities";
import Hotels from "./pages/Admin/pages/Hotels";
import Rooms from "./pages/Admin/pages/Rooms/Rooms";
import { withAdminProtection } from "./components/ProtectedRoutes/ProtectedRoutes";

const ProtectedCities = withAdminProtection(Cities);
const ProtectedHotels = withAdminProtection(Hotels);
const ProtectedRooms = withAdminProtection(Rooms);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/hotel/:hotelId" element={<Hotel />} />
      <Route path="/cart" element={<Checkout />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route
        path="/adminDashboard"
        element={<Navigate to="/adminDashboard/cities" replace />}
      />
      <Route path="/adminDashboard/cities" element={<ProtectedCities />} />
      <Route path="/adminDashboard/hotels" element={<ProtectedHotels />} />
      <Route path="/adminDashboard/rooms" element={<ProtectedRooms />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
