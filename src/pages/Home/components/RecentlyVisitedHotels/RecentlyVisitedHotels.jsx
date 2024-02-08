import { useState, useEffect } from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { recentlyVisitedHotelsAPI } from "../../../../services/homePageServices";
import useValueFromToken from "../../../../hooks/useValueFromToken";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import { useLoading } from "../../../../context/LoadingContext";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";
import { useNavigate } from "react-router-dom";

export function RecentlyVisitedHotels() {
  const [recentHotels, setRecentHotels] = useState([]);
  const [isLoading, setIsLoading] = useLoading();
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  const userId = useValueFromToken("user_id");
  const navigate = useNavigate();

  const handleFetchRecentlyVisitedHotels = async () => {
    setIsLoading(true);
    try {
      if (userId) {
        const recentHotelsData = await recentlyVisitedHotelsAPI(userId);
        setRecentHotels(recentHotelsData);
      }
    } catch (error) {
      showErrorSnackbar(
        "Whoops! Something went wrong when loading recently visited hotels."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchRecentlyVisitedHotels();
  }, []);

  const handleNavigation = (hotelId) => {
    navigate(`/hotel/${hotelId}`);
  };

  const lastVisitedHotels = recentHotels.slice(1, 5);

  return (
    <>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Recently Visited Hotels
      </h2>

      {isLoading ? (
        <CircularProgressIndicator />
      ) : (
        <Grid container spacing={2}>
          {lastVisitedHotels.map((hotel) => (
            <Grid item key={hotel.hotelId} xs={12} sm={6}>
              <Card
                onClick={() => handleNavigation(hotel.hotelId)}
                style={{
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow:
                    "2px 2px 4px rgba(8, 12, 2, 0.2), -2px -2px 4px rgba(8, 12, 2, 0.2)",
                }}
              >
                <CardMedia
                  component="img"
                  alt={hotel.hotelName}
                  height="200"
                  image={`${hotel.thumbnailUrl}`}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {hotel.hotelName}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {`${hotel.cityName} | Rating: ${hotel.starRating} Stars | Price Range: $${hotel.priceLowerBound} - $${hotel.priceUpperBound}`}
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

export default RecentlyVisitedHotels;
