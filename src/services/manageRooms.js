import axiosInstance from "../Axios/axiosInstance";

export const postNewRoom = async (hotelId, roomNumber, cost) => {
  try {
    const response = await axiosInstance.post(`/hotels/${hotelId}/rooms`, {
      roomNumber,
      cost,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't create a new room"
    );
  }
};

export const updateRoom = async (roomId, roomNumber, cost) => {
  try {
    const response = await axiosInstance.put(`/rooms/${roomId}`, {
      roomNumber,
      cost,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't update the room"
    );
  }
};

export const deleteRoom = async (hotelId, roomId) => {
  try {
    const response = await axiosInstance.delete(
      `/hotels/${hotelId}/rooms/${roomId}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't delete the room"
    );
  }
};
