import axiosInstance from "../Axios/axiosInstance";

export const postNewBooking = async (values) => {
  try {
    const response = await axiosInstance.post(`/bookings`, values);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't post the new booking"
    );
  }
};
