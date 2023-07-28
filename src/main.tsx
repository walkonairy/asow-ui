import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";

import ExButton from "@/packages/button/__example__/ExButton";
import ExInput from "@/packages/input/__example__/ExInput";
import EXIcon from "@/packages/icon/__example__/EXIcon";
import ExCalendar from "./packages/calendar/__example__/ExCalendar";
import EXModal from "./packages/modal/__example__/EXModal";
import ExPortal from "./packages/portal/__example__/ExPortal";
import ExText from "./packages/text/__example__/ExText";

// ReactDOM.render(
//   <div style={{ gap: 32, display: "flex", flexDirection: "column" }}>
//     <div>
//       {/*<ExInput />*/}
//       {/*<ExButton />*/}
//       {/*<EXIcon />*/}
//       <EXDatePicker />
//     </div>
//   </div>,
//   document.getElementById("root")
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div
    style={{
      gap: 32,
      display: "flex",
      flexDirection: "column",
      height: "200vh",
    }}
  >
    <div>
      {/*<ExInput />*/}
      {/*<ExButton />*/}
      {/*<EXIcon />*/}
      {/*<ExCalendar />*/}
      {/*<EXModal />*/}
      <ExPortal />
    </div>
  </div>
);
