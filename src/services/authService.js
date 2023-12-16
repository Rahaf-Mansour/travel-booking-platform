import axios from "axios";

const API_BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";

// Login API call
export const login = async (values) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/authenticate`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Error: Unauthorized");
  }
};
