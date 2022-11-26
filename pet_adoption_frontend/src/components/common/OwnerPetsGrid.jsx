import { Grid, Typography } from "@mui/material";
import React from "react";
import PetCard from "../PetCard/PetCard";

export default function OwnerPetsGrid(props) {
  return (
    <Grid
      className="myPetsGrid"
      container
      spacing={2}
      columnSpacing={{ xs: 3 }}
      columns={{ xs: 12, sm: 6, md: 6 }}
    >
      {props.userDogs?.length ? (
        props.userDogs.map((pet) => (
          <Grid
            item
            xs={props.gridColumns}
            sm={props.gridColumns}
            md={props.gridColumns / 2}
            key={pet._id}
          >
            <PetCard
              redirectCallback={props.redirectCallback}
              showStatus={props.showStatus}
              key={pet._id}
              data={pet}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sm={12} md={12}>
          <Typography className="noPetsHeader" variant="h5">
            {props.noDataMsg}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
