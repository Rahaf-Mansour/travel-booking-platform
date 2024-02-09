import { useState, useEffect } from "react";
import { trendingDestinationsAPI } from "../../../../services/homePageServices";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import useLoading from "../../../../hooks/useLoading";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";

export function TrendingDestinations() {
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [isLoading, stopLoading] = useLoading();
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  useEffect(() => {
    const handleFetchTrendingDestinations = async () => {
      try {
        const trendingDestinationsData = await trendingDestinationsAPI();
        setTrendingDestinations(trendingDestinationsData);
      } catch (error) {
        showErrorSnackbar(
          "Failed to fetch trending destinations. Please try again later."
        );
      } finally {
        stopLoading();
      }
    };

    handleFetchTrendingDestinations();
  }, []);

  return (
    <>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Trending Destinations
      </h2>
      {isLoading ? (
        <CircularProgressIndicator />
      ) : (
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
                    sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    {item.cityName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </>
  );
}

export default TrendingDestinations;
