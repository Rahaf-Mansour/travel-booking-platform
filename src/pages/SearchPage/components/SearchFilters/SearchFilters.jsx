import React from "react";
import { Formik, Form } from "formik";
import {
  Slider,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from "@mui/material";
import styles from "./style.module.css";

const initialValues = {
  priceRange: [50, 180],
  starRating: 3,
  amenities: [],
  roomType: "",
  sort: "none",
};

const SearchFilters = () => {
  const handleFilter = (values) => {
    console.log("Filter clicked with values:", values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFilter}>
      {({ values, handleChange, handleSubmit }) => (
        <Form style={{ flex: 1.2 }}>
          <div className={styles.filterSide}>
            <FormControl
              component="fieldset"
              sx={{ display: "block", width: "100%", mb: 2 }}
            >
              <FormLabel component="legend">Your Budget per night:</FormLabel>
              <Slider
                value={values.priceRange}
                onChange={(event, newValue) => {
                  handleChange("priceRange")(event, newValue);
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={20}
                max={700}
                step={10}
              />
            </FormControl>

            <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
              <FormLabel component="legend">Star Rating:</FormLabel>
              <RadioGroup
                aria-label="star-rating"
                name="star-rating"
                value={values.starRating}
                onChange={handleChange("starRating")}
              >
                {[3, 4, 5].map((rating) => (
                  <FormControlLabel
                    key={rating}
                    value={rating}
                    control={<Radio />}
                    label={`${rating} Star${rating !== 1 && "s"}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
              <FormLabel component="legend">Amenities:</FormLabel>
              <FormGroup>
                {["Wi-Fi", "Parking", "Breakfast"].map((amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        checked={values.amenities.includes(amenity)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          handleChange({
                            target: {
                              name: "amenities",
                              value: isChecked
                                ? [...values.amenities, amenity]
                                : values.amenities.filter(
                                    (item) => item !== amenity
                                  ),
                            },
                          });
                        }}
                        name={amenity}
                      />
                    }
                    label={amenity}
                  />
                ))}
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
              <FormLabel component="legend">Room Type:</FormLabel>
              <RadioGroup
                aria-label="room-type"
                name="room-type"
                value={values.roomType}
                onChange={handleChange("roomType")}
              >
                {["Luxury", "Budget", "Boutique"].map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ display: "block", mb: 2 }}>
              <FormLabel component="legend">Sort By</FormLabel>
              <RadioGroup
                aria-label="sort-by"
                name="sort-by"
                value={values.sort}
                onChange={handleChange("sort")}
              >
                {["Price", "Star Rating"].map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Filter
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchFilters;
