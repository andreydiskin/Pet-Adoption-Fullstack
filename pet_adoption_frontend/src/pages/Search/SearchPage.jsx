import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchForm from "../../components/searchForm/SearchForm";
import SearchResultsList from "../../components/SearchResultsList/SearchResultsList";
import "./SearchPage.css";

export default function SearchPage() {
  const [searchPets, setSearchPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Stack className="searchPageCon">
      <Typography variant="h2">Search for a pet</Typography>
      <SearchForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSearchPets={setSearchPets}
      />
      <SearchResultsList isLoading={isLoading} data={searchPets} />
    </Stack>
  );
}
