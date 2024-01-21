import React from "react";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PropTypes from "prop-types";

const CreateButton = ({ handleDialogOpen }) => {
  return (
    <Button
      variant="outlined"
      sx={{ backgroundColor: "#fff", color: "#000", height: 50 }}
      onClick={handleDialogOpen}
    >
      Create <AddBoxIcon color="primary" sx={{ marginLeft: "5px" }} />
    </Button>
  );
};

export default CreateButton;

CreateButton.propTypes = {
  handleDialogOpen: PropTypes.func.isRequired,
};
