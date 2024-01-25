import axiosInstance from "../Axios/axiosInstance";

export const loginAPI = async (values) => {
  try {
    const response = await axiosInstance.post(`/auth/authenticate`, values);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Error: Unauthorized User");
  }
};
