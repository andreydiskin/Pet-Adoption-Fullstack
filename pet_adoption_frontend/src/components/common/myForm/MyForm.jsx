import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./myForm.css";
import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import Select from "@mui/material/Select";

export default function MyForm(props) {
  const formik = useFormik({
    initialValues: props.deafultConfig,
    validationSchema: props.validationSchema,
    onSubmit: (values) => {
      props.callback(values);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} className="myFormCon">
        <Box className="formSubConBox">
          <Typography className="ProfileSettingsHeader" variant="h6">
            {props.header}
          </Typography>

          {props.inputs.map((input) =>
            input["type"] !== "select" ? (
              <TextField
                key={input.ref}
                variant="standard"
                type={input.type}
                className="commonField"
                id={input.ref}
                name={input.ref}
                label={input.label}
                defaultValue={
                  input.type !== "file" ? formik.values[`${input.ref}`] : null
                }
                onChange={
                  input.type !== "file"
                    ? formik.handleChange
                    : async (e) => {
                        const fileName = await input.onFilePick(e);
                        formik.setFieldValue(input.ref, fileName);
                      }
                }
                error={
                  formik.touched[input.ref] && Boolean(formik.errors[input.ref])
                }
                helperText={
                  formik.touched[input.ref] && formik.errors[input.ref]
                }
                onBlur={formik.handleBlur}
              />
            ) : (
              <FormControl key={input.ref} variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {input.label}
                </InputLabel>
                <Select
                  className="selectField"
                  onChange={formik.handleChange}
                  value={formik.values[input.ref]}
                  name={input.ref}
                  multiple={false}
                >
                  {input.options.map((item) => (
                    <MenuItem
                      key={item.optionName + item.value}
                      value={item.value}
                    >
                      {item.optionName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          )}

          <Box className="buttonGroup">
            <Button
              onClick={() => props.setIsLoginModalOpen(false)}
              variant="text"
            >
              Cancel
            </Button>
            <Button type="submit" variant="text">
              {props.submitMsg}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
