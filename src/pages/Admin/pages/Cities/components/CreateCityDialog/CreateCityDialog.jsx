import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { postNewCity } from "../../../../../../services/manageCities";
import CreateEntityDialog from "../../../../components/CreateEntityDialog";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { fields, initialValues, validationSchema } from "../../cityConfig";
import useDialogState from "../../../../hooks/useDialogState";

const CreateCityDialog = ({ addCity, snackbarProps }) => {
  const { isDialogOpen, handleDialogOpen, handleDialogClose } = useDialogState();

  const handleCreateEntity = async (values, actions) => {
    try {
      const newEntity = await postNewCity(values.name, values.description);
      console.log("City created:", newEntity);
      snackbarProps.showSuccessSnackbar("New city created successfully!");
      addCity(newEntity);
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
        <DialogTitle>Create New City</DialogTitle>
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

export default CreateCityDialog;

CreateCityDialog.propTypes = {
  addCity: PropTypes.func.isRequired,
  snackbarProps: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    message: PropTypes.string,
    severity: PropTypes.string,
    handleCloseSnackbar: PropTypes.func,
    showSuccessSnackbar: PropTypes.func,
    showErrorSnackbar: PropTypes.func,
  }),
};
