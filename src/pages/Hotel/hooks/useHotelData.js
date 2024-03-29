import { useState, useEffect } from "react";
import {
  getHotelDetails,
  getHotelGuestReviews,
  getHotelPicturesGallery,
  getHotelAvailableRooms,
} from "../../../services/hotelPageServices";
import useComponentLoader from "../../../hooks/useComponentLoader";

export const useHotelData = (
  hotelId,
  checkInDate,
  checkOutDate,
  isThereDates
) => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [hotelGuestReviews, setHotelGuestReviews] = useState([]);
  const [hotelGallery, setHotelGallery] = useState([]);
  const [hotelAvailableRooms, setHotelAvailableRooms] = useState([]);
  const { isLoading, stopLoading } = useComponentLoader();
  const [error, setError] = useState("");

  const fetchHotelData = async () => {
    setError("");

    Promise.allSettled([
      getHotelDetails(hotelId),
      getHotelGuestReviews(hotelId),
      getHotelPicturesGallery(hotelId),
      isThereDates
        ? getHotelAvailableRooms(hotelId, checkInDate, checkOutDate)
        : Promise.resolve([]),
    ])
      .then((results) => {
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            switch (index) {
              case 0:
                setHotelDetails(result.value);
                break;
              case 1:
                setHotelGuestReviews(result.value);
                break;
              case 2:
                setHotelGallery(result.value);
                break;
              case 3:
                setHotelAvailableRooms(result.value);
                break;
            }
          } else {
            console.error(result.reason);
            setError(
              (prev) =>
                `${prev} ${
                  result.reason?.data?.message ||
                  result.reason?.statusText ||
                  "Error fetching data"
                }. `
            );
          }
        });
      })
      .finally(() => stopLoading());
  };

  useEffect(() => {
    fetchHotelData();
  }, [hotelId, checkInDate, checkOutDate]);

  return {
    hotelDetails,
    hotelGuestReviews,
    hotelGallery,
    hotelAvailableRooms,
    isLoading,
    error,
  };
};
