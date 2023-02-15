import React from "react";
import DatePicker from "@/packages/calendar/DatePicker";
import dayjs from "dayjs";

const RangeDatePicker = () => {
  const currentMonth = dayjs().format("YYYY-MM");
  const nextMonth = dayjs().add(1, "month").format("YYYY-MM");

  return (
    <div style={{ display: "flex" }}>
      <DatePicker value={currentMonth} />
      <DatePicker value={nextMonth} />
    </div>
  );
};

export default RangeDatePicker;
