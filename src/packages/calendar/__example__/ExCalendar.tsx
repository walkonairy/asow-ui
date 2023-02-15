import React from "react";
import dayjs from "dayjs";
import Calendar from "@/packages/calendar";

const ExCalendar = () => {
  const presets = [
    { label: "今天", value: dayjs() },
    { label: "昨天", value: dayjs().add(-1, "d") },
    { label: "上周", value: dayjs().add(-7, "d") },
    { label: "上个月", value: dayjs().add(-30, "d") },
  ];

  return (
    <div style={{ height: "200vh" }}>
      {/*<div style={{ height: "100vh" }} />*/}
      <Calendar type="date" />
      <Calendar type="date" presets={presets} />
      <Calendar type="time" />
      <Calendar type="dateTime" />
      <Calendar type="rangeDate" />
    </div>
  );
};

export default ExCalendar;
