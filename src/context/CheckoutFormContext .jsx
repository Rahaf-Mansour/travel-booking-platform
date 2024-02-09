import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(null);

  const setValues = (values) => {
    setFormValues(values);
  };

  return (
    <FormContext.Provider value={{ formValues, setValues }}>
      {children}
    </FormContext.Provider>
  );
};

FormContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContextProvider;
