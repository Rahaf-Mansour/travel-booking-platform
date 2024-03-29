import { useRef, useEffect } from "react";
import NavBar from "../../components/NavBar";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../components/CustomButton";
import styles from "./style.module.css";
import ConfirmationTable from "./components/ConfirmationTable";
import CelebrationIcon from "@mui/icons-material/Celebration";
import useCartContext from "../../hooks/useCartContext";
import Footer from "../../components/Footer";

const Confirmation = () => {
  const { clearCart } = useCartContext();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    return () => {
      clearCart();
    };
  }, [clearCart]);

  return (
    <>
      <NavBar />
      <div className={styles.confirmationContainer} ref={componentRef}>
        <div className={styles.confirmationHeader}>
          <CelebrationIcon />
          <h1>Here is your confirmation details. Hope you enjoy your stay! </h1>
        </div>
        <ConfirmationTable />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CustomButton className={styles.printButton} onClick={handlePrint}>
          Print Confirmation
        </CustomButton>
      </div>
      <Footer />
    </>
  );
};

export default Confirmation;
