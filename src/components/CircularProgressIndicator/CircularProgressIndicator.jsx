import { CircularProgress } from "@mui/material";
import styles from "./style.module.css";

const CircularProgressIndicator = () => {
  return (
    <div className={styles.centered}>
      <CircularProgress />
    </div>
  );
};

export default CircularProgressIndicator;
