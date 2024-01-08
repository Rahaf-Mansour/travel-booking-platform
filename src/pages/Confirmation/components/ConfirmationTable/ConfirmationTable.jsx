import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormContext from "../../../../context/CheckoutFormContext ";
import { SearchContext } from "../../../../context/searchContext";
import Container from "@mui/material/Container";
import styles from "./style.module.css";

const ConfirmationTable = () => {
  const { searchProps } = useContext(SearchContext);
  const { checkInDate, checkOutDate } = searchProps;
  const { formValues } = useContext(FormContext);
  const fields = [
    { label: "Full Name", value: formValues.fullName },
    { label: "Email", value: formValues.email },
    { label: "State", value: formValues.billingAddress.state },
    { label: "City", value: formValues.billingAddress.city },
    { label: "Card Number", value: formValues.cardNumber },
    { label: "Expiration Date", value: formValues.expirationDate },
    { label: "CVV", value: formValues.cvv },
    { label: "Payment Method", value: formValues.paymentMethod },
    {
      label: "Check-in date",
      value: new Date(checkInDate).toLocaleDateString(),
    },
    {
      label: "Check-out date",
      value: new Date(checkOutDate).toLocaleDateString(),
    },
  ];

  return (
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={styles.TableHeadRow}>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? styles.TableBodyRow : ""}
              >
                <TableCell>{field.label}</TableCell>
                <TableCell>{field.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ConfirmationTable;