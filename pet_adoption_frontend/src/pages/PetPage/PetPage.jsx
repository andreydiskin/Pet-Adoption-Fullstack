import React, { useState, useEffect } from "react";
import "./PetPage.css";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import PetDesc from "../../components/common/PetDesc";
import IsPetAdoptedByUser from "../../components/common/IsPetAdoptedByUser";
import { imagesBaseUrl } from "../../Lib/config";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import {
  adoptPetService,
  getPetByIdService,
  returnPetService,
  savePetService,
} from "../../services/petsApiCalls";
import Loader from "../../components/common/Loader/Loader";
import { toastContext } from "../../context/toastContext";

export default function PetPage() {
  let { id } = useParams();
  const { user, isUser, refreshUser } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const [pet, setPet] = useState(null);
  const [isSaved, setIsSaved] = useState();

  useEffect(() => {
    const getPet = async () => {
      try {
        await getPetByIdService(id, setPet);
      } catch (error) {
        openToast(error.message, "error");
      }
    };
    getPet();
  }, [id]);

  useEffect(() => {
    setIsSaved(user?.savedPets?.includes(id));
  }, [user]);

  const unsavePet = async () => {
    try {
      await savePetService(id, false, refreshUser);

      openToast("Pet unsaved", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const savePet = async () => {
    try {
      await savePetService(id, true, refreshUser);

      openToast("Pet saved", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const returnPet = () => {
    try {
      returnPetService(id, setPet);
      openToast("Pet returned", "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const adoptPet = (isAdopt) => {
    try {
      adoptPetService(id, isAdopt, setPet);
      openToast(`Pet ${isAdopt ? "Adopted" : "Fosterd"}`, "success");
    } catch (error) {
      openToast(error.message, "error");
    }
  };
  if (!pet) {
    return <Loader />;
  }
  return (
    <>
      <Card className="petPageCon">
        <CardMedia
          component="img"
          className="petImg"
          src={`${imagesBaseUrl}${pet.pic}`}
          alt="green iguana"
        />
        <Typography variant="h3" color="text.secondary" gutterBottom>
          {pet.petName}
        </Typography>
        <CardContent className="cardContent">
          <PetDesc pet={pet} />
          <br />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Color: {pet.color}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Adoption status: {pet.adoptionStatus}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}
          </Typography>
        </CardContent>
        <Typography variant="body2">Bio: {pet.bio}</Typography>
        <Typography variant="body2">
          Dietry restictons: {pet.restiction}
        </Typography>
        {isUser && (
          <>
            <Button
              className="saveBtn"
              variant="contained"
              color="secondary"
              size="small"
              onClick={isSaved ? unsavePet : savePet}
            >
              {isSaved ? "unsave" : "Save for later"}
            </Button>

            <br />

            <IsPetAdoptedByUser
              returnPet={returnPet}
              pet={pet}
              adoptPet={adoptPet}
              userData={user}
            />
          </>
        )}
      </Card>
    </>
  );
}
