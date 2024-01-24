import React, { useEffect, useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import styles from "./style.module.css";
import HotelDetails from "./components/HotelDetails";
import HotelMapLocation from "./components/HotelMapLocation";
import AvailableRooms from "./components/AvailableRooms";
import VisualGallery from "./components/VisualGallery";
import { useParams } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";

import {
  getHotelDetails,
  getHotelPicturesGallery,
  getHotelAvailableRooms,
  getHotelGuestReviews,
} from "../../services/hotelPageServices";
import Footer from "../../components/Footer";

const Hotel = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [hotelGuestReviews, setHotelGuestReviews] = useState([]);
  const [hotelGallery, setHotelGallery] = useState([]);
  const [hotelAvailableRooms, setHotelAvailableRooms] = useState([]);
  const { searchParams } = useContext(SearchContext);
  const { checkInDate, checkOutDate } = searchParams;
  const isThereDates = checkInDate !== null && checkOutDate !== null;

  useEffect(() => {
    getHotelDetails(hotelId)
      .then((details) => {
        setHotelDetails(details);
      })
      .catch((error) => {
        console.error(error.message);
      });

    getHotelGuestReviews(hotelId)
      .then((reviews) => {
        setHotelGuestReviews(reviews);
      })
      .catch((error) => {
        console.error(error.message);
      });

    getHotelPicturesGallery(hotelId)
      .then((gallery) => {
        setHotelGallery(gallery);
      })
      .catch((error) => {
        console.error(error.message);
      });

    if (isThereDates) {
      getHotelAvailableRooms(hotelId, checkInDate, checkOutDate)
        .then((rooms) => {
          setHotelAvailableRooms(rooms);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [hotelId, checkInDate, checkOutDate]);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.hotelDetailsAndMapContainer}>
          <HotelDetails
            hotelDetails={hotelDetails}
            hotelGuestReviews={hotelGuestReviews}
          />
          {hotelDetails && hotelDetails.latitude && hotelDetails.longitude && (
            <HotelMapLocation
              latitude={hotelDetails.latitude}
              longitude={hotelDetails.longitude}
              hotelName={hotelDetails.hotelName}
              location={hotelDetails.location}
            />
          )}
        </div>

        <div className={styles.galleryAndRoomsContainer}>
          <VisualGallery hotelGallery={hotelGallery} />
          <AvailableRooms
            hotelAvailableRooms={hotelAvailableRooms}
            isThereDates={isThereDates}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hotel;
