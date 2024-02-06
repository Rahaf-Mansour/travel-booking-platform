import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const GenericSnackbar = ({ open, message, onClose, severity = "info" }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        elevation={4}
        variant="filled"
      >
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
