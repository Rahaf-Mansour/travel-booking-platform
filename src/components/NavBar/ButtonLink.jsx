import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ButtonLink = ({ to, icon, text }) => (
  <Button component={Link} to={to} color="inherit" sx={{ marginRight: 2 }}>
    {icon}
    <Typography
      variant="body1"
      sx={{ marginLeft: 1, display: { xs: "none", md: "block" } }}
    >
      {text}
    </Typography>
  </Button>
);

export default ButtonLink;

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
};
