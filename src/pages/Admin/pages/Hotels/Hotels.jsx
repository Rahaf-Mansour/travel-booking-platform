import React, { useState } from "react";
import LeftNavigation from "../../components/LeftNavigation";
import SearchBar from "./components/SearchBar";
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

const Hotels = () => {
  const [, setSelectedEntity] = useState(null);
  const [hotels, setHotels] = useState([]);
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
    setHotels((prevHotels) => [...prevHotels, newHotel]);
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

export default Hotels;
