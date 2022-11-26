import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./ProfileSettingsForm.css";
import { Alert, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { authContext } from "../../context/authContext";
import Loader from "../common/Loader/Loader";
import { updateProfileService } from "../../services/usersApiCalls";
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

export default function ProfileSettingsForm(props) {
  const { user, updateUser } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const formik = useFormik({
    initialValues: {
      email: user.email || "",
      firstName: user.firstName || "",
      password: user.password || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
      bio: user.bio || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateProfileService(user._id, updateUser, values);
        openToast("Successfully updated the profile", "success");
      } catch (err) {
        console.log("err", err);
        openToast(err.response.data.message, "error");
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

  if (!user) {
    return <Loader />;
  }
  return (
    <Box>
      <form onSubmit={formik.handleSubmit} className="ProfileSettingsformCon">
        <Box className="ProfileSettingslinesCon">
          <Typography className="ProfileSettingsHeader" variant="h6">
            Profile Settings
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
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="Tell something about yourself.."
            className="bioInputArea"
            variant="standard"
            id="bio"
            name="bio"
            label="Bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
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
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
