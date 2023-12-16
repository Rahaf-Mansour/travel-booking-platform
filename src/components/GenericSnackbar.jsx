import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = (props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
);

const GenericSnackbar = ({ open, message, onClose, severity = "info" }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", fontWeight: "550" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GenericSnackbar;
