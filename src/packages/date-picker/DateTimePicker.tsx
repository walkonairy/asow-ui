import React from "react";
import { getPrefixCls } from "@/utils";
import DatePicker from "@/packages/date-picker/DatePicker";
import TimePicker from "@/packages/date-picker/TimePicker";
import dayjs from "dayjs";

const DateTimePicker = () => {
  const prefixCls: string = getPrefixCls("picker");

  return (
    <div style={{ display: "flex" }}>
      <DatePicker
        disabledDate={(current) => {
          return current && current < dayjs().endOf("day");
        }}
      />
      <TimePicker />
    </div>
  );
};
export default DateTimePicker;
