import React, { useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm, searchType);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: "1px 4px",
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "5px",
        mr: 1,
      }}
      className={styles.searchBar}
    >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }}>
        <Select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="description">Description</MenuItem>
        </Select>
      </FormControl>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={`Search by ${searchType}`}
        inputProps={{ "aria-label": `search by ${searchType}` }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
