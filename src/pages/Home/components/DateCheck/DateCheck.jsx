import React from "react";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangeIcon from "@mui/icons-material/DateRange";
import styles from "./style.module.css";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import CustomButton from "../../../../components/CustomButton";

function DateCheck({ handleSetDate, isDateOpened, setIsDateOpened }) {
  const [date, setDate] = useState([
    {
      startDate: dayjs().toDate(),
      endDate: dayjs().add(1, "day").toDate(),
      key: "selection",
    },
  ]);

  const handleChangeDate = (newDate) => {
    console.log(newDate);
    try {
      setDate([newDate.selection]);
      handleSetDate(newDate.selection);
    } catch (error) {
      console.error("Error updating date:", error);
    }
  };

  return (
    <>
      <CustomButton
        type="button"
        className={styles.heroSearchText}
        onClick={() => setIsDateOpened(!isDateOpened)}
      >
        <DateRangeIcon className={styles.heroIcon} />
        <span>
          {`${dayjs(date[0].startDate).format("YYYY-MM-DD")} - ${dayjs(
            date[0].endDate
          ).format("YYYY-MM-DD")}`}
        </span>
      </CustomButton>

      {isDateOpened && (
        <DateRange
          editableDateInputs={true}
          onChange={(newDate) => handleChangeDate(newDate)}
          moveRangeOnFirstSelection={false}
          ranges={date}
          className={styles.datePicker}
        />
      )}
    </>
  );
}

export default DateCheck;

DateCheck.propTypes = {
  handleSetDate: PropTypes.func,
  isDateOpened: PropTypes.bool,
  setIsDateOpened: PropTypes.func,
};
