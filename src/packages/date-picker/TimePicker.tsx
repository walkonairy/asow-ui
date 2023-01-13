import React, { forwardRef, useRef } from "react";
import { ScrollUL, UL, LI } from "@/packages/date-picker/TimePicker.style";

export interface TimeProps {}

const TimePicker = forwardRef((props: TimeProps, ref: React.RefObject<any>) => {
  const sixty: string[] = [];
  for (let i = 0; i <= 59; i++) {
    sixty.push(String(i < 10 ? `0${i}` : i));
  }

  const hRef = useRef(null);
  const mRef = useRef(null);
  const sRef = useRef(null);

  return (
    <>
      <div
        style={{
          background: "#333643",
          height: 354,
          width: 168,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#fff",
          fontSize: 14,
        }}
      >
        <div style={{ display: "flex", height: "100%" }}>
          <ScrollUL ref={hRef}>
            <UL>
              {Array.from({ length: 24 }).map((v, i) => (
                <LI
                  onClick={() => {
                    hRef.current.scrollTo({ top: i * 28, behavior: "smooth" });
                  }}
                >
                  {i < 10 ? `0${i}` : i}
                </LI>
              ))}
            </UL>
          </ScrollUL>
          <ScrollUL ref={mRef}>
            <UL>
              {sixty.map((v, i) => (
                <LI
                  onClick={() => {
                    mRef.current.scrollTo({ top: i * 28, behavior: "smooth" });
                  }}
                >
                  {v}
                </LI>
              ))}
            </UL>
          </ScrollUL>
          <ScrollUL ref={sRef}>
            <UL>
              {sixty.map((v, i) => (
                <LI
                  onClick={() => {
                    sRef.current.scrollTo({ top: i * 28, behavior: "smooth" });
                  }}
                >
                  {v}
                </LI>
              ))}
            </UL>
          </ScrollUL>
        </div>
        <div>2</div>
      </div>
    </>
  );
});

export default TimePicker;
