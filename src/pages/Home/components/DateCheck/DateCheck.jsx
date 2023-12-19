import React from "react";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
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
      <button
        className={styles.heroSearchText}
        onClick={() => setIsDateOpened(!isDateOpened)}
      >
        <DateRangeIcon className={styles.heroIcon} />
        <span>
          {`${date[0].startDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })} - ${date[0].endDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}`}
        </span>
      </button>
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

export default DateCheck;
