import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import StarRating from "../../../../components/StarRating";
// import SearchResultItemSkeleton from "../SearchResultItemSkeleton/SearchResultItemSkeleton";
// import { LoaderContext } from "../../../../context/LoaderContext";

const SearchResultItem = ({ hotel }) => {
  const {
    hotelName,
    starRating,
    roomType,
    roomPrice,
    roomPhotoUrl,
    cityName,
    amenities,
  } = hotel;

  // const { isLoading } = useContext(LoaderContext);

  return (
    <div>
      {/* <SearchResultItemSkeleton /> */}
      <Card
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          marginBottom: 4,
          borderRadius: 5,
          padding: 2,
          gap: 2,
        }}
      >
        <CardMedia
          component="img"
          alt={`Thumbnail of ${hotelName}`}
          height="250"
          image={roomPhotoUrl}
          sx={{
            width: { xs: "100%", md: "40%" },
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {hotelName}
            <StarRating starsNumber={starRating} />
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {hotelName} in {cityName} offers {roomType} rooms.
          </Typography>
          <div style={{ display: "flex", marginTop: "1rem" }}>
            {amenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity.name}
                sx={{
                  backgroundColor: "green",
                  color: "#fff",
                  fontSize: "0.9rem",
                  borderRadius: 5,
                  marginRight: 2,
                }}
              />
            ))}
          </div>
          <div className="price" style={{ marginTop: "1rem" }}>
            <Typography variant="body1">
              Price per night: US${roomPrice}
            </Typography>
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 1,
                borderRadius: 5,
                width: { xs: "100%", md: "50%" },
              }}
            >
              See Availability
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* )} */}
    </div>
  );
};

export default SearchResultItem;

SearchResultItem.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    starRating: PropTypes.number.isRequired,
    roomType: PropTypes.string.isRequired,
    roomPrice: PropTypes.number.isRequired,
    roomPhotoUrl: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    amenities: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};
