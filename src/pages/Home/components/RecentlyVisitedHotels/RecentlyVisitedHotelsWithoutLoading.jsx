import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import PropTypes from "prop-types";

function RecentlyVisitedHotelsWithoutLoading({
  lastVisitedHotels,
  handleNavigation,
  snackbar,
  handleCloseSnackbar,
}) {
  return (
    <>
      <Grid container spacing={2}>
        {lastVisitedHotels.map((hotel) => (
          <Grid item key={hotel.hotelId} xs={12} sm={6}>
            <Card
              onClick={() => handleNavigation(hotel.hotelId)}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                boxShadow:
                  "2px 2px 4px rgba(8, 12, 2, 0.2), -2px -2px 4px rgba(8, 12, 2, 0.2)",
              }}
            >
              <CardMedia
                component="img"
                alt={hotel.hotelName}
                height="250"
                image={`${hotel.thumbnailUrl}`}
                style={{ width: "100%", objectFit: "cover" }}
              />

              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  {hotel.hotelName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  sx={{ fontSize: { lg: "1rem" } }}
                >
                  {`${hotel.cityName} | ${hotel.starRating} Stars | Price Range: $${hotel.priceLowerBound} - $${hotel.priceUpperBound}`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </>
  );
}

export default RecentlyVisitedHotelsWithoutLoading;

RecentlyVisitedHotelsWithoutLoading.propTypes = {
  lastVisitedHotels: PropTypes.arrayOf(
    PropTypes.shape({
      hotelId: PropTypes.number.isRequired,
      hotelName: PropTypes.string.isRequired,
      cityName: PropTypes.string.isRequired,
      starRating: PropTypes.number.isRequired,
      priceLowerBound: PropTypes.number.isRequired,
      priceUpperBound: PropTypes.number.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleNavigation: PropTypes.func.isRequired,
  snackbar: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
  }).isRequired,
  handleCloseSnackbar: PropTypes.func.isRequired,
};
