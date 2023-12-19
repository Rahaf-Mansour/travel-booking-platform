import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import CustomButton from "../CustomButton";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <CustomButton className={styles.logo}>
        <NavLink to="/home">Booking</NavLink>
      </CustomButton>
      <div>
        <CustomButton className={styles.navButton}>
          <NavLink to="/home">Home</NavLink>
        </CustomButton>
        <CustomButton className={styles.navButton}>
          <NavLink to="/search">Search</NavLink>
        </CustomButton>
        <CustomButton className={styles.navButton}>
          <NavLink to="/hotel">Hotel</NavLink>
        </CustomButton>
      </div>
    </nav>
  );
};

export default NavBar;
