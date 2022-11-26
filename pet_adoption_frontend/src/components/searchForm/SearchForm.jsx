import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./SearchForm.css";
import * as yup from "yup";
import { getPetsByQueryService } from "../../services/petsApiCalls";
import { toastContext } from "../../context/toastContext";

const searchValidationSchema = yup.object({
  minHeight: yup.number("Only numbers").positive("Must be a positive number"),
  maxHeight: yup.number("Only numbers").positive("Must be a positive number"),
  minWeight: yup.number("Only numbers").positive("Must be a positive number"),
  maxWeight: yup.number("Only numbers").positive("Must be a positive number"),
  petName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

export default function SearchForm(props) {
  const [formType, setFormType] = useState("basic");
  const { openToast } = useContext(toastContext);
  const formik = useFormik({
    initialValues: {
      type: "",
      adoptionStatus: "",
      petName: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
    },
    validationSchema: searchValidationSchema,

    onSubmit: async (values) => {
      // return an object
      const query = new URLSearchParams(values).toString();

      try {
        props.setIsLoading(true);
        await getPetsByQueryService(query, props.setSearchPets);
        props.setIsLoading(false);
      } catch (err) {
        openToast(err.message, "error");
        props.setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formType === "basic") {
      formik.setFieldValue("minHeight", "");
      formik.setFieldValue("maxHeight", "");
      formik.setFieldValue("minWeight", "");
      formik.setFieldValue("maxWeight", "");
      formik.setFieldValue("adoptionStatus", "");
      formik.setFieldValue("petName", "");
    }
  }, [formType]);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} className="formCon">
        <Box>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              onChange={formik.handleChange}
              value={formik.values.type}
              name="type"
              multiple={false}
            >
              {["Dog", "Cat", "Fish", "Hamster", "Turtle"].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formType === "advance" && (
            <>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Adoption Status</InputLabel>
                <Select
                  label="Adoption Status"
                  onChange={formik.handleChange}
                  value={formik.values.adoptionStatus}
                  name="adoptionStatus"
                  multiple={false}
                >
                  {["Fostered", "Adopted", "Available"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                variant="standard"
                fullWidth
                id="petName"
                name="petName"
                label="Pets' name"
                type="text"
                value={formik.values.petName}
                onChange={formik.handleChange}
                error={formik.touched.petName && Boolean(formik.errors.petName)}
                helperText={formik.touched.petName && formik.errors.petName}
                onBlur={formik.handleBlur}
              />
              <Box className="petSizeInputs">
                <TextField
                  variant="standard"
                  id="minHeight"
                  name="minHeight"
                  label="Min height in CM"
                  type="number"
                  value={formik.values.minHeight}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.minHeight && Boolean(formik.errors.minHeight)
                  }
                  helperText={
                    formik.touched.minHeight && formik.errors.minHeight
                  }
                  onBlur={formik.handleBlur}
                />
                <TextField
                  variant="standard"
                  id="maxHeight"
                  name="maxHeight"
                  label="Max height in CM"
                  type="number"
                  value={formik.values.maxHeight}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.maxHeight && Boolean(formik.errors.maxHeight)
                  }
                  helperText={
                    formik.touched.maxHeight && formik.errors.maxHeight
                  }
                  onBlur={formik.handleBlur}
                />
                <TextField
                  variant="standard"
                  id="minWeight"
                  name="minWeight"
                  label="Min weight in CM"
                  type="number"
                  value={formik.values.minWeight}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.minWeight && Boolean(formik.errors.minWeight)
                  }
                  helperText={
                    formik.touched.minWeight && formik.errors.minWeight
                  }
                  onBlur={formik.handleBlur}
                />
                <TextField
                  variant="standard"
                  id="maxWeight"
                  name="maxWeight"
                  label="Max weight in CM"
                  type="number"
                  value={formik.values.maxWeight}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.maxWeight && Boolean(formik.errors.maxWeight)
                  }
                  helperText={
                    formik.touched.maxWeight && formik.errors.maxWeight
                  }
                  onBlur={formik.handleBlur}
                />
              </Box>
            </>
          )}
        </Box>

        <Box className="searchBtn">
          <Button disabled={props.isLoading} type="submit" variant="contained">
            Search
          </Button>
          <ToggleButtonGroup
            color="primary"
            value={formType}
            size="small"
            exclusive
            onChange={(e) => {
              setFormType(e.target.value);
            }}
            aria-label="Platform"
          >
            <ToggleButton value="basic">Basic</ToggleButton>

            <ToggleButton value="advance">Advance</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </form>
    </Box>
  );
}
