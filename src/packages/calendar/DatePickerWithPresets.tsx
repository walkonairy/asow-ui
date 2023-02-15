import React from "react";
import DatePicker from "@/packages/calendar/DatePicker";
import { getPrefixCls } from "@/utils";
import { Dayjs } from "dayjs";

export type Presets = { label: string; value: Dayjs };

interface PresetsProps {
  presets?: Presets[];
}

const DatePickerWithPresets = (props: PresetsProps) => {
  const { presets } = props;
  const prefixCls: string = getPrefixCls("picker");

  const _onClick = (value) => {
    console.log(value);
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={`${prefixCls}-presets`}>
        <ul className={`${prefixCls}-presets-ul`}>
          {presets?.map((preset) => (
            <li
              key={preset.label}
              className={`${prefixCls}-presets-li`}
              onClick={() => _onClick(preset.value)}
            >
              {preset.label}
            </li>
          ))}
        </ul>
      </div>
      <DatePicker />
    </div>
  );
};

export default DatePickerWithPresets;
