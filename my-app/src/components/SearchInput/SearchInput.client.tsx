"use client";

import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";

export default function SearchInput() {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value ? e.target.value.trim() : "");
  };

  const handleSearch = () => {
    alert(searchText);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", padding: 1 }}>
      <InputBase
        sx={{ flexGrow: 1 }}
        onChange={handleSearchTextChange}
        inputProps={{ defaultValue: searchText }}
      />
      <IconButton onClick={(e) => handleSearch()}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
