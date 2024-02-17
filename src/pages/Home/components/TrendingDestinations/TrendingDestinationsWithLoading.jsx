import WithLoading from "../../../../components/WithLoading";
import TrendingDestinationsWithoutLoading from "./TrendingDestinationsWithoutLoading";

const TrendingDestinationsWithLoading = WithLoading(
  TrendingDestinationsWithoutLoading
);
export default TrendingDestinationsWithLoading;
