import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthToken = () => {
  const { user } = useContext(AuthContext);
  const token = user ? user.authentication : null;
  return token;
};

export default useAuthToken;
