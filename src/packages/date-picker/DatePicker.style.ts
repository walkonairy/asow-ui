import styled from "@emotion/styled";
import { DateItem } from "@/packages/date-picker/DatePicker";

export const Wrapper = styled.div<{ ok?: boolean }>`
  background: #fff;
  cursor: ${(props) => (props.ok ? "pointer" : "text")};
`;

export const Th = styled.th<{ item: string }>`
  color: ${({ item }) => (["六", "日"].includes(item) ? "#00e5ae" : "#ffffff")};
`;

export const Td = styled.td<{
  isWeekend?: boolean;
  day?: DateItem;
  disable?: boolean;
}>`
  color: ${({ isWeekend, day, disable }) => {
    let c;
    if (disable) {
      return "rgba(205,205,205, 0.6)";
    }
    if (day.type === "cur") {
      c = isWeekend ? "#00e5ae" : "";
    } else {
      c = "#777777";
    }
    return c;
  }};
`;

export const TdDiv = styled.div<{ selectedDay?: string; day?: DateItem }>`
  background: ${({ selectedDay, day }) => {
    let b = "";
    if (day.value === selectedDay) {
      b = "linear-gradient(180deg, #2af598 0%, #009efd 100%)";
    }
    return b;
  }};
`;
