import React from "react";
import NavBar from "../../components/NavBar";
import styles from "./style.module.css";
import FormInformation from "./components/FormInformation/FormInformation";

const Checkout = () => {
  return (
    <>
      <NavBar />
      <div className={styles.checkoutContainer}>
        <FormInformation />
      </div>
    </>
  );
};

export default Checkout;
