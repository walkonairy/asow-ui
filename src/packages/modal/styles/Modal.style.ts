import styled from "@emotion/styled";

export const Mask = styled.div<{ show?: boolean }>`
  position: ${({ show }) => show && "fixed"};
  top: 0;
  inset-inline-end: 0;
  bottom: 0;
  inset-inline-start: 0;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
`;
