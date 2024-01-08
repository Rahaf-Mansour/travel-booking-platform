import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateEntityForm from "../UpdateEntityForm";
import PropTypes from "prop-types";

const DetailedGrid = ({ allCities, onRowClick, onUpdate, onDelete }) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedEntity, setSelectedEntity] = React.useState(null);

  const handleRowClick = (entity) => {
    setSelectedEntity(entity);
    onRowClick(entity);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleUpdate = (updatedEntity) => {
    onUpdate(updatedEntity);
    closeDrawer();
  };

  const handleDelete = (entity) => {
    onDelete(entity);
  };
  const rows = allCities || [];

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when the button is clicked
                        handleDelete(row);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <UpdateEntityForm
        open={isDrawerOpen}
        onClose={closeDrawer}
        entityData={selectedEntity}
        onUpdate={handleUpdate}
      />
    </>
  );
};

DetailedGrid.propTypes = {
  allCities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  onRowClick: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DetailedGrid;
