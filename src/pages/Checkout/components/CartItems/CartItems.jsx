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
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import useCartContext from "../../../../hooks/useCartContext";
import { SearchContext } from "../../../../context/searchContext";
import { useContext } from "react";

const CartItems = () => {
  const { cart, removeFromCart, getCartTotalPrice } = useCartContext();
  const { totalCost } = getCartTotalPrice();
  const { getNumberOfNights } = useContext(SearchContext);

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
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Your cart is empty. <SentimentVeryDissatisfiedIcon sx={{ ml: 1 }} />
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {cart.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  backgroundColor: "rgba(200, 270, 10, 0.1)",
                  marginTop: 1,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        alt={item.roomType}
                        src={item.roomPhotoUrl}
                        sx={{
                          width: { xs: 60, sm: 80 },
                          height: { xs: 60, sm: 80 },
                          marginRight: 2,
                        }}
                      />
                      <Typography variant="h6" component="div">
                        {item.roomType}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                    >
                      ${item.price} (x {getNumberOfNights()}{" "}
                      {getNumberOfNights() > 1 ? "nights" : "night"})
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body1" color="text.secondary">
                      Room Number: {item.roomNumber}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={2}>
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
                          sx={{ bgcolor: "rgba(170, 215, 120, 0.15)" }}
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
          Total cost: ${totalCost * getNumberOfNights()}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItems;
