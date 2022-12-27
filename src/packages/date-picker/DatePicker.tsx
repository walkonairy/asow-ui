import React, { forwardRef, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Trigger from "@/packages/trigger";
import { getPrefixCls } from "@/utils";
import { Wrapper } from "@/packages/date-picker/styles/DatePicker.style";

type DateItem = { type: "pre" | "cur" | "next"; text: string; value: string };

interface DateProps {
  value: string;
}
const DatePicker = forwardRef((props: DateProps, ref: React.RefObject<any>) => {
  const prefixCls: string = getPrefixCls("picker");

  const { value } = props;

  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef<HTMLDivElement>(null);

  const [days, setDays] = useState<DateItem[][]>([]);
  const [month, setMonth] = useState(
    value ? dayjs(value).format("YYYY-MM") : dayjs().format("YYYY-MM")
  );
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    computePanelDate();
  }, [month]);

  const computePanelDate = () => {
    const _days = [];
    computeCurrentMonth(_days);
    computePreMonth(_days);
    computeNextMonth(_days);

    let newArr: any[] = [];
    while (_days.length > 0) {
      newArr.push(_days.splice(0, 7));
    }
    setDays(newArr);
  };

  /**
   * 计算当前月的展示天数
   * @param _days
   */
  const computeCurrentMonth = (_days) => {
    const currentMonthDays = dayjs(month).daysInMonth();
    for (let i = 1; i <= currentMonthDays; i++) {
      _days.push({
        type: "cur",
        text: i,
        value: dayjs(`${month}-${i}`).format("YYYY-MM-DD"),
      });
    }
  };

  /**
   * 计算上个月的展示天数
   * @param _days
   */
  const computePreMonth = (_days) => {
    const currentMonthFirstIndex = dayjs(month).day() || 7;
    const lastMonth = dayjs(month).subtract(1, "month");
    const lastMonthDays = lastMonth.daysInMonth();
    for (let i = 0; i < currentMonthFirstIndex - 1; i++) {
      _days.unshift({
        type: "pre",
        text: lastMonthDays - i,
        value: dayjs(
          `${lastMonth.format("YYYY-MM")}-${lastMonthDays - i}`
        ).format("YYYY-MM-DD"),
      });
    }
  };

  /**
   * 计算下个月的展示天数
   * @param _days
   */
  const computeNextMonth = (_days) => {
    const currentMonthDays = dayjs(month).daysInMonth();
    const currentMonthLastIndex =
      dayjs(`${month}-${currentMonthDays}`).day() || 7;
    const nextMonth = dayjs(`${month}-${currentMonthDays}`).add(1, "month");

    for (let i = 1; i <= 14 - currentMonthLastIndex; i++) {
      if (_days.length === 42) {
        break;
      }
      _days.push({
        type: "next",
        text: i,
        value: dayjs(`${nextMonth.format("YYYY-MM")}-${i}`).format(
          "YYYY-MM-DD"
        ),
      });
    }
  };

  const onPreMonth = () => {
    const now = dayjs(month).subtract(1, "month").format("YYYY-MM");
    setMonth(now);
  };

  const onNextMonth = () => {
    const now = dayjs(month).add(1, "month").format("YYYY-MM");
    setMonth(now);
  };

  const onSelectDay = (day: DateItem) => {
    if (day.type === "pre") {
      onPreMonth();
    }
    if (day.type === "next") {
      onNextMonth();
    }
    setSelectedValue(day.value);
    console.log(day);
  };

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
        <Wrapper ok>
          <div>icon</div>
        </Wrapper>
        <input
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
        <div ref={triggeredRef} className={`${prefixCls}-wrapper`}>
          <div className={`${prefixCls}-header`}>
            <button
              className={`${prefixCls}-header-prev-btn`}
              onClick={onPreMonth}
            >
              上一月
            </button>
            <div>{month}</div>
            <button
              className={`${prefixCls}-header-next-btn`}
              onClick={onNextMonth}
            >
              下一月
            </button>
          </div>
          <div className={`${prefixCls}-body`}>
            <table
              style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr>
                  {["一", "二", "三", "四", "五", "六", "日"].map((item) => (
                    <th
                      style={{
                        color: ["六", "日"].includes(item) ? "#00e5ae" : "#fff",
                      }}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((dayMap, i) => (
                  <tr key={i}>
                    {dayMap.map((day, index) => {
                      const isWeekend =
                        (index + 1) % 6 === 0 || (index + 1) % 7 === 0;

                      return (
                        <td
                          className={`${prefixCls}-td`}
                          key={day.text}
                          title={day.value}
                          style={{
                            color:
                              day.type === "cur"
                                ? isWeekend
                                  ? "#00e5ae"
                                  : ""
                                : "#777777",
                          }}
                          onClick={() => onSelectDay(day)}
                        >
                          <div
                            className={`${prefixCls}-cell`}
                            style={{
                              background:
                                day.value === selectedValue
                                  ? "linear-gradient(180deg, #2af598 0%, #009efd 100%)"
                                  : "",
                            }}
                          >
                            {day.text}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Trigger>
    </>
  );
});

export default DatePicker;
