import WithLoading from "../../../../components/WithLoading";
import RecentlyVisitedHotelsWithoutLoading from "./RecentlyVisitedHotelsWithoutLoading";

const RecentlyVisitedHotelsWithLoading = WithLoading(
  RecentlyVisitedHotelsWithoutLoading
);
export default RecentlyVisitedHotelsWithLoading;
