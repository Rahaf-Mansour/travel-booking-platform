import React, { useState, useEffect } from "react";
import LeftNavigation from "../../components/LeftNavigation";
import SearchBar from "../../components/SearchBar";
import { CssBaseline, Box, Container } from "@mui/material";
import UpdateHotelForm from "./components/UpdateHotelForm";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import {
  getHotelInfoByItsId,
  deleteHotel,
} from "../../../../services/manageHotels";
import CreateHotelDialog from "./components/CreateHotelDialog";
import DetailedGrid from "../../components/DetailedGrid";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";

const Hotels = () => {
  const [, setSelectedEntity] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    snackbar,
    handleCloseSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar,
  } = useSnackbar();

  const handleRowClick = (entity) => {
    setSelectedEntity(entity);
  };

  const handleAddHotel = (newHotel) => {
    setHotels((prevHotels) => [newHotel, ...prevHotels]);
  };

  const handleUpdateHotels = (updatedHotel) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === updatedHotel.id ? updatedHotel : hotel
      )
    );
  };

  const handleDeleteHotel = async (selectedHotel) => {
    try {
      const hotelInfo = await getHotelInfoByItsId(selectedHotel.id);
      await deleteHotel(hotelInfo.cityId, selectedHotel.id);
      console.log("deleted hotel " + selectedHotel.id + " successfully");
      showSuccessSnackbar("Hotel deleted successfully!");
      setHotels((prevHotels) =>
        prevHotels.filter((hotel) => hotel.id !== selectedHotel.id)
      );
    } catch (error) {
      showErrorSnackbar(`Whoops! ${error.message}`);
    }
  };

  const fetchHotels = async (
    searchTerm = "",
    searchType = "name",
    page = 0,
    pageSize = rowsPerPage
  ) => {
    setLoading(true);
    const queryParam = searchTerm
      ? `${searchType === "name" ? "name" : "searchQuery"}=${encodeURIComponent(
          searchTerm
        )}&`
      : "";
    try {
      const response = await fetch(
        `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/hotels?${queryParam}pageSize=${pageSize}&pageNumber=${
          page + 1
        }`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const hotelsData = await response.json();
      setHotels(hotelsData);
    } catch (error) {
      console.error("Fetching hotels failed: ", error);
      showErrorSnackbar(`Error fetching hotels: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page, rowsPerPage]);

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
          <SearchBar onSearch={fetchHotels} />
          <CreateHotelDialog
            addHotel={handleAddHotel}
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
            data={hotels}
            columns={[
              { field: "name", headerName: "Name" },
              { field: "description", headerName: "Description" },
              { field: "hotelType", headerName: "Hotel Type" },
              { field: "starRating", headerName: "Star Rating" },
              { field: "latitude", headerName: "Latitude" },
              { field: "longitude", headerName: "Longitude" },
            ]}
            onRowClick={handleRowClick}
            onUpdate={handleUpdateHotels}
            onDelete={handleDeleteHotel}
            EntityFormComponent={UpdateHotelForm}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={hotels.length}
          />
          {loading && <CircularProgressIndicator />}
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

export default Hotels;
