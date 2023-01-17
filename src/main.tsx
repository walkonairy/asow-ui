import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";

import ExButton from "@/packages/button/__expample__/ExButton";
import ExInput from "@/packages/input/__expample__/ExInput";
import EXIcon from "@/packages/icon/__expample__/EXIcon";
import EXDatePicker from "@/packages/date-picker/__expample__/EXDatePicker";

ReactDOM.render(
  <div style={{ gap: 32, display: "flex", flexDirection: "column" }}>
    <div>
      {/*<ExInput />*/}
      {/*<ExButton />*/}
      {/*<EXIcon />*/}
      <EXDatePicker />
    </div>
  </div>,
  document.getElementById("root")
);
