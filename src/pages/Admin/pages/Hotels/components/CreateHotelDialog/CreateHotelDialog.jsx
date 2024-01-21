import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { postNewHotel } from "../../../../../../services/manageHotels";
import CreateButton from "../../../../components/CreateButton/CreateButton";

const CreateHotelDialog = ({ addHotel, snackbarProps }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "hotelType", label: "Hotel Type", type: "number" },
    { name: "starRating", label: "Star Rating", type: "number" },
    { name: "latitude", label: "Latitude", type: "number" },
    { name: "longitude", label: "Longitude", type: "number" },
    { name: "cityId", label: "City ID", type: "number" },
  ];

  const initialValues = fields.reduce((values, field) => {
    values[field.name] = field.type === "number" ? 0 : "";
    return values;
  }, {});

  const validationSchema = Yup.object(
    fields.reduce((schema, field) => {
      if (field.type === "text") {
        schema[field.name] = Yup.string().required(
          `${field.label} is required`
        );
      } else if (field.type === "number") {
        schema[field.name] = Yup.number().required(
          `${field.label} is required`
        );
      }
      return schema;
    }, {})
  );
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
            <Form>
              <DialogContent>
                {fields.map((field) => (
                  <Field
                    key={field.name}
                    as={TextField}
                    autoFocus={field.name === "name"}
                    margin="dense"
                    name={field.name}
                    label={field.label}
                    fullWidth
                    variant="outlined"
                    type={field.type}
                    error={touched[field.name] && Boolean(errors[field.name])}
                    helperText={touched[field.name] && errors[field.name]}
                  />
                ))}
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

export default CreateHotelDialog;
