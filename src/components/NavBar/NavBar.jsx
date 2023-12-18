import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>Booking </span>
      <button className={styles.navButton}>
        <NavLink to="/">Logout</NavLink>
      </button>
    </nav>
  );
};

export default NavBar;
