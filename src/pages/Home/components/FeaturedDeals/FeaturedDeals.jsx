import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import { featuredDealsAPI } from "../../../../services/homePageServices";
import useSnackbar from "../../../../hooks/useSnackbar";
import GenericSnackbar from "../../../../components/GenericSnackbar";
import DealCard from "./DealCard";
import CircularProgressIndicator from "../../../../components/CircularProgressIndicator";
import useComponentLoader from "../../../../hooks/useComponentLoader";

const FeaturedDeals = () => {
  const [deals, setDeals] = useState([]);
  const { isLoading, stopLoading } = useComponentLoader();
  const [error, setError] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const { snackbar, showErrorSnackbar, handleCloseSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsData = await featuredDealsAPI();
        setDeals(dealsData);
      } catch (error) {
        setError(error);
        showErrorSnackbar("Failed to fetch deals. Please try again later.");
      } finally {
        stopLoading();
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setSlidesToShow(1);
      } else if (windowWidth >= 768 && windowWidth <= 1000) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <div className={styles.featuredDealsContainer}>
      <h2> Featured Deals </h2>
      {error && <p>Something went wrong. Please try again later.</p>}

      <div style={{ marginTop: "2rem", cursor: "pointer" }}>
        <Slider {...settings}>
          {deals.map((deal) => (
            <DealCard key={deal.hotelId} deal={deal} />
          ))}
        </Slider>
      </div>
      {isLoading && <CircularProgressIndicator />}
      <GenericSnackbar {...snackbar} onClose={handleCloseSnackbar} />
    </div>
  );
};

export default FeaturedDeals;
