import React from "react";
import pageError from "../../assets/images/pageError.jpg";
import NavBar from "../../components/NavBar";
import styles from "./style.module.css";

const PageNotFound = () => {
  return (
    <>
      <NavBar />
      <div className={styles.errorImage}>
        <img
          className={styles.pageNotFoundImage}
          src={pageError}
          alt="pageError"
          width={500}
        />
        <h1 className={styles.errorMessage}>
          We can’t find the page you’re looking for!
        </h1>
      </div>
    </>
  );
};

export default PageNotFound;
