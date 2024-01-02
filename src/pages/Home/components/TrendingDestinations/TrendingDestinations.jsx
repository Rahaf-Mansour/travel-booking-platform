import React, { useState, useEffect } from "react";
import { trendingDestinationsAPI } from "../../../../services/homePageServices";
import { Grid, Card, CardContent, Typography } from "@mui/material";

export function TrendingDestinations() {
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFetchTrendingDestinations = async () => {
    try {
      const trendingDestinationsData = await trendingDestinationsAPI();
      setTrendingDestinations(trendingDestinationsData);
    } catch (error) {
      setError(error);
      console.error("Error fetching trending destinations:", error);
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
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Grid container spacing={2}>
          {trendingDestinations.map((item) => (
            <Grid item key={item.cityId} xs={12} sm={6} md={4}>
              <Card
                onClick={() => handleNavigation(item.cityId)}
                style={{
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={`${item.thumbnailUrl}`}
                  alt={item.cityName}
                  loading="lazy"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
                <CardContent style={{ flexGrow: 1 }}>
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
    </>
  );
}

export default TrendingDestinations;
