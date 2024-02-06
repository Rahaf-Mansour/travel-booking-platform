import { useState, useEffect } from "react";
import { trendingDestinationsAPI } from "../../../../services/homePageServices";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useLoading } from "../../../../context/LoadingContext";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";

export function TrendingDestinations() {
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [isLoading, setIsLoading] = useLoading();
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  const handleFetchTrendingDestinations = async () => {
    try {
      const trendingDestinationsData = await trendingDestinationsAPI();
      setTrendingDestinations(trendingDestinationsData);
    } catch (error) {
      showErrorSnackbar(
        "Whoops! Something went wrong when loading trending destinations."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchTrendingDestinations();
  }, []);

  const handleNavigation = (cityId) => {
    console.log("Clicked item cityId:", cityId);
  };

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
                onClick={() => handleNavigation(item.cityId)}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ac31",
                  border: "1px solid rgba(64, 51, 51, 0.549)",
                }}
              >
                <img
                  src={`${item.thumbnailUrl}`}
                  alt={item.cityName}
                  loading="lazy"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
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
