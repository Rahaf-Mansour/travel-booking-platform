import PropTypes from "prop-types";
import styles from "./style.module.css";
import CustomButton from "../../../../components/CustomButton";

const OptionItem = ({ count, label, onDecrement, onIncrement, min }) => {
  const handleDecrement = () => {
    if (count > min) {
      onDecrement();
    }
  };

  return (
    <div className={styles.optionItem}>
      <span className={styles.optionText}>{label}</span>
      <div className={styles.optionCounter}>
        <CustomButton
          type="button"
          disabled={count <= min}
          className={styles.optionCounterButton}
          onClick={handleDecrement}
          aria-label={`Decrease ${label}`}
        >
          <span className={styles.sign}>&#x2212;</span>
        </CustomButton>
        <span className={styles.optionCounterNumber}>{count}</span>
        <CustomButton
          type="button"
          className={styles.optionCounterButton}
          onClick={onIncrement}
          aria-label={`Increase ${label}`}
        >
          <span className={styles.sign}>&#43;</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default OptionItem;

OptionItem.propTypes = {
  count: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
  min: PropTypes.number,
};
