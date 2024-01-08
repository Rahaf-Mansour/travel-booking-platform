import { jwtDecode } from "jwt-decode";
import useAuthToken from "./useAuthToken";

const useUserIdFromToken = () => {
  const token = useAuthToken();

  const getUserIdFromToken = () => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;
        return userId;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    return null;
  };

  return getUserIdFromToken();
};

export default useUserIdFromToken;
