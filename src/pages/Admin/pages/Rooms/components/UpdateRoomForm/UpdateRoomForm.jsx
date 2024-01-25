import React from "react";
import { Drawer, IconButton, Typography, Box } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { updateRoom } from "../../../../../../services/manageRooms";
import { fields, validationSchema } from "../../roomConfig";
import UpdateButton from "../../../../components/UpdateButton";
import UpdateEntityForm from "../../../../components/UpdateEntityForm";

const UpdateRoomForm = ({ open, onClose, entityData, onUpdate }) => {
  if (!entityData) {
    return null;
  }

  const handleUpdateClick = async (values, actions) => {
    try {
      await updateRoom(entityData.id, values.roomNumber, values.cost);
      const updatedRoom = {
        ...entityData,
        roomNumber: values.roomNumber,
        cost: values.cost,
      };
      if (onUpdate) {
        onUpdate(updatedRoom);
      }
      console.log("Room updated:", updatedRoom);
    } catch (error) {
      console.log(error.message);
    } finally {
      onClose();
      actions.setSubmitting(false);
    }
  };

  const updatedFields = fields.filter((field) => field.name !== "hotelId");

  const initialValues = fields.reduce((values, field) => {
    values[field.name] =
      entityData && entityData[field.name] !== undefined
        ? entityData[field.name]
        : field.type === "number"
        ? 0
        : "";
    return values;
  }, {});

  return (
    <Drawer anchor="right" open={open} onClose={onClose} variant="persistent">
      <Box
        sx={{ width: 250 }}
        role="presentation"
        display="flex"
        flexDirection="column"
      >
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 2 }}>
          Update Room
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateClick}
          enableReinitialize={true}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box sx={{ m: 2 }}>
                <UpdateEntityForm
                  fields={updatedFields}
                  touched={touched}
                  errors={errors}
                />
                <UpdateButton isSubmitting={isSubmitting} />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  );
};

export default UpdateRoomForm;

UpdateRoomForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  entityData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};
