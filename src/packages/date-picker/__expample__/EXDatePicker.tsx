import React from "react";
import dayjs from "dayjs";
import DatePicker from "@/packages/date-picker";
import Calendar from "@/packages/date-picker/Calendar";

const EXDatePicker = () => {
  const presets = [
    { label: "今天", value: dayjs() },
    { label: "昨天", value: dayjs().add(-1, "d") },
    { label: "上周", value: dayjs().add(-7, "d") },
    { label: "上个月", value: dayjs().add(-30, "d") },
  ];

  return (
    <div>
      <Calendar type="date" />
      <Calendar type="date" presets={presets} />
      <Calendar type="time" />
      <Calendar type="dateTime" />
      <Calendar type="rangeDate" />
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
