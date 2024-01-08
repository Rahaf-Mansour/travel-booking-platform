import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { updateCity } from "../../../../services/manageCities";
// import GenericSnackbar from "../../../../components/GenericSnackbar/GenericSnackbar";
// import useSnackbar from "../../../../hooks/useSnackbar";

const UpdateEntityForm = ({ open, onClose, entityData, onUpdate }) => {
  if (!entityData) {
    return null;
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    name: entityData.name || "",
    description: entityData.description || "",
  };

  const handleUpdateClick = async (values, actions) => {
    try {
      await updateCity(entityData.id, values.name, values.description);

      const updatedEntity = {
        ...entityData,
        name: values.name,
        description: values.description,
      };

      if (onUpdate) {
        onUpdate(updatedEntity);
      }
      console.log("Entity updated:", updatedEntity);
    } catch (error) {
      console.log(error.message);
    } finally {
      onClose();
      actions.setSubmitting(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} variant="persistent">
      <Box
        sx={{ width: 250 }}
        role="presentation"
        display="flex"
        flexDirection="column"
      >
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 2 }}>
          Update Entity
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateClick}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box sx={{ m: 2 }}>
                <Field
                  name="name"
                  label="Name"
                  variant="standard"
                  fullWidth
                  as={TextField}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  name="description"
                  label="Description"
                  variant="standard"
                  fullWidth
                  multiline
                  as={TextField}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

UpdateEntityForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  entityData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

export default UpdateEntityForm;
