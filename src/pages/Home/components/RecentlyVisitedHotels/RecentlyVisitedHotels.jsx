import * as React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const hotelData = [
  {
    hotelId: 1,
    hotelName: "Hotel A",
    starRating: 4,
    visitDate: "2023-12-25T19:09:56.980Z",
    cityName: "Ramallah",
    thumbnailUrl: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    priceLowerBound: 100,
    priceUpperBound: 200,
  },
  {
    hotelId: 2,
    hotelName: "Hotel B",
    starRating: 4,
    visitDate: "2023-12-25T19:09:56.980Z",
    cityName: "Tokyo",
    thumbnailUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    priceLowerBound: 100,
    priceUpperBound: 200,
  },
  {
    hotelId: 3,
    hotelName: "Hotel B",
    starRating: 4,
    visitDate: "2023-12-25T19:09:56.980Z",
    cityName: "Ramallah",
    thumbnailUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    priceLowerBound: 100,
    priceUpperBound: 200,
  },
  {
    hotelId: 4,
    hotelName: "Hotel B",
    starRating: 4,
    visitDate: "2023-12-25T19:09:56.980Z",
    cityName: "City A",
    thumbnailUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    priceLowerBound: 100,
    priceUpperBound: 200,
  },
  {
    hotelId: 5,
    hotelName: "Hotel B",
    starRating: 4,
    visitDate: "2023-12-25T19:09:56.980Z",
    cityName: "City A",
    thumbnailUrl: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    priceLowerBound: 100,
    priceUpperBound: 200,
  },
  {
    hotelId: 7,
    hotelName: "Hotel C",
    starRating: 4,
    visitDate: "2023-12-25T19:09:56.980Z",
    cityName: "City A",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    priceLowerBound: 100,
    priceUpperBound: 200,
  },
  {
    hotelId: 8,
    hotelName: "Hotel D",
    starRating: 4,
    visitDate: "2023-12-25T19:09:56.980Z",
    cityName: "City D",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    priceLowerBound: 100,
    priceUpperBound: 200,
  },
];

const lastVisitedHotels = hotelData.slice(0, 5);

export function RecentlyVisitedHotels() {
  const [recentHotels, setRecentHotels] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // const handleFetchRecentlyVisitedHotels = async () => {
  //   try {
  //     const recentHotelsData = await recentlyVisitedHotelsAPI();
  //     setRecentHotels(recentHotelsData);
  //   } catch (error) {
  //     console.error("Error fetching recent hotels:", error);
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // React.useEffect(() => {
  //   handleFetchRecentlyVisitedHotels();
  // }, []);

  const handleNavigation = (hotelId) => {
    console.log("Clicked item hotelId:", hotelId);
  };

  return (
    <>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Recently Visited Hotels
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Grid container spacing={2}>
          {lastVisitedHotels.map((hotel) => (
            <Grid item key={hotel.hotelId} xs={12} sm={6} md={4}>
              <Card
                onClick={() => handleNavigation(hotel.hotelId)}
                style={{
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  alt={hotel.hotelName}
                  height="200"
                  image={`${hotel.thumbnailUrl}?w=248&fit=crop&auto=format`}
                  style={{
                    objectFit: "cover",
                    cursor: "pointer",
                    height: "100%",
                  }}
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
    </>
  );
}

export default RecentlyVisitedHotels;
