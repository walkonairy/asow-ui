import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import Trigger from "@/packages/trigger";

const DatePicker = forwardRef((props: any, ref: React.RefObject<any>) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 展示当前页的日期
    const days = [];

    const year = dayjs().year();
    console.log("year", year);
    const month = dayjs().month() + 1;
    // const month = 4;
    console.log("month", month);
    const yAndM = `${year}-${month}`;
    console.log("yAndM", yAndM);

    // 这个月有多少天
    const a = dayjs(yAndM).daysInMonth();
    console.log("这个月有多少天", a);
    for (let i = 1; i <= a; i++) {
      days.push(i);
    }

    // 这个月第一天是星期几
    const b = dayjs(yAndM).day() || 7;
    console.log("这个月第一天是星期几", b);
    // 上个月有多少天
    const b1 = dayjs(yAndM).subtract(1, "month").daysInMonth();
    console.log("上个月有多少天", b1);
    for (let i = 0; i < b - 1; i++) {
      days.unshift(b1 - i);
    }

    // 这个月最后一天是星期几
    const c = dayjs(`${yAndM}-${a}`).day() || 7;
    console.log("这个月最后一天是星期几", c);
    // 下个月有多少天
    const c1 = dayjs(`${yAndM}-${a}`).add(1, "month").daysInMonth();
    console.log("下个月有多少天", c1);

    for (let i = 1; i <= 14 - c; i++) {
      console.log("=====", i);
      if (days.length === 42) {
        break;
      }
      days.push(i);
    }

    console.log(days);
  }, []);

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
        <div
          ref={triggeredRef}
          style={{
            border: "1px solid #eaeaea",
            borderRadius: 8,
            boxShadow: "rgb(0 0 0 / 10%) 0px 2px 12px 0px",
            background: "#fff",
            padding: "8px 16px",
            height: 300,
            width: 300,
            fontSize: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span> 上一月 </span>
            <span>2022年12月</span>
            <span> 下一月 </span>
          </div>
          <table style={{ marginTop: 8 }}>
            <thead>
              <tr>
                {["一", "二", "三", "四", "五", "六", "日"].map((item) => (
                  <th style={{ width: 40 }}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: 40 }}>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Trigger>
    </>
  );
});

export default DatePicker;
