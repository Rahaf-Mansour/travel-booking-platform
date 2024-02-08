import { Skeleton } from "@mui/material";
import styles from "./style.module.css";

const SkeletonDealCard = () => {
  return (
    <div className={styles.skeletonDealCard}>
      <Skeleton variant="rectangular" width="100%" height="300px" />
      <div className={styles.bottomContainer}>
        <Skeleton />
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </div>
    </div>
  );
};

export default SkeletonDealCard;
