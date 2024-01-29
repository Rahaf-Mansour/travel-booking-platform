import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

Alert.displayName = "Alert";

const GenericSnackbar = ({ open, message, onClose, severity = "info" }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

GenericSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
};

export default GenericSnackbar;
