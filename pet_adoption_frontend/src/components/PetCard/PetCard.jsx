import React, { useContext } from "react";
import "./PetCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { imagesBaseUrl } from "../../Lib/config";
import { adoptPetService } from "../../services/petsApiCalls";
import { authContext } from "../../context/authContext";
import { toastContext } from "../../context/toastContext";

export default function PetCard(props) {
  const { isUser } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();
  const adopt = async () => {
    try {
      await adoptPetService(props.data._id, true, (s) => console.log(s));
      openToast("Pet adopted", "success");
      navigate("/search/" + props.data._id);
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const foster =async () => {
    try {
      await adoptPetService(props.data._id, false, (s) => console.log(s));
      openToast("Pet Fostered", "success");
      navigate("/search/" + props.data._id);
    } catch (error) {
      openToast(error.message, "error");
    }
  };
  return (
    <Card elevation={10} className="petCard">
      <CardMedia
        component="img"
        height="180"
        className="imageCon"
        image={imagesBaseUrl + props.data.pic}
        alt="pet image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.petName}
        </Typography>
        {props.showStatus && (
          <Typography gutterBottom variant="h7" component="div">
            {props.data.adoptionStatus}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {isUser && props.showStatus && (
          <>
            {props.data.adoptionStatus !== "Fostered" &&
              props.data.adoptionStatus !== "Adopted" && (
                <Button
                  onClick={foster}
                  className="adpBtn"
                  variant="outlined"
                  size="small"
                >
                  Foster
                </Button>
              )}

            {props.data.adoptionStatus !== "Adopted" && (
              <Button
                onClick={adopt}
                className="adpBtn"
                variant="outlined"
                size="small"
              >
                Adopt
              </Button>
            )}
          </>
        )}

        <Button
          onClick={() => props.redirectCallback(props.data._id)}
          className="linkSeeMoreBtn"
          variant="text"
          size="small"
        >
          See more
        </Button>

        {props.anotherButton}
      </CardActions>
    </Card>
  );
}
