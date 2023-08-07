import React, { createContext, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks/useOnclickOutSide";
import { getPrefixCls } from "@/utils";

import DatePicker from "@/packages/calendar/DatePicker";
import DateTimePicker from "@/packages/calendar/DateTimePicker";
import TimePicker from "@/packages/calendar/TimePicker";
import RangeDatePicker from "@/packages/calendar/RangeDatePicker";
import DatePickerWithPresets, {
  Presets,
} from "@/packages/calendar/DatePickerWithPresets";

import { findDOMNode } from "react-dom";
import { Input } from "@/index";
import { Icon } from "@asow/ui";
import Portal from "@/packages/portal";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";

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

const Calendar: React.FC<CalendarProps> = (props) => {
  const { type, presets } = props;
  const prefixCls: string = getPrefixCls("picker");

  const triggerRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const dropClassNames = classNames(
    `${prefixCls}-anm`,
    `${prefixCls}-dropdown`
  );

  useOnClickOutside((e) => {
    const child = triggerRef.current;
    const isClickChild = findDOMNode(child)?.contains(e.target as any) || false;
    if (!isClickChild) {
      setIsOpen(false);
    }
  }, triggeredRef);

  useEffect(() => {
    window.addEventListener("resize", computePosition);
    window.addEventListener("scroll", computePosition);
    return () => {
      window.removeEventListener("resize", computePosition);
      window.removeEventListener("scroll", computePosition);
    };
  }, []);

  const onChangeValue = (value) => {
    console.log(value);
    setInputValue(value);
  };

  const onOpenCalendar = () => {
    setIsOpen(true);
    computePosition();
  };

  const computePosition = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollLeft =
      document.documentElement.scrollLeft || document.body.scrollLeft || 0;

    const rect = inputRef.current.getBoundingClientRect();

    const documentW = document.documentElement.clientWidth;
    const documentH = document.documentElement.clientHeight;

    setTimeout(() => {
      const calendarRect = triggeredRef.current.getBoundingClientRect();

      const isOutsideRight =
        calendarRect.width > documentW - rect.width - rect.x - 10;
      const isOutsideBottom =
        calendarRect.height > documentH - rect.height - rect.y;

      let top;
      let left;

      if (isOutsideRight) {
        left = rect.x + rect.width - calendarRect.width + scrollLeft + 50;
      } else {
        left = rect.x + scrollLeft - 16;
      }

      if (isOutsideBottom) {
        top = rect.y - calendarRect.height + scrollTop - 8;
      } else {
        top = rect.y + rect.height + scrollTop + 8;
      }

      triggeredRef.current.style.top = top + "px";
      triggeredRef.current.style.left = left + "px";
    });
  };

  return (
    <>
      <div
        ref={triggerRef}
        style={{ display: "inline-flex" }}
        onClick={onOpenCalendar}
      >
        <Input
          ref={inputRef}
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
      <Portal>
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames={`${prefixCls}-applied ${prefixCls}-fade`}
          unmountOnExit={false}
        >
          <PickContext.Provider value={{ isOpen, type, onChangeValue }}>
            <div className={dropClassNames} ref={triggeredRef}>
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
        </CSSTransition>
      </Portal>
    </>
  );
};

export default Calendar;
