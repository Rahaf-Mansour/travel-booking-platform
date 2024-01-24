import React from "react";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./style.module.css";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../../../context/CheckoutFormContext ";
import { useCartContext } from "../../../../context/CartContext";
import { postNewBooking } from "../../../../services/bookingServices";
import CustomTextField from "../CustomTextField";
import paymentSchema from "./paymentSchema";
import useSnackbar from "../../../../hooks/useSnackbar";

const initialValues = {
  fullName: "",
  email: "",
  paymentMethod: "Visa",
  cardNumber: "",
  expirationDate: "",
  cvv: "",
  billingAddress: {
    state: "",
    city: "",
  },
  specialRequests: "",
};

const paymentMethods = ["Visa", "MasterCard", "American Express", "Discover"];

const formatCardNumber = (value) => {
  const noSpacesValue = value.replace(/\s/g, "");
  return noSpacesValue ? noSpacesValue.match(/.{1,4}/g).join(" ") : "";
};

const FormInformation = () => {
  const {
    snackbar,
    handleCloseSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar,
  } = useSnackbar();
  const navigateToConfirmationPage = useNavigate();
  const { setValues } = useFormContext();
  const { cart } = useCartContext();

  const handlePayment = async (values) => {
    try {
      const bookingRequest = {
        customerName: values.fullName,
        paymentMethod: values.paymentMethod,
        roomNumber: cart[0].roomNumber,
        roomType: cart[0].roomType,
        totalCost: cart[0].price,
      };
      console.log("Payment submitted:", values);
      const response = await postNewBooking(bookingRequest);
      console.log("Booking submitted:", bookingRequest);
      console.log("Booking response:", response);
      setValues(values);
      showSuccessSnackbar("Completed! Thanks for your order!");
      setTimeout(() => {
        navigateToConfirmationPage("/confirmation");
      }, 2000);
    } catch (error) {
      showErrorSnackbar("Sorry, your booking is failed.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Payment Information</h2>
      <p>
        To complete your booking, please provide your personal details and
        payment information. Additionally, feel free to include any special
        requests or remarks.
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={handlePayment}
        validationSchema={paymentSchema}
      >
        <Form>
          <CustomTextField name="fullName" label="Full Name" />
          <CustomTextField name="email" label="Email" type="email" />
          <CustomTextField name="billingAddress.state" label="State" />
          <CustomTextField name="billingAddress.city" label="City" />

          <CustomTextField
            name="paymentMethod"
            label="Payment Method"
            as={Select}
            fullWidth
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </CustomTextField>

          <CustomTextField
            name="cardNumber"
            label="Card Number"
            inputProps={{
              maxLength: 19,
              onChange: (e) => {
                const noSpacesValue = e.target.value.replace(/\s/g, "");
                const formattedValue = formatCardNumber(noSpacesValue);
                e.target.value = formattedValue;
              },
            }}
          />

          <CustomTextField
            name="expirationDate"
            label="Expiration Date MM/YY"
          />

          <CustomTextField
            name="cvv"
            label="CVV"
            inputProps={{ maxLength: 4 }}
          />

          <CustomTextField
            name="specialRequests"
            label="Special Requests or Remarks"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginX: "auto", display: "block" }}
          >
            Confirm and Pay
          </Button>
        </Form>
      </Formik>

      <GenericSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
      />
    </div>
  );
};

export default FormInformation;
