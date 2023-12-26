import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { trendingDestinationsAPI } from "../../../../services/homePageServices";

export function TrendingDestinations() {
  const [trendingDestinations, setTrendingDestinations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

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

  React.useEffect(() => {
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
        <ImageList sx={{ width: "100%", height: "auto" }} cols={2}>
          {trendingDestinations.map((item) => (
            <ImageListItem
              key={item.cityId}
              onClick={() => handleNavigation(item.cityId)}
              style={{ cursor: "pointer" }}
            >
              <img
                srcSet={`${item.thumbnailUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.thumbnailUrl}?w=248&fit=crop&auto=format`}
                alt={item.cityName}
                loading="lazy"
              />
              <ImageListItemBar
                title={
                  <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {item.cityName}
                  </span>
                }
                position="above"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </>
  );
}

export default TrendingDestinations;
