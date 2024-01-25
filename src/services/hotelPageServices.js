import axiosInstance from "../Axios/axiosInstance";

export const getHotelDetails = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export const getHotelGuestReviews = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/hotels/${hotelId}/reviews`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export const getHotelPicturesGallery = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/hotels/${hotelId}/gallery`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
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
    return Promise.reject(error.response);
  }
};
