import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Box,
  Button,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShopCartIcon from "@mui/icons-material/ShoppingCart";
import useCartContext from "../../../../hooks/useCartContext";

const CartItems = () => {
  const { cart, removeFromCart, getCartTotalPrice } = useCartContext();
  const { totalCost } = getCartTotalPrice();

  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{
          color: "#333",
          fontSize: "1.5rem",
          textAlign: "center",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          marginBottom: 2,
        }}
      >
        Your Cart <ShopCartIcon />
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="subtitle1">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cart.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  backgroundColor: "rgba(185, 220, 280, 0.1)",
                  marginTop: 1,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 2,
                    }}
                  >
                    <Avatar
                      alt={item.roomType}
                      src={item.roomPhotoUrl}
                      sx={{ width: 80, height: 80, marginRight: 2 }}
                    />
                    <Typography variant="h6" component="div">
                      {item.roomType}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body1" color="text.secondary">
                      Room Number: {item.roomNumber}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Price: ${item.price}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ marginBottom: 2 }}
                    >
                      Capacity: {item.capacityOfAdults} Adults and{" "}
                      {item.capacityOfChildren} Children
                    </Typography>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {item.roomAmenities.map((amenity, amenityIndex) => (
                        <Chip
                          key={amenityIndex}
                          label={`${amenity.name}: ${amenity.description}`}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", marginBottom: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => removeFromCart(item.roomId)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" component="div">
          Total cost: ${totalCost}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItems;
