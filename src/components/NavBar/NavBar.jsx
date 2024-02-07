import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import colors from "../../constants/colorConstants";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponent";

const NavBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme?.breakpoints?.down("sm"));
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const handleDrawerToggle = () => {
    setIsMobileOpened(!isMobileOpened);
  };

  return (
    <>
      {isSmallScreen ? (
        <>
          <DrawerComponent
            isMobileOpened={isMobileOpened}
            handleDrawerToggle={handleDrawerToggle}
          />

          <AppBar
            position="static"
            component="nav"
            sx={{
              backgroundColor: colors.primaryColor,
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
        <AppBarComponent />
      )}
    </>
  );
};

export default NavBar;
