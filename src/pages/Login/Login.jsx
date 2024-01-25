import React from "react";
import styles from "./style.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/authService";
import GenericSnackbar from "../../components/GenericSnackbar";
import useSnackbar from "../../hooks/useSnackbar";
import { AuthContext } from "../../context/authContext";
import CustomButton from "../../components/CustomButton";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("⚠️ Username is a required field")
    .oneOf(["user", "admin"], "⚠️ Invalid username"),
  password: Yup.string().required("⚠️ Password is a required field"),
});

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = React.useContext(AuthContext);
  const {
    snackbar,
    handleCloseSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar,
  } = useSnackbar();

  const handleLogin = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await loginAPI(values);
      loginUser(response); // loginUser is a function from AuthContext => returns {userType, authentication}
      if (response.userType === "User" || response.userType === "Admin") {
        showSuccessSnackbar("Welcome, you're successfully logged in!");
        setTimeout(() => {
          navigate(response.userType === "User" ? "/home" : "/adminDashboard");
        }, 2000);
      }
    } catch (error) {
      showErrorSnackbar(
        "Login failed! Unable to login with provided credentials."
      );
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.loginPage}>
      <Formik
        validationSchema={loginSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          touched,
        }) => {
          const areFieldsFilled = values.username && values.password;
          const areThereErrors =
            (touched.username && errors.username) ||
            (touched.password && errors.password);
          const buttonClassName =
            areFieldsFilled && !areThereErrors ? "activeBtn" : "defaultBtn";

          return (
            <div className={styles.loginForm}>
              <Form onSubmit={handleSubmit}>
                <h1>Login 👋</h1>
                <Field
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Username"
                  className="username-field"
                  id="username"
                />

                <ErrorMessage name="username">
                  {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>

                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                  className="password-field"
                  id="password"
                />

                <ErrorMessage name="password">
                  {(msg) => <div className={styles.errorMessage}>{msg}</div>}
                </ErrorMessage>

                <CustomButton
                  className={buttonClassName}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </CustomButton>
              </Form>

              <GenericSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
              />
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
