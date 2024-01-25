import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const UpdateEntityForm = ({ fields, touched, errors }) => {
  return (
    <>
      {fields.map((field) => (
        <Field
          sx={{ marginBottom: 2 }}
          key={field.name}
          as={TextField}
          name={field.name}
          label={field.label}
          {...(field.name === "description" && { multiline: true })}
          fullWidth
          variant="standard"
          type={field.type}
          error={touched[field.name] && Boolean(errors[field.name])}
          helperText={touched[field.name] && errors[field.name]}
        />
      ))}
    </>
  );
};

export default UpdateEntityForm;

UpdateEntityForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ),
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  values: PropTypes.object,
};
