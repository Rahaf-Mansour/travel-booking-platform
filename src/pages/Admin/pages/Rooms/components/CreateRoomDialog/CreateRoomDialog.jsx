import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { postNewRoom } from "../../../../../../services/manageRooms";
import CreateEntityDialog from "../../../../components/CreateEntityDialog";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { fields, initialValues, validationSchema } from "../../roomConfig";

const CreateRoomDialog = ({ addRoom, snackbarProps }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateEntity = async (values, actions) => {
    try {
      const newEntity = await postNewRoom(
        parseInt(values.hotelId),
        values.roomNumber,
        parseInt(values.cost)
      );
      console.log("Room created:", newEntity);
      snackbarProps.showSuccessSnackbar("New Room created successfully!");
      addRoom(newEntity);
    } catch (error) {
      snackbarProps.showErrorSnackbar(`Whoops! ${error.message}`);
    } finally {
      handleDialogClose();
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <CreateButton handleDialogOpen={handleDialogOpen} />
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New Room</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateEntity}
        >
          {({ errors, touched, isSubmitting }) => (
            <CreateEntityDialog
              fields={fields}
              touched={touched}
              errors={errors}
              handleDialogClose={handleDialogClose}
              isSubmitting={isSubmitting}
            />
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CreateRoomDialog;

CreateRoomDialog.propTypes = {
  addRoom: PropTypes.func.isRequired,
  snackbarProps: PropTypes.shape({
    open: PropTypes.bool,
    message: PropTypes.string,
    severity: PropTypes.string,
    handleCloseSnackbar: PropTypes.func,
    showSuccessSnackbar: PropTypes.func,
    showErrorSnackbar: PropTypes.func,
  }),
};
