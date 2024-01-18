import React from "react";
import NavBar from "../../components/NavBar";
import { Box, Grid, Card, Container } from "@mui/material";
import FormInformation from "./components/FormInformation/FormInformation";
import CartItems from "./components/CartItems";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const { cart } = React.useContext(CartContext);

  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={cart.length > 0 ? 6 : 12}>
              <Card sx={{ padding: 2 }}>
                <CartItems />
              </Card>
            </Grid>
            {cart.length > 0 && (
              <Grid item xs={12} md={6}>
                <Card>
                  <FormInformation />
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Checkout;
