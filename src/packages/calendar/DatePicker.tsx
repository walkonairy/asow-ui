import React, { forwardRef, useContext, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import { getPrefixCls } from "@/utils";
import { Td, TdDiv, Th } from "@/packages/calendar/styles/DatePicker.style";
import { PickContext } from "@/packages/calendar/Calendar";

const Days = ["一", "二", "三", "四", "五", "六", "日"];

export type DateItem = {
  type: "pre" | "cur" | "next";
  text: string;
  value: string;
};

export interface DateProps {
  value?: string;
  disabledDate?: (currentDate: Dayjs) => boolean;
}
const DatePicker = forwardRef((props: DateProps, ref: React.RefObject<any>) => {
  const prefixCls: string = getPrefixCls("picker");

  const { value, disabledDate } = props;
  const { type, onChangeValue } = useContext(PickContext);
  console.log(type);

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

  const tdClassNames = (day: DateItem) => {
    return classNames(`${prefixCls}-td`, {
      [`${prefixCls}-td-disabled`]: disabledDate?.(dayjs(day.value)),
    });
  };

  const cellClassNames = (day: DateItem) => {
    return classNames(`${prefixCls}-cell`, {
      [`${prefixCls}-cell-today`]: dayjs().format("YYYY-MM-DD") === day.value,
    });
  };

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
    onChangeValue(day.value);
  };

  return (
    <div>
      <div className={`${prefixCls}-header`}>
        <button className={`${prefixCls}-header-prev-btn`} onClick={onPreMonth}>
          上一月
        </button>
        <div className={`${prefixCls}-header-view`}>{month}</div>
        <button
          className={`${prefixCls}-header-next-btn`}
          onClick={onNextMonth}
        >
          下一月
        </button>
      </div>
      <div className={`${prefixCls}-body`}>
        <table className={`${prefixCls}-table`}>
          <thead>
            <tr>
              {Days.map((item) => (
                <Th item={item} key={item}>
                  {item}
                </Th>
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
                    <Td
                      className={tdClassNames(day)}
                      key={day.text}
                      title={day.value}
                      onClick={() => onSelectDay(day)}
                      isWeekend={isWeekend}
                      day={day}
                      disable={disabledDate?.(dayjs(day.value))}
                    >
                      <TdDiv
                        className={cellClassNames(day)}
                        selectedDay={selectedValue}
                        day={day}
                      >
                        {day.text}
                      </TdDiv>
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default DatePicker;
