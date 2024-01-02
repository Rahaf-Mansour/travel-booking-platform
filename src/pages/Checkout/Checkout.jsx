import React from "react";
import NavBar from "../../components/NavBar";
import styles from "./style.module.css";

const Checkout = () => {
  return (
    <>
      <NavBar />
      <div className={styles.checkoutContainer}>
        <h1>Checkout</h1>
      </div>
    </>
  );
};

export default Checkout;
