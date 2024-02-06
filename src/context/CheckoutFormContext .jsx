import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const FormContext = createContext();

export const useFormContext = () => {
  return useContext(FormContext);
};

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

export default FormContext;
