import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./LoginForm.css";
import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { loginApiCall } from "../../services/apicalls";
import { authContext } from "../../context/authContext";
import { toastContext } from "../../context/toastContext";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

export default function LoginForm(props) {
  const { login } = useContext(authContext);
  const { openToast } = useContext(toastContext);

  const bottomError = () => {
    let key = Object.keys(formik.touched).find((touchedKey) =>
      Object.keys(formik.errors).includes(touchedKey)
    );
    if (key) {
      return (
        <Alert variant="filled" severity="error">
          {Object.values(formik.errors[key])}
        </Alert>
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        await loginApiCall(values, login, props.setIsLoginModalOpen);
        openToast("Successfully Logged-in", "success");
      } catch (error) {
        console.log(error);
        openToast(error.message, "error");
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} className="LoginformCon">
        <Box className="LoginlinesCon">
          <Typography className="LoginHeader" variant="h6">
            Login
          </Typography>

          <TextField
            variant="standard"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onBlur={formik.handleBlur}
          />
          <TextField
            variant="standard"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onBlur={formik.handleBlur}
          />
        </Box>
        {bottomError()}
        <Box className="buttonGroup">
          <Button
            onClick={() => props.setIsLoginModalOpen(false)}
            variant="text"
          >
            Cancel
          </Button>
          <Button type="submit" variant="text">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
