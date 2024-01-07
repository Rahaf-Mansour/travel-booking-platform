import axiosInstance from "../Axios/axiosInstance";

export const getAllCities = async () => {
  try {
    const response = await axiosInstance.get(`/cities`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't get the cities"
    );
  }
};

export const postNewCity = async (cityName, cityDescription) => {
  try {
    const response = await axiosInstance.post(`/cities`, {
      name: cityName,
      description: cityDescription,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't create a new city"
    );
  }
};

export const updateCity = async (cityId, cityName, cityDescription) => {
  try {
    const response = await axiosInstance.put(`/cities/${cityId}`, {
      name: cityName,
      description: cityDescription,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't update the city"
    );
  }
};
