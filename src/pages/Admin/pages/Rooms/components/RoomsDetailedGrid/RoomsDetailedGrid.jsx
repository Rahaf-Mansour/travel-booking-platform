import React, { useState } from "react";
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
import PropTypes from "prop-types";

const RoomsDetailedGrid = ({
  data,
  columns,
  onRowClick,
  onUpdate,
  onDelete,
  EntityFormComponent,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleRowClick = (entity) => {
    setSelectedEntity(entity);
    onRowClick && onRowClick(entity);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleUpdate = (updatedEntity) => {
    onUpdate(updatedEntity);
    closeDrawer();
  };

  const handleDelete = (entity, event) => {
    event.stopPropagation();
    onDelete(entity);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.field}>{column.headerName}</TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {row[column.field]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={(e) => handleDelete(row, e)}
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

      {EntityFormComponent && (
        <EntityFormComponent
          open={isDrawerOpen}
          onClose={closeDrawer}
          entityData={selectedEntity}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default RoomsDetailedGrid;

RoomsDetailedGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      renderAction: PropTypes.func,
    })
  ).isRequired,
  onRowClick: PropTypes.func,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  EntityFormComponent: PropTypes.elementType,
};
