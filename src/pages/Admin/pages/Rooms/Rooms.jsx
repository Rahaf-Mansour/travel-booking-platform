import { useState } from "react";
import LeftNavigation from "../../components/LeftNavigation";
import SearchBar from "./components/SearchBar";
import { CssBaseline, Box, Container } from "@mui/material";
import UpdateRoomForm from "./components/UpdateRoomForm";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import { deleteRoom } from "../../../../services/manageRooms";
import CreateRoomDialog from "./components/CreateRoomDialog";
import RoomsDetailedGrid from "./components/RoomsDetailedGrid";

const Rooms = () => {
  // const [, setSelectedEntity] = useState(null);
  const [rooms, setRooms] = useState([]);
  const {
    snackbar,
    handleCloseSnackbar,
    showErrorSnackbar,
    showSuccessSnackbar,
  } = useSnackbar();

  // const handleRowClick = (entity) => {
  //   setSelectedEntity(entity);
  // };

  const handleAddRoom = (newRoom) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
  };

  const handleUpdateRooms = (updatedRoom) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
    );
  };

  const handleDeleteRoom = async (selectedRoom) => {
    try {
      await deleteRoom(2, selectedRoom.id);
      console.log("deleted room " + selectedRoom.id + " successfully");
      showSuccessSnackbar("Room deleted successfully!");
      setRooms((prevRooms) =>
        prevRooms.filter((room) => room.id !== selectedRoom.id)
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
          <CreateRoomDialog
            addRoom={handleAddRoom}
            snackbarProps={{
              ...snackbar,
              handleCloseSnackbar,
              showErrorSnackbar,
              showSuccessSnackbar,
            }}
          />
        </Container>
        <Container>
          <RoomsDetailedGrid
            data={rooms}
            columns={[
              { field: "roomNumber", headerName: "Room Number" },
              { field: "cost", headerName: "Cost" },
            ]}
            // onRowClick={handleRowClick}
            onUpdate={handleUpdateRooms}
            onDelete={handleDeleteRoom}
            EntityFormComponent={UpdateRoomForm}
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

export default Rooms;
