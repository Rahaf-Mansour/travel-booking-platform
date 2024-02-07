import { Box, Typography, IconButton, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import colors from "../../constants/colorConstants";

const Footer = () => {
  const iconLinks = [
    {
      icon: <GitHubIcon />,
      href: "https://github.com/Rahaf-Mansour",
      label: "GitHub",
    },
    {
      icon: <LinkedInIcon />,
      href: "https://www.linkedin.com/in/rahafmansour/",
      label: "LinkedIn",
    },
    {
      icon: <EmailIcon />,
      href: "mailto:rahafmansour2018@gmail.com",
      label: "Email",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: colors.primaryColor,
        color: "white",
        padding: "18px 0px 8px 0px",
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
          marginTop: 0.5,
          display: "flex",
          gap: "0.2rem",
        }}
      >
        {iconLinks.map((link, index) => (
          <IconButton
            key={index}
            aria-label={link.label}
            component={Link}
            href={link.href}
            target="_blank"
            color="inherit"
          >
            {link.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
