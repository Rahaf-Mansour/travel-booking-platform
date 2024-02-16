import { useContext } from "react";
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
  username: Yup.string().required("⚠️ Username is a required field"),
  password: Yup.string().required("⚠️ Password is a required field"),
});

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
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
        }, 600);
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
        {({ values, errors, isSubmitting }) => {
          const areFieldsFilled = values.username && values.password;
          const areThereErrors = errors.username || errors.password;
          const buttonClassName =
            areFieldsFilled && !areThereErrors ? "activeBtn" : "defaultBtn";

          return (
            <div className={styles.loginForm}>
              <Form>
                <h1>Login 👋</h1>
                <Field type="text" name="username" placeholder="Username" />

                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.errorMessage}
                />

                <Field type="password" name="password" placeholder="Password" />

                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.errorMessage}
                />

                <CustomButton
                  className={buttonClassName}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </CustomButton>
              </Form>
            </div>
          );
        }}
      </Formik>

      <GenericSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
      />
    </div>
  );
};

export default Login;
