import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AppBar,
  Box,
  Badge,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/authContext";
import colors from "../../constants/colorConstants";

const NavBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme?.breakpoints?.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { cart } = useContext(CartContext);
  const { logoutUser } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = ["Home", "Search", "Cart"];
  const navigate = useNavigate();

  const handleNavigate = (event, item) => {
    event.preventDefault();
    navigate(`/${item.toLowerCase()}`);
  };

  const renderAppBar = () => (
    <AppBar
      position="static"
      component="nav"
      sx={{ backgroundColor: colors.primaryColor }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: { sm: "2rem", md: "4rem", lg: "6rem" },
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
            display: { xs: "none", md: "block" },
          }}
        >
          Booking
        </Typography>

        <div>
          <Button
            component={Link}
            to="/home"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            <HomeIcon />
            <Typography
              variant="body1"
              sx={{ marginLeft: 1, display: { xs: "none", md: "block" } }}
            >
              Home
            </Typography>
          </Button>

          <Button
            component={Link}
            to="/search"
            color="inherit"
            sx={{ marginRight: 2 }}
          >
            <SearchIcon />
            <Typography
              variant="body1"
              sx={{ marginLeft: 1, display: { xs: "none", md: "block" } }}
            >
              Search
            </Typography>
          </Button>

          <Button component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Button>

          <Button onClick={logoutUser} sx={{ marginLeft: 1, color: "inherit" }}>
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

  const renderDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      sx={{ "& .MuiDrawer-paper": { width: "240px" } }}
    >
      <Box>
        <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
          Booking
        </Typography>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => handleNavigate(event, item)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      {isSmallScreen ? (
        <>
          {renderDrawer()}
          <AppBar
            position="static"
            component="nav"
            sx={{
              backgroundColor: colors.primaryColor,

              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                marginRight: "auto",
              }}
            >
              <MenuIcon sx={{ marginLeft: "2rem" }} />
            </IconButton>
          </AppBar>
        </>
      ) : (
        renderAppBar()
      )}
    </>
  );
};

export default NavBar;
