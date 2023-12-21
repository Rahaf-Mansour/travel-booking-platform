import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({
  type = "submit",
  className,
  onClick,
  children,
  style,
}) => {
  return (
    <button type={type} className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default CustomButton;
