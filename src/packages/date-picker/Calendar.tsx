import React, { createContext, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks/useOnclickOutSide";
import Trigger from "@/packages/trigger";
import { getPrefixCls } from "@/utils";
import DatePicker from "@/packages/date-picker/DatePicker";
import DateTimePicker from "@/packages/date-picker/DateTimePicker";
import TimePicker from "@/packages/date-picker/TimePicker";
import RangeDatePicker from "@/packages/date-picker/RangeDatePicker";
import DatePickerWithPresets, {
  Presets,
} from "@/packages/date-picker/DatePickerWithPresets";

interface PickContextProps {
  isOpen?: boolean;
  type?: PickerType;
}
export const PickContext = createContext<PickContextProps>({});

type PickerType = "date" | "time" | "dateTime" | "rangeDate";
interface CalendarProps {
  type: PickerType;
  presets?: Presets[];
}

const Calendar = (props: CalendarProps) => {
  const { type, presets } = props;
  const prefixCls: string = getPrefixCls("picker");

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef<HTMLDivElement>(null);

  // useOnClickOutside(() => {
  //   setIsOpen(false);
  // }, triggeredRef);

  return (
    <>
      <div
        ref={triggerRef}
        style={{
          display: "inline-flex",
          border: "1px solid",
          position: "relative",
        }}
      >
        <div>icon</div>
        <input
          ref={inputRef}
          readOnly
          onFocus={() => {
            setIsOpen(true);
          }}
          onDoubleClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
      <Trigger
        triggerRef={triggerRef}
        triggeredRef={triggeredRef}
        isOpen={isOpen}
      >
        <PickContext.Provider value={{ isOpen, type }}>
          <div ref={triggeredRef}>
            <div className={`${prefixCls}-wrapper`}>
              {type === "date" && !presets && <DatePicker />}
              {type === "date" && presets && (
                <DatePickerWithPresets presets={presets} />
              )}
              {type === "time" && <TimePicker />}
              {type === "dateTime" && <DateTimePicker />}
              {type === "rangeDate" && <RangeDatePicker />}
            </div>
          </div>
        </PickContext.Provider>
      </Trigger>
    </>
  );
};

export default Calendar;
