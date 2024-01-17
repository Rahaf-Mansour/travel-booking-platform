import * as Yup from "yup";

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
      /^([1-9]|0[1-9]|1[0-2])\/?([2-6][1-9])$/,
      "Invalid expiration date format"
    ),
  cvv: Yup.string().required("CVV is required"),
  billingAddress: Yup.object().shape({
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
  }),
});

export default paymentSchema;
