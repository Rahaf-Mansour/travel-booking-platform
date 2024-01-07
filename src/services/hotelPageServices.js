import axiosInstance from "../Axios/axiosInstance";

export const getHotelDetails = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the hotel's details"
    );
  }
};

export const getHotelGuestReviews = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/hotels/${hotelId}/reviews`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the hotel's reviews"
    );
  }
};

export const getHotelPicturesGallery = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/hotels/${hotelId}/gallery`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the hotel's pictures"
    );
  }
};

export const getHotelAvailableRooms = async (
  hotelId,
  checkInDate,
  checkOutDate
) => {
  try {
    const response = await axiosInstance.get(
      `/hotels/${hotelId}/available-rooms`,
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
