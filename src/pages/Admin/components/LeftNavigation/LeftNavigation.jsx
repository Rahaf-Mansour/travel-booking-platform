import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import CityIcon from "@mui/icons-material/LocationCity";
import HotelIcon from "@mui/icons-material/Hotel";
import RoomIcon from "@mui/icons-material/MeetingRoom";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { AuthContext } from "../../../../context/authContext";
import { ListItemButton } from "@mui/material";

const LeftNavigation = () => {
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setIsMobileOpened(!isMobileOpened);
  };

  const drawerWidth = 240;

  const adminLinks = [
    { name: "Cities", icon: <CityIcon />, path: "/adminDashboard/cities" },
    { name: "Hotels", icon: <HotelIcon />, path: "/adminDashboard/hotels" },
    { name: "Rooms", icon: <RoomIcon />, path: "/adminDashboard/rooms" },
  ];

  const renderDrawer = () => (
    <Drawer
      anchor="left"
      open={isMobileOpened}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
          Admin Page
        </Typography>

        <Divider />

        <List>
          {adminLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={`Manage ${item.name}`} />
              </ListItemButton>
            </NavLink>
          ))}

          <ListItemButton onClick={logoutUser}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      {renderDrawer()}
      <AppBar
        position="static"
        component="nav"
        sx={{
          color: "#fff",
          height: "40px",
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
  );
};

export default LeftNavigation;
