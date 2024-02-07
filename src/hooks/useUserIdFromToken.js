import { jwtDecode } from "jwt-decode";
import useAuthToken from "./useAuthToken";

const getUserIdFromToken = (token) => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};

const useUserIdFromToken = () => {
  const token = useAuthToken();
  return getUserIdFromToken(token);
};

export default useUserIdFromToken;
