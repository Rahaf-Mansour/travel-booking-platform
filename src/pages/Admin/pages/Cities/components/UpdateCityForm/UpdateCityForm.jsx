import React from "react";
import { Drawer, IconButton, Typography, Box } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { updateCity } from "../../../../../../services/manageCities";
import { fields, validationSchema } from "../../cityConfig";
import UpdateButton from "../../../../components/UpdateButton";
import UpdateEntityForm from "../../../../components/UpdateEntityForm";

const UpdateCityForm = ({ open, onClose, entityData, onUpdate }) => {
  if (!entityData) {
    return null;
  }

  const handleUpdateClick = async (values, actions) => {
    try {
      await updateCity(entityData.id, values.name, values.description);
      const updatedCity = {
        ...entityData,
        name: values.name,
        description: values.description,
      };
      if (onUpdate) {
        onUpdate(updatedCity);
      }
      console.log("City updated:", updatedCity);
    } catch (error) {
      console.log(error.message);
    } finally {
      onClose();
      actions.setSubmitting(false);
    }
  };

  const initialValues = fields.reduce((values, field) => {
    values[field.name] = entityData[field.name] || "";
    return values;
  }, {});

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
          Update City
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateClick}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box sx={{ m: 2 }}>
                <UpdateEntityForm
                  fields={fields}
                  touched={touched}
                  errors={errors}
                />
                <UpdateButton isSubmitting={isSubmitting} />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

export default UpdateCityForm;

UpdateCityForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  entityData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};
