import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const HotelMapLocation = ({ latitude, longitude, hotelName, location }) => {
  const position = [latitude, longitude];

  return (
    <div className={styles.mapContainer}>
      <h3>See on map:</h3>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "300px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <strong>{hotelName}</strong>
            <br />
            {location}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

HotelMapLocation.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  hotelName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default HotelMapLocation;
