import { Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import styles from "./style.module.css";
import PropTypes from "prop-types";

const CustomTextField = ({ name, label, type = "text", ...otherProps }) => {
  return (
    <div className={styles.field}>
      <Field
        name={name}
        as={TextField}
        label={label}
        type={type}
        fullWidth
        {...otherProps}
      />
      <ErrorMessage name={name} component="div" className={styles.error} />
    </div>
  );
};

export default CustomTextField;

CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
};
