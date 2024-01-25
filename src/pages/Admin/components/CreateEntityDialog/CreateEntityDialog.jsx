import React from "react";
import { DialogContent, Button, TextField, DialogActions } from "@mui/material";
import { Form, Field } from "formik";
import PropTypes from "prop-types";

const CreateEntityDialog = ({
  fields,
  touched,
  errors,
  handleDialogClose,
  isSubmitting,
}) => {
  return (
    <>
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
              {...(field.name === "description" && { multiline: true })}
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
    </>
  );
};

export default CreateEntityDialog;

CreateEntityDialog.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ),
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleDialogClose: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
