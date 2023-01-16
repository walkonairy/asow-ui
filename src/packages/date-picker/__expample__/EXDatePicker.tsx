import React from "react";
import dayjs from "dayjs";
import DatePicker from "@/packages/date-picker";

const EXDatePicker = () => {
  return (
    <div>
      <DatePicker
        disabledDate={(current) => {
          return current && current < dayjs().endOf("day");
        }}
      />
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
