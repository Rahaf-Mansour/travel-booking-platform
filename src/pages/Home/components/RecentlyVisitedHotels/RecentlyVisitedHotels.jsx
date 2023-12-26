import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

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

const handleNavigation = (hotelId) => {
  console.log("Clicked item hotelId:", hotelId);
};

export function RecentlyVisitedHotels() {
  return (
    <>
      <h2 style={{ marginTop: "4rem", marginBottom: "2rem" }}>
        Recently Visited Hotels
      </h2>
      <ImageList sx={{ width: "100%", height: "auto" }} cols={3}>
        {lastVisitedHotels.map((hotel) => (
          <ImageListItem
            key={hotel.hotelId}
            onClick={() => handleNavigation(hotel.hotelId)}
            sx={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
          >
            <img
              srcSet={`${hotel.thumbnailUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${hotel.thumbnailUrl}?w=248&fit=crop&auto=format`}
              alt={hotel.hotelName}
              loading="lazy"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            <ImageListItemBar
              sx={{
                border: "1px solid grey",
                paddingX: "1rem",
                paddingY: "0.5rem",
              }}
              title={
                <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                  {hotel.hotelName}
                </span>
              }
              subtitle={
                <div
                  style={{
                    marginTop: "1rem",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >{`${hotel.cityName} | Rating: ${hotel.starRating} Stars | Price Range: $${hotel.priceLowerBound} - $${hotel.priceUpperBound}`}</div>
              }
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

export default RecentlyVisitedHotels;
