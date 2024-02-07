import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import PropTypes from "prop-types";

const DrawerComponent = ({ isMobileOpened, handleDrawerToggle }) => {
  const { logoutUser } = useContext(AuthContext);
  const navItems = ["Home", "Search", "Cart"];
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate(`/${item.toLowerCase()}`);
  };

  return (
    <Drawer
      anchor="left"
      open={isMobileOpened}
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
                onClick={() => handleNavigate(item)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItemButton sx={{ textAlign: "center" }} onClick={logoutUser}>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

DrawerComponent.propTypes = {
  isMobileOpened: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default DrawerComponent;
