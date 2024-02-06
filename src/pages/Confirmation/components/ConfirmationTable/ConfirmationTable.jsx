import { useContext } from "react";
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
import { useCartContext } from "../../../../context/CartContext";

const ConfirmationTable = () => {
  const { searchParams } = useContext(SearchContext);
  const { checkInDate, checkOutDate } = searchParams;
  const { formValues } = useContext(FormContext);
  const { cart } = useCartContext();

  const fields = [
    { label: "Confirmation Number", value: "20240109-5460" },
    { label: "Full Name", value: formValues.fullName },
    { label: "Email", value: formValues.email },
    { label: "State", value: formValues.billingAddress.state },
    { label: "Payment Method", value: formValues.paymentMethod },
    {
      label: "Check-in date",
      value: checkInDate,
    },
    {
      label: "Check-out date",
      value: checkOutDate,
    },
    { label: "Room Type", value: cart[0].roomType },
    { label: "Room Number", value: cart[0].roomNumber },
    { label: "Total cost", value: `$${cart[0].price}` },
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
