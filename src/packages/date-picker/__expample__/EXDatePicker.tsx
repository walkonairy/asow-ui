import React from "react";
import dayjs from "dayjs";
import DatePicker from "@/packages/date-picker";
import Calendar from "@/packages/date-picker/Calendar";

const EXDatePicker = () => {
  return (
    <div>
      <Calendar type="date" />
      <Calendar type="time" />
      <Calendar type="dateTime" />
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div>
  );
};

export default EXDatePicker;
