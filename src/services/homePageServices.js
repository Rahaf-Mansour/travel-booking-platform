import axios from "axios";

const API_BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";

export const featuredDealsAPI = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/home/featured-deals`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't fetch the featured deals"
    );
  }
};

export const trendingDestinationsAPI = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/home/destinations/trending`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message ||
        "Error: Can't fetch the trending destinations"
    );
  }
};

export const recentlyVisitedHotelsAPI = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/home/users/${userId}/recent-hotels`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message ||
        "Error: Can't fetch the recently visited hotels"
    );
  }
};
