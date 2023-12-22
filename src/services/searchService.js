import axios from "axios";

const API_BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";

// Search API call
export const searchAPI = async (values) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/home/search`, values);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Error: Can't search");
  }
};
