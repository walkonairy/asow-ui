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
import { findDOMNode } from "react-dom";
import { Input } from "@/index";
import { Icon } from "@asow/ui";

interface PickContextProps {
  isOpen?: boolean;
  type?: PickerType;
  onChangeValue?: (value: string) => void;
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

  const triggerRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useOnClickOutside((e) => {
    const child = triggerRef.current;
    const isClickChild = findDOMNode(child)?.contains(e.target) || false;
    if (!isClickChild) {
      setIsOpen(false);
    }
  }, triggeredRef);

  const onChangeValue = (value) => {
    console.log(value);
    setInputValue(value);
  };

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: "inline-flex" }}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {/*<div>icon</div>*/}
        <Input
          readOnly
          size={"middle"}
          value={inputValue}
          suffixIcon={
            <Icon
              icon={["fas", "calendar-days"]}
              cursor="pointer"
              size={"lg"}
            />
          }
        />
      </div>
      <Trigger
        triggerRef={triggerRef}
        triggeredRef={triggeredRef}
        isOpen={isOpen}
      >
        <PickContext.Provider value={{ isOpen, type, onChangeValue }}>
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
