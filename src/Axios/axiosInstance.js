import axios from "axios";

const API_BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
