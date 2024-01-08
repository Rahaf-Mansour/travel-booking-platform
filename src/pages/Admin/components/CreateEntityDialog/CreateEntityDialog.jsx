import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { postNewCity } from "../../../../services/manageCities";

const CreateEntityDialog = ({ addCity, snackbarProps }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

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
      <Button
        variant="outlined"
        sx={{ backgroundColor: "#fff", color: "#000" }}
        onClick={handleDialogOpen}
      >
        Create
        <IconButton color="primary" aria-label="create">
          <AddBoxIcon />
        </IconButton>
      </Button>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New Entity</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreateEntity}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Field
                  as={TextField}
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Name"
                  fullWidth
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  margin="dense"
                  name="description"
                  label="Description"
                  fullWidth
                  variant="outlined"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  Create
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

CreateEntityDialog.propTypes = {
  addCity: PropTypes.func.isRequired,
  snackbarProps: PropTypes.shape({
    open: PropTypes.bool,
    message: PropTypes.string,
    severity: PropTypes.string,
    handleCloseSnackbar: PropTypes.func,
    showSuccessSnackbar: PropTypes.func,
    showErrorSnackbar: PropTypes.func,
  }),
};

export default CreateEntityDialog;
