import WithLoading from "../../../../components/WithLoading/WithLoading";
import TrendingDestinationsWithoutLoading from "./TrendingDestinationsWithoutLoading";

const TrendingDestinationsWithLoading = WithLoading(
  TrendingDestinationsWithoutLoading
);
export default TrendingDestinationsWithLoading;
