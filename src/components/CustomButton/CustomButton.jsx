import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({ className, onClick, children, style }) => {
  return (
    <button className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default CustomButton;
