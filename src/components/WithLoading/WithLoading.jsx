import CircularProgressIndicator from "../CircularProgressIndicator";
import PropTypes from "prop-types";

function WithLoading(Component) {
  function WithLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <CircularProgressIndicator />;
  }

  WithLoadingComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };
  return WithLoadingComponent;
}
export default WithLoading;
