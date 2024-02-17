import { useState } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

const DetailedGrid = ({
  data,
  columns,
  onUpdate,
  onDelete,
  EntityFormComponent,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleRowClick = (entity) => {
    setSelectedEntity(entity);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
              {data.length > 0 ? (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      onClick={() => handleRowClick(row)}
                    >
                      {columns.map((column) => (
                        <TableCell key={`${row.id}-${column.field}`}>
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
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1}>
                    No data were found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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

export default DetailedGrid;

DetailedGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      renderAction: PropTypes.func,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  EntityFormComponent: PropTypes.elementType,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};
