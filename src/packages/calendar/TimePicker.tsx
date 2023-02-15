import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { getPrefixCls } from "@/utils";
import { PickContext } from "@/packages/calendar/Calendar";
import dayjs from "dayjs";
import { DateItem } from "@/packages/calendar/DatePicker";

export interface TimeProps {
  value?: string;
  isOpen?: boolean;
}

const TimePicker = forwardRef((props: TimeProps, ref: React.RefObject<any>) => {
  const { value } = props;

  const datePrefixCls: string = getPrefixCls("picker");
  const prefixCls: string = getPrefixCls("picker-time");

  const sixty: string[] = [];
  for (let i = 0; i <= 59; i++) {
    sixty.push(String(i < 10 ? `0${i}` : i));
  }

  const twelve: string[] = [];
  for (let i = 0; i <= 23; i++) {
    twelve.push(String(i < 10 ? `0${i}` : i));
  }

  const hRef = useRef<HTMLDivElement>(null);
  const mRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);

  const [h, setH] = useState("14");
  const [m, setM] = useState("07");
  const [s, setS] = useState("50");

  const onClickH = (v) => {
    setH(v);
  };

  const onClickM = (v) => {
    setM(v);
  };

  const onClickS = (v) => {
    setS(v);
  };

  return (
    <div>
      <div className={`${datePrefixCls}-header`}>
        <div className={`${datePrefixCls}-header-view`}>{`${h}:${m}:${s}`}</div>
      </div>
      <div className={`${prefixCls}-body`}>
        <TimeItem ref={hRef} data={twelve} value={h} onClick={onClickH} />
        <TimeItem ref={mRef} data={sixty} value={m} onClick={onClickM} />
        <TimeItem ref={sRef} data={sixty} value={s} onClick={onClickS} />
      </div>
    </div>
  );
});

interface TimeItemProps {
  data: string[];
  value?: string;
  onClick?: (value: string, index: number) => void;
}
const TimeItem = forwardRef(
  (props: TimeItemProps, ref: React.RefObject<HTMLDivElement>) => {
    const { data, onClick, value } = props;
    const { isOpen } = useContext(PickContext);

    useEffect(() => {
      if (!isOpen) return;

      ref.current.scrollTo({
        top: Number(value) * 30,
        behavior: "smooth",
      });
    }, [isOpen, value]);

    const prefixCls: string = getPrefixCls("picker-time");

    const liClassNames = (v: string) => {
      return classNames(`${prefixCls}-li`, {
        [`${prefixCls}-li-selected`]: v === value,
      });
    };

    const _onClick = (e, v, i) => {
      ref.current.scrollTo({ top: i * 30, behavior: "smooth" });
      onClick?.(v, i);
    };

    return (
      <div ref={ref} className={`${prefixCls}-scroll`}>
        <ul className={`${prefixCls}-ul`}>
          {data.map((v, i) => (
            <li
              key={v}
              className={liClassNames(v)}
              onClick={(e) => _onClick(e, v, i)}
            >
              {v}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default TimePicker;
