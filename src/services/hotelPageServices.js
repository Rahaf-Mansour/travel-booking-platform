import axios from "axios";

const API_BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";

//Hotel name, star rating, description
export const getHotelDetails = async (hotelId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the hotel's details"
    );
  }
};

export const getHotelGuestReviews = async (hotelId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/hotels/${hotelId}/reviews`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the hotel's reviews"
    );
  }
};

//Hotel's pictures gallery
export const getHotelPicturesGallery = async (hotelId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/hotels/${hotelId}/gallery`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the hotel's pictures"
    );
  }
};

// Hotel's available rooms
export const getHotelAvailableRooms = async (
  hotelId,
  checkInDate,
  checkOutDate
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/hotels/${hotelId}/available-rooms`,
      {
        params: {
          checkInDate,
          checkOutDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message ||
        "Error: Can't get the hotel's available rooms"
    );
  }
};
