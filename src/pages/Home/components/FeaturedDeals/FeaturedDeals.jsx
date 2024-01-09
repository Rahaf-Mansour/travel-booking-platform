import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import { featuredDealsAPI } from "../../../../services/homePageServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import Skeleton from "@mui/material/Skeleton";
import StarRating from "../../../../components/StarRating";
import { getHotelDetails } from "../../../../services/hotelPageServices";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";

const FeaturedDeals = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsData = await featuredDealsAPI();
        setDeals(dealsData);
      } catch (error) {
        setError(error);
        console.error("Error fetching deals:", error);
        showErrorSnackbar("Whoops! Something went wrong when loading deals.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(window.innerWidth >= 768 ? 3 : 1);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    adaptiveHeight: true,
    slidesToShow: slidesToShow,
    autoplay: true,
  };

  const handleDealClick = useCallback(
    async (hotelId) => {
      try {
        const hotelDetails = await getHotelDetails(hotelId);
        navigate(`/hotel/${hotelId}`);
        console.log("Hotel Details:", hotelDetails);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    },
    [getHotelDetails]
  );

  return (
    <div className={styles.featuredDealsContainer}>
      <h2> Featured Deals </h2>
      {error && <p>Something went wrong. Please try again later.</p>}
      {isLoading && (
        <Slider {...settings}>
          {[1, 2, 3].map((_, index) => (
            <div key={index}>
              <div className={styles.skeletonDealCard}>
                <Skeleton variant="rectangular" width="100%" height="300px" />
                <div className={styles.bottomContainer}>
                  <Skeleton />
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {!isLoading && (
        <div style={{ marginTop: "2rem", cursor: "pointer" }}>
          <Slider {...settings}>
            {deals.map((deal) => (
              <div key={deal.hotelId}>
                <div
                  key={deal.hotelId}
                  onClick={() => handleDealClick(deal.hotelId)}
                  className={styles.dealCard}
                >
                  <img
                    className={styles.roomPhoto}
                    src={deal.roomPhotoUrl}
                    alt={deal.hotelName}
                  />
                  <div className={styles.bottomContainer}>
                    <h3 className={styles.hotelName}>{deal.hotelName}</h3>
                    <p className={styles.cityName}>{deal.cityName}</p>

                    <StarRating starsNumber={deal.hotelStarRating} />

                    <div
                      className={styles.priceInfo}
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        marginTop: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <p className={styles.originalPrice}>
                        ${deal.originalRoomPrice}
                      </p>
                      <p className={styles.finalPrice}>${deal.finalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </div>
  );
};

export default FeaturedDeals;
