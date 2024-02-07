import { jwtDecode } from "jwt-decode";
import useAuthToken from "./useAuthToken";

const getValueFromToken = (token, thing) => {
  try {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken[thing];
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
  return null;
};

const useValueFromToken = (thing) => {
  const token = useAuthToken();
  return getValueFromToken(token, thing);
};

export default useValueFromToken;
