import React from "react";
import { DateRange } from "react-date-range";
import { useState } from "react";
// import PropTypes from "prop-types";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./DateCheck.module.css";

function DateCheck() {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
      key: "selection",
    },
  ]);
  const [isDateOpened, setIsDateOpened] = useState(false);

  return (
    <>
      <span
        className={styles.heroSearchText}
        onClick={() => setIsDateOpened(!isDateOpened)}
      >
        {`${date[0].startDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })} - ${date[0].endDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })}`}
      </span>
      {isDateOpened && (
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          className={styles.datePicker}
        />
      )}
    </>
  );
}

// DateRange.prototypes = {
//   startDate: PropTypes.object,
//   endDate: PropTypes.object,
//   color: PropTypes.string,
//   key: PropTypes.string,
//   autoFocus: PropTypes.bool,
//   disabled: PropTypes.bool,
//   showDateDisplay: PropTypes.bool,
// };

export default DateCheck;
