import React, { useState, useEffect, useContext } from "react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import OwnerPetsGrid from "../../components/common/OwnerPetsGrid";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import Loader from "../../components/common/Loader/Loader";
import { getUserPetsAll } from "../../services/usersApiCalls";
import { toastContext } from "../../context/toastContext";
import "./MyPetsPage.css";
export default function MyPetsPage() {
  const { user } = useContext(authContext);
  const { openToast } = useContext(toastContext);

  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getPets = async () => {
      try {
        setIsLoading(true);
        await getUserPetsAll(user._id, (data) => {
          setPets(data);
          setIsLoading(false);
        });
      } catch (error) {
        openToast(error.message, "error");
        setIsLoading(false);
      }
    };
    getPets();
  }, [user]);

  const goToPetPage = (id) => {
    navigate(`/search/${id}`);
  };

  const handleToggle = (event, pick) => {
    setIsSaved(pick);
  };

  return (
    <Stack className="myPetsCon">
      <Typography className="petsHeader" variant="h2">
        My Pets
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={isSaved}
        exclusive
        onChange={handleToggle}
        aria-label="Platform"
      >
        <ToggleButton value={true}>Saved</ToggleButton>
        <ToggleButton value={false}>Owned</ToggleButton>
      </ToggleButtonGroup>
      {isLoading ? (
        <Loader />
      ) : (
        <OwnerPetsGrid
          showStatus={true}
          redirectCallback={goToPetPage}
          userDogs={isSaved ? pets.saved : pets.own}
          noDataMsg={
            isSaved
              ? "No saved pets... "
              : "You currently do not own or foster any pets."
          }
          gridColumns={12}
        />
      )}
    </Stack>
  );
}
