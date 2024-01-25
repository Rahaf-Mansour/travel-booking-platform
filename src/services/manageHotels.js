import axiosInstance from "../Axios/axiosInstance";

export const getAllHotels = async () => {
  try {
    const response = await axiosInstance.get(`/hotels`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the hotels"
    );
  }
};

export const getHotelInfoByItsId = async (hotelId) => {
  try {
    const response = await axiosInstance.get(`/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message ||
        "Error: Can't get the specific hotel's data"
    );
  }
};

export const postNewHotel = async (
  cityId,
  name,
  description,
  hotelType,
  starRating,
  latitude,
  longitude
) => {
  try {
    const response = await axiosInstance.post(`/cities/${cityId}/hotels`, {
      name,
      description,
      hotelType,
      starRating,
      latitude,
      longitude,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't create a new hotel"
    );
  }
};

export const updateHotel = async (
  hotelId,
  name,
  description,
  hotelType,
  starRating,
  latitude,
  longitude
) => {
  try {
    const response = await axiosInstance.put(`/hotels/${hotelId}`, {
      name,
      description,
      hotelType,
      starRating,
      latitude,
      longitude,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't update the hotel"
    );
  }
};

export const deleteHotel = async (cityId, hotelId) => {
  try {
    const response = await axiosInstance.delete(
      `/cities/${cityId}/hotels/${hotelId}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't delete the hotel"
    );
  }
};
