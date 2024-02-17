import { useState, useEffect } from "react";
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
import useComponentLoader from "../../../../hooks/useComponentLoader";
import axiosInstance from "../../../../Axios/axiosInstance";
import DetailedGridWithLoading from "../../components/DetailedGrid/DetailedGridWithLoading";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(0);
  const { isLoading, stopLoading } = useComponentLoader();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    snackbar,
    handleCloseSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar,
  } = useSnackbar();

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
    const queryParam = searchTerm
      ? `${searchType === "name" ? "name" : "searchQuery"}=${encodeURIComponent(
          searchTerm
        )}&`
      : "";
    try {
      const response = await axiosInstance.get(
        `/hotels?${queryParam}pageSize=${pageSize}&pageNumber=${page + 1}`
      );
      setHotels(response.data);
      if (response.data.length > 0) {
        showSuccessSnackbar("Hotels fetched successfully!");
      } else {
        showErrorSnackbar(`No data were found.`);
      }
    } catch (error) {
      console.error("Fetching hotels failed: ", error);
      showErrorSnackbar(`Error fetching hotels: ${error.message}`);
    } finally {
      stopLoading();
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
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            my: 2,
            px: 4,
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
          <DetailedGridWithLoading
            data={hotels}
            columns={[
              { field: "name", headerName: "Name" },
              { field: "description", headerName: "Description" },
              { field: "hotelType", headerName: "Hotel Type" },
              { field: "starRating", headerName: "Star Rating" },
              { field: "latitude", headerName: "Latitude" },
              { field: "longitude", headerName: "Longitude" },
            ]}
            onUpdate={handleUpdateHotels}
            onDelete={handleDeleteHotel}
            EntityFormComponent={UpdateHotelForm}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={hotels.length}
            isLoading={isLoading}
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
