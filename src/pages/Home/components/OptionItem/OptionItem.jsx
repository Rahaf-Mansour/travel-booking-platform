import React from "react";
import PropTypes from "prop-types";
import styles from "./OptionItem.module.css";

const OptionItem = ({ count, label, onDecrement, onIncrement, min = 0 }) => (
  <>
    <div className={styles.optionItem}>
      <span className={styles.optionText}>{label}</span>
      <div className={styles.optionCounter}>
        <button
          disabled={count <= min}
          className={styles.optionCounterButton}
          aria-label={`Remove one ${label}`}
          onClick={onDecrement}
        >
          <span className={styles.sign}>&#x2212;</span>
        </button>
        <span className={styles.optionCounterNumber}>{count}</span>
        <button
          className={styles.optionCounterButton}
          aria-label={`Add one ${label}`}
          onClick={onIncrement}
        >
          <span className={styles.sign}>&#43;</span>
        </button>
      </div>
    </div>
  </>
);

export default OptionItem;

OptionItem.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  min: PropTypes.number,
};
