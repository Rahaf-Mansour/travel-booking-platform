import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/authContext";
import colors from "../../constants/colorConstants";
import ButtonLink from "./ButtonLink";

const AppBarComponent = () => {
  const { cart } = useContext(CartContext);
  const { logoutUser } = useContext(AuthContext);

  return (
    <AppBar
      position="static"
      component="nav"
      sx={{ backgroundColor: colors.primaryColor }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: { sm: "3rem", md: "3rem", lg: "6rem" },
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/home"
          color="inherit"
          sx={{
            textDecoration: "none",
            fontSize: "1.5rem",
          }}
        >
          Booking
        </Typography>

        <div>
          <ButtonLink to="/home" icon={<HomeIcon />} text="Home" />
          <ButtonLink to="/search" icon={<SearchIcon />} text="Search" />
          <ButtonLink
            to="/cart"
            icon={
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
          />
          <Button onClick={logoutUser} sx={{ color: "inherit" }}>
            <LogoutIcon />
            <Typography
              variant="body1"
              sx={{ marginLeft: 1, display: { xs: "none", md: "block" } }}
            >
              Logout
            </Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
