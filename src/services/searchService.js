import axiosInstance from "../Axios/axiosInstance";

export const searchAPI = async (values) => {
  try {
    const response = await axiosInstance.get(`/home/search`, values);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Error: Can't search");
  }
};
