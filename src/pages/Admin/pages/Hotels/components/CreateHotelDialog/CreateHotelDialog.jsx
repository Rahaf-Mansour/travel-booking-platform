import React, { useState } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { postNewHotel } from "../../../../../../services/manageHotels";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { fields, initialValues, validationSchema } from "../../hotelConfig";
import CreateEntityDialog from "../../../../components/CreateEntityDialog";

const CreateHotelDialog = ({ addHotel, snackbarProps }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateHotel = async (values, actions) => {
    try {
      const newHotel = await postNewHotel(
        parseInt(values.cityId),
        values.name,
        values.description,
        parseInt(values.hotelType),
        parseFloat(values.starRating),
        parseFloat(values.latitude),
        parseFloat(values.longitude)
      );
      console.log("Hotel created:", newHotel);
      snackbarProps.showSuccessSnackbar("New Hotel created successfully!");
      addHotel(newHotel);
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
        <DialogTitle>Create New Hotel</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateHotel}
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

export default CreateHotelDialog;

CreateHotelDialog.propTypes = {
  addHotel: PropTypes.func.isRequired,
  snackbarProps: PropTypes.shape({
    open: PropTypes.bool,
    message: PropTypes.string,
    severity: PropTypes.string,
    handleCloseSnackbar: PropTypes.func,
    showSuccessSnackbar: PropTypes.func,
    showErrorSnackbar: PropTypes.func,
  }),
};
