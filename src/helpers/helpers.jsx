import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export const renderAmenityIcon = (amenityName) => {
  switch (amenityName.toLowerCase()) {
    case "free wi-fi":
      return <WifiIcon fontSize="small" />;
    case "tv":
      return <TvIcon fontSize="small" />;
    case "air conditioning":
      return <AcUnitIcon fontSize="small" />;
    default:
      return null;
  }
};
