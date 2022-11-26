import React from "react";
import "./SearchResultsList.css";
import PetCard from "../PetCard/PetCard";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Loader from "../common/Loader/Loader";

export default function SearchResultsList(props) {
  const navigate = useNavigate();

  const goToPetPage = (id) => {
    navigate(`/search/${id}`);
  };

  if (props.isLoading) {
    return <Loader />;
  }

  if (!props.data.length && !props.isLoading) {
    return (
      <Box>
        <Typography className="noResHeader" variant="h5">
          No results found.. :(
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {props.data.map((pet) => {
        return (
          <PetCard
            showStatus={true}
            redirectCallback={goToPetPage}
            key={pet._id}
            data={pet}
          />
        );
      })}
    </>
  );
}
