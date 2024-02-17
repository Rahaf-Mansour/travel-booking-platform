import useLoading from "../../hooks/useLoading";
import { Box, Backdrop, CircularProgress } from "@mui/material";

const PageLoadingIndicator = () => {
  const [isLoading] = useLoading();

  return (
    <Box>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default PageLoadingIndicator;
