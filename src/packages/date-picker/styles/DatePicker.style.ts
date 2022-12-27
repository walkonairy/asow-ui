import styled from "@emotion/styled";

export const Wrapper = styled.div<{ ok?: boolean }>`
  background: #fff;
  cursor: ${(props) => (props.ok ? "pointer" : "text")};
`;
