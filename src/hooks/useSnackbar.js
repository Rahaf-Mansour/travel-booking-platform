import { useState, useEffect } from "react";

const useSnackbar = () => {
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity) => {
    setSnackbarQueue((prevQueue) => [...prevQueue, { message, severity }]);
  };

  const showSuccessSnackbar = (message) => {
    showSnackbar(message, "success");
  };

  const showErrorSnackbar = (message) => {
    showSnackbar(message, "error");
  };

  useEffect(() => {
    if (!snackbar.open && snackbarQueue.length > 0) {
      const nextSnackbar = snackbarQueue[0];
      setSnackbar({ open: true, ...nextSnackbar });
      setSnackbarQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [snackbar, snackbarQueue]);

  return {
    snackbar,
    handleCloseSnackbar,
    showSuccessSnackbar,
    showErrorSnackbar,
    showSnackbar,
  };
};

export default useSnackbar;
