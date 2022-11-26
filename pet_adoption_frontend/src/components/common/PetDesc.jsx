import React from "react";
import Typography from "@mui/material/Typography";

export default function PetDesc(props) {
  return (
    <Typography variant="h5" component="div">
      This {props.pet.type} is the breed of {props.pet.breed},{" "}
      {props.pet.petName} is {props.pet.height} Cm tall and {props.pet.weight}{" "}
      Kg.
    </Typography>
  );
}
