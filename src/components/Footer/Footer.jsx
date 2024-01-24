import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#395591",
        color: "white",
        paddingTop: 3,
        paddingBottom: 1,
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="body1" component="p">
        Developed by Rahaf Mansour
      </Typography>
      <Typography variant="body1" component="p">
        All rights reserved © {new Date().getFullYear()}
      </Typography>
      <Box
        sx={{
          m: 0.5,
        }}
      >
        <IconButton
          aria-label="GitHub"
          component={Link}
          href="https://github.com/Rahaf-Mansour"
          target="_blank"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>

        <IconButton
          aria-label="LinkedIn"
          component={Link}
          href="https://www.linkedin.com/in/rahafmansour/"
          target="_blank"
          color="inherit"
        >
          <LinkedInIcon />
        </IconButton>
        
        <IconButton
          aria-label="Email"
          component={Link}
          href="mailto:rahafmansour2018@gmail.com"
          target="_blank"
          color="inherit"
        >
          <EmailIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
