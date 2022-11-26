import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./SignUpForm.css";
import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { signUpService } from "../../services/usersApiCalls";
import { toastContext } from "../../context/toastContext";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password is not STRONG enough-should contain letters and number!"
    )
    .required("Password is required"),
  repeatPassword: yup
    .string("please re write your password")
    .oneOf([yup.ref("password")], "didnt match your password")
    .required("Repeat your password"),
  firstName: yup
    .string("Enter your first name.")
    .required("First Name is required!"),
  lastName: yup
    .string("Enter your last name.")
    .required("Last Name is required!"),
  phoneNumber: yup
    .string("Enter your phone number")
    .required("Phone number is required"),
});

export default function SignUpForm(props) {
  const { openToast } = useContext(toastContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const resp = await signUpService(values, props.setIsLoginModalOpen);
        openToast("Successfully Signed-Up! Please Login", "success");
      } catch (err) {
        openToast(err.message, "error");
      }
    },
  });

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

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} className="SignUpformCon">
        <Box className="SignUplinesCon">
          <Typography className="SignUpHeader" variant="h6">
            Sign Up
          </Typography>

          <TextField
            variant="standard"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            onBlur={formik.handleBlur}
          />
          <TextField
            variant="standard"
            id="repeatPassword"
            name="repeatPassword"
            label="Repeat password"
            type="password"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.repeatPassword &&
              Boolean(formik.errors.repeatPassword)
            }
            helperText={
              formik.touched.repeatPassword && formik.errors.repeatPassword
            }
            onBlur={formik.handleBlur}
          />
          <TextField
            variant="standard"
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            onChange={formik.handleChange}
            helperText={formik.touched.firstName && formik.errors.firstName}
            onBlur={formik.handleBlur}
          />

          <TextField
            variant="standard"
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            onBlur={formik.handleBlur}
          />

          <TextField
            variant="standard"
            id="phoneNumber"
            name="phoneNumber"
            label="Phone number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
            SignUp
          </Button>
        </Box>
      </form>
    </Box>
  );
}
