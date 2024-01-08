import { useState } from "react";

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSuccessSnackbar = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: "success",
    });
  };

  const showErrorSnackbar = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  return {
    snackbar,
    handleCloseSnackbar,
    showSuccessSnackbar,
    showErrorSnackbar,
  };
};

export default useSnackbar;
