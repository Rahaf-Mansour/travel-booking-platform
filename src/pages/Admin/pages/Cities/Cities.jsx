import { useState, useEffect } from "react";
import LeftNavigation from "../../components/LeftNavigation";
import SearchBar from "../../components/SearchBar";
import { CssBaseline, Box, Container } from "@mui/material";
import UpdateCityForm from "./components/UpdateCityForm";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import { deleteCity } from "../../../../services/manageCities";
import CreateCityDialog from "./components/CreateCityDialog";
import DetailedGrid from "../../components/DetailedGrid";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";
import useLoading from "../../../../hooks/useLoading";
import axiosInstance from "../../../../Axios/axiosInstance";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, startLoading, stopLoading] = useLoading();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    snackbar,
    handleCloseSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar,
  } = useSnackbar();

  const handleAddCity = (newCity) => {
    setCities((prevCities) => [newCity, ...prevCities]);
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

  const fetchCities = async (
    searchTerm = "",
    searchType = "name",
    page = 0,
    pageSize = rowsPerPage
  ) => {
    const queryParam = searchTerm
      ? `${searchType === "name" ? "name" : "searchQuery"}=${encodeURIComponent(
          searchTerm
        )}&`
      : "";
    startLoading();
    try {
      const response = await axiosInstance.get(
        `/cities?${queryParam}pageSize=${pageSize}&pageNumber=${page + 1}`
      );
      setCities(response.data);
      if (response.data.length > 0) {
        showSuccessSnackbar("Cities fetched successfully!");
      } else {
        showErrorSnackbar(`No data were found.`);
      }
    } catch (error) {
      console.error("Fetching cities failed: ", error);
      showErrorSnackbar(`Error fetching cities: ${error.message}`);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchCities();
  }, [page, rowsPerPage]);

  return (
    <Box>
      <CssBaseline />
      <Box component="main">
        <LeftNavigation />

        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            my: 2,
            px: 4,
          }}
        >
          <SearchBar onSearch={fetchCities} />
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
            onUpdate={handleUpdateCities}
            onDelete={handleDeleteCity}
            EntityFormComponent={UpdateCityForm}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            isLoading={isLoading}
          />
          {isLoading && <CircularProgressIndicator />}
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
