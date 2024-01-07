import axiosInstance from "../Axios/axiosInstance";

export const featuredDealsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/home/featured-deals`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Error: Can't fetch the featured deals"
    );
  }
};

export const trendingDestinationsAPI = async () => {
  try {
    const response = await axiosInstance.get(`/home/destinations/trending`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message ||
        "Error: Can't fetch the trending destinations"
    );
  }
};

export const recentlyVisitedHotelsAPI = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/home/users/${userId}/recent-hotels`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message ||
        "Error: Can't fetch the recently visited hotels"
    );
  }
};
