import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuthToken = () => {
  const { user } = useContext(AuthContext);
  const token = user ? user.authentication : null;
  console.log("Token:", token);
  return token;
};

export default useAuthToken;
