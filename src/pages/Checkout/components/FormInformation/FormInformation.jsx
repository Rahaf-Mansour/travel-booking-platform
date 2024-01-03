import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./style.module.css";
import GenericSnackbar from "../../../../components/GenericSnackbar/GenericSnackbar";
import { useNavigate } from "react-router-dom";

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

const paymentSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  paymentMethod: Yup.string().required("Payment Method is required"),
  cardNumber: Yup.string()
    .required("Card Number is required", "Invalid card number")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number"),
  expirationDate: Yup.string()
    .required("Expiration Date is required")
    .matches(
      /^([1-9]|0[1-9]|1[0-2])\/?([2-6][3-9])$/,
      "Invalid expiration date format"
    ),
  cvv: Yup.string().required("CVV is required"),
  billingAddress: Yup.object().shape({
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
  }),
});

const paymentMethods = ["Visa", "MasterCard", "American Express", "Discover"];

const formatCardNumber = (value) => {
  const noSpacesValue = value.replace(/\s/g, "");
  return noSpacesValue ? noSpacesValue.match(/.{1,4}/g).join(" ") : "";
};

const FormInformation = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const navigateToConfirmationPage = useNavigate();

  const handlePayment = (values) => {
    console.log("Payment submitted:", values);
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
      navigateToConfirmationPage("/confirmation");
    }, 2000);
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
          <div className={styles.field}>
            <Field name="fullName" label="Full Name" as={TextField} fullWidth />
            <ErrorMessage
              name="fullName"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <Field
              name="email"
              label="Email"
              type="email"
              as={TextField}
              fullWidth
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <Field
              name="billingAddress.state"
              label="State"
              as={TextField}
              fullWidth
            />
            <ErrorMessage
              name="billingAddress.state"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.field}>
            <Field
              name="billingAddress.city"
              label="City"
              as={TextField}
              fullWidth
            />
            <ErrorMessage
              name="billingAddress.city"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <Field
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
            </Field>
            <ErrorMessage
              name="paymentMethod"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <Field
              name="cardNumber"
              label="Card Number"
              as={TextField}
              fullWidth
              inputProps={{
                maxLength: 19,
                onChange: (e) => {
                  const noSpacesValue = e.target.value.replace(/\s/g, "");
                  const formattedValue = formatCardNumber(noSpacesValue);
                  e.target.value = formattedValue;
                },
              }}
            />
            <ErrorMessage
              name="cardNumber"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <Field
              name="expirationDate"
              label="Expiration Date MM/YY"
              as={TextField}
              fullWidth
            />
            <ErrorMessage
              name="expirationDate"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.field}>
            <Field
              name="cvv"
              label="CVV"
              as={TextField}
              inputProps={{ maxLength: 4 }}
              fullWidth
            />
            <ErrorMessage name="cvv" component="div" className={styles.error} />
          </div>

          <div className={styles.field}>
            <Field
              name="specialRequests"
              label="Special Requests or Remarks"
              multiline
              rows={4}
              as={TextField}
              fullWidth
            />
            <ErrorMessage
              name="specialRequests"
              component="div"
              className={styles.error}
            />
          </div>

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
        open={openSnackbar}
        message="Thanks for your payment!"
        onClose={() => setOpenSnackbar(false)}
        severity="success"
      />
    </div>
  );
};

export default FormInformation;
