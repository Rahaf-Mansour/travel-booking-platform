import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import Home from "../pages/Home";
import { AuthContext } from "../context/authContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("../components/NavBar", () => () => <div>NavBar</div>);
jest.mock("../pages/Home/components/HeroSection", () => () => (
  <div>HeroSection</div>
));
jest.mock("../pages/SearchPage/components/SearchBar", () => () => (
  <div>SearchBar</div>
));
jest.mock("../pages/Home/components/FeaturedDeals", () => () => (
  <div>FeaturedDeals</div>
));
jest.mock("../pages/Home/components/TrendingDestinations", () => () => (
  <div>TrendingDestinations</div>
));
jest.mock("../pages/Home/components/RecentlyVisitedHotels", () => () => (
  <div>RecentlyVisitedHotels</div>
));
jest.mock("../components/Footer", () => () => <div>Footer</div>);

describe("Home Component", () => {
  it("renders the home page after successful login", async () => {
    const authContextValue = {
      user: {},
      loginUser: jest.fn(),
      logoutUser: jest.fn(),
    };

    render(
      <BrowserRouter>
        <AuthContext.Provider value={authContextValue}>
          <Home />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("NavBar")).toBeInTheDocument();
      expect(screen.getByText("HeroSection")).toBeInTheDocument();
      expect(screen.getByText("SearchBar")).toBeInTheDocument();
      expect(screen.getByText("FeaturedDeals")).toBeInTheDocument();
      expect(screen.getByText("TrendingDestinations")).toBeInTheDocument();
      expect(screen.getByText("RecentlyVisitedHotels")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});
