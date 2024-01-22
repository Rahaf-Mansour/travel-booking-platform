import React, { useState } from "react";
import LeftNavigation from "../../components/LeftNavigation";
import SearchBar from "./components/SearchBar";
import { CssBaseline, Box, Container } from "@mui/material";
import UpdateCityForm from "./components/UpdateCityForm";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import { deleteCity } from "../../../../services/manageCities";
import CreateCityDialog from "./components/CreateCityDialog";
import DetailedGrid from "../../components/DetailedGrid";

const Cities = () => {
  const [, setSelectedEntity] = useState(null);
  const [cities, setCities] = useState([]);
  const {
    snackbar,
    handleCloseSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar,
  } = useSnackbar();

  const handleRowClick = (entity) => {
    setSelectedEntity(entity);
  };

  const handleAddCity = (newCity) => {
    setCities((prevCities) => [...prevCities, newCity]);
  };

  const handleUpdateCities = (updatedCity) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.id === updatedCity.id ? updatedCity : city
      )
    );
  };

  const handleDeleteCity = async (selectedCity) => {
    try {
      await deleteCity(selectedCity.id);
      console.log("deleted city " + selectedCity.id + " successfully");
      showSuccessSnackbar("City deleted successfully!");
      setCities((prevCities) =>
        prevCities.filter((city) => city.id !== selectedCity.id)
      );
    } catch (error) {
      showErrorSnackbar(`Whoops! ${error.message}`);
    }
  };

  return (
    <Box>
      <CssBaseline />
      <Box component="main">
        <LeftNavigation />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 2,
          }}
        >
          <SearchBar />
          <CreateCityDialog
            addCity={handleAddCity}
            snackbarProps={{
              ...snackbar,
              handleCloseSnackbar,
              showErrorSnackbar,
              showSuccessSnackbar,
            }}
          />
        </Container>
        <Container>
          <DetailedGrid
            data={cities}
            columns={[
              { field: "name", headerName: "Name" },
              { field: "description", headerName: "Description" },
            ]}
            onRowClick={handleRowClick}
            onUpdate={handleUpdateCities}
            onDelete={handleDeleteCity}
            EntityFormComponent={UpdateCityForm}
          />
        </Container>
      </Box>
      <GenericSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default Cities;
