import React from "react";
import pageError from "../../assets/images/pageError.jpg";
import NavBar from "../../components/NavBar";
import styles from "./style.module.css";
import Footer from "../../components/Footer";

const PageNotFound = () => {
  return (
    <>
      <NavBar />
      <div className={styles.errorContainer}>
        <img
          className={styles.pageNotFoundImage}
          src={pageError}
          alt="pageError"
          width={500}
        />
        <h1 className={styles.errorMessage}>
          We cannot find the page you are looking for!
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
