import styled from "@emotion/styled";

export const ScrollUL = styled.div<{ ok?: boolean }>`
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-track {
    width: 0;
  }
`;

export const UL = styled.ul`
  width: 56px;
  list-style: none;
  padding: 0px;
  margin: 0px;
  text-align: center;

  &:after {
    display: block;
    height: 326px;
    content: "";
  }
`;

export const LI = styled.li`
  padding: 4px 0;
  cursor: pointer;

  &: hover {
    transition: all 0.2s ease 0s;
    background: #f5f7fa;
    color: #000000;
    border-radius: 4px;
  }
`;
