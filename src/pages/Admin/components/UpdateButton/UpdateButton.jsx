import { Button, Box } from "@mui/material";
import PropTypes from "prop-types";

const UpdateButton = ({ isSubmitting }) => {
  return (
    <Box mt={1}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
      >
        Update
      </Button>
    </Box>
  );
};

export default UpdateButton;

UpdateButton.propTypes = {
  isSubmitting: PropTypes.bool,
};
