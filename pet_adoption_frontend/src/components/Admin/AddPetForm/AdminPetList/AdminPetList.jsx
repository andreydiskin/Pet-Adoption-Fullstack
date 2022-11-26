import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toastContext } from "../../../../context/toastContext";
import { editPetBaseUrl, seeMorePetBaseUrl } from "../../../../Lib/config";
import { getPetsByQueryService } from "../../../../services/petsApiCalls";
import Loader from "../../../common/Loader/Loader";
import PetCard from "../../../PetCard/PetCard";

export default function AdminPetList() {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { openToast } = useContext(toastContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getPets = async () => {
      try {
        setIsLoading(true);
        await getPetsByQueryService({ isAdopted: false }, setPets);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        openToast(error.message, "error");
      }
    };
    getPets();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid
      container
      columnSpacing={{ xs: 0, sm: 4, lg: 12 }}
      rowSpacing={{ xs: 1, lg: 3 }}
      columns={{ xs: 12, sm: 4, md: 6, lg: 8 }}
    >
      {pets.length ? (
        pets.map((pet) => (
          <Grid item xs={12} sm={2} md={2} lg={2} key={pet._id}>
            <PetCard
              redirectCallback={(e) => navigate(seeMorePetBaseUrl + pet._id)}
              showStatus={false}
              key={pet._id}
              data={pet}
              anotherButton={
                <Button onClick={() => navigate(editPetBaseUrl + pet._id)}>
                  edit
                </Button>
              }
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h5">No Pets...</Typography>
        </Grid>
      )}
    </Grid>
  );
}
