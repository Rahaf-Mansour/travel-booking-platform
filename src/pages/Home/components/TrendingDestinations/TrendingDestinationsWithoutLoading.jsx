import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";

const TrendingDestinationsWithoutLoading = ({
  trendingDestinations,
  snackbar,
  handleCloseSnackbar,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {trendingDestinations.map((item) => (
          <Grid item key={item.cityId} xs={12} sm={6} md={4}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ac31",
                border: "1px solid rgba(64, 51, 51, 0.549)",
              }}
            >
              <CardMedia
                component="img"
                alt={item.cityName}
                height="250"
                image={`${item.thumbnailUrl}`}
                style={{ width: "100%", objectFit: "cover" }}
              />

              <CardContent sx={{ paddingBottom: "16px !important" }}>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <LocationOnIcon
                    sx={{ fontSize: "1.2rem", marginRight: 0.5 }}
                  />
                  {item.cityName} - {item.countryName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </>
  );
};

export default TrendingDestinationsWithoutLoading;

TrendingDestinationsWithoutLoading.propTypes = {
  trendingDestinations: PropTypes.arrayOf(
    PropTypes.shape({
      cityId: PropTypes.number.isRequired,
      cityName: PropTypes.string.isRequired,
      countryName: PropTypes.string.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  snackbar: PropTypes.object.isRequired,
  handleCloseSnackbar: PropTypes.func.isRequired,
};
