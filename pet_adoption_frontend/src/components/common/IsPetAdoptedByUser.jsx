import { Button } from "@mui/material";
import React from "react";

export default function IsPetAdoptedByUser(props) {
  const adoptPet = () => {
    props.adoptPet(true);
  };
  const fosterPet = () => {
    props.adoptPet(false);
  };

  if (props.pet.ownerId === props.userData._id) {
    if (props.pet.adoptionStatus === "Adopted") {
      return (
        <Button
          className="saveBtn"
          variant="contained"
          color="warning"
          size="small"
          onClick={props.returnPet}
        >
          Return pet to the shelter :(
        </Button>
      );
    } else if (props.pet.adoptionStatus === "Fostered") {
      return (
        <>
          <Button
            className="saveBtn"
            variant="contained"
            color="secondary"
            size="small"
            onClick={adoptPet}
          >
            Adopt pet
          </Button>
          <br />
          <Button
            className="saveBtn"
            variant="contained"
            color="warning"
            size="small"
            onClick={props.returnPet}
          >
            Return pet to the shelter :(
          </Button>
        </>
      );
    } else {
      return null;
    }
  } else if (props.pet.adoptionStatus === "Available") {
    return (
      <>
        <Button
          className="saveBtn"
          variant="contained"
          color="secondary"
          size="small"
          onClick={fosterPet}
        >
          Foster pet
        </Button>

        <Button
          className="saveBtn"
          variant="contained"
          color="secondary"
          size="small"
          onClick={adoptPet}
        >
          Adopt pet
        </Button>
      </>
    );
  } else {
    return null;
  }
}
