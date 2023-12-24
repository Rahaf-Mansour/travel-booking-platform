import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { featuredDealsAPI } from "../../../../services/homePageServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";

const FeaturedDeals = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsData = await featuredDealsAPI();
        setDeals(dealsData);
      } catch (error) {
        setError(error);
        console.error("Error fetching deals:", error);
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
    // autoplay: true,
  };

  return (
    <div className={styles.featuredDealsContainer}>
      <h2> Featured Deals </h2>
      {isLoading && <p>Loading deals...</p>}
      {error && <p> {error.message}</p>}
      {!isLoading && (
        <Slider {...settings}>
          {deals.map((deal, index) => (
            <div key={deal.hotelId}>
              <div
                className={`${styles.dealCard} ${
                  index === deals.length - 2 && styles.lastDealCard
                }`}
              >
                <img
                  className={styles.roomPhoto}
                  src={deal.roomPhotoUrl}
                  alt={deal.hotelName}
                />
                <div className={styles.bottomContainer}>
                  <h3 className={styles.hotelName}>{deal.hotelName}</h3>
                  <p className={styles.cityName}>{deal.cityName}</p>
                  <div>
                    {Array(deal.hotelStarRating)
                      .fill()
                      .map((_, i) => (
                        <span key={i} role="img" aria-label="star">
                          ⭐
                        </span>
                      ))}
                  </div>
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
      )}
    </div>
  );
};

export default FeaturedDeals;
