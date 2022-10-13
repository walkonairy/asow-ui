import styled from "@emotion/styled";
import { theme } from "../../theme";

export const InputWrapper = styled.div`
  padding: 3px;
  border-radius: 18px;
  background: #333643;
  box-sizing: border-box;
  transition: all 0.3s;

  &: active {
    box-shadow: 0 0 0 6px #dae8fd;
  }
`;

export const InputBorder: any = styled.div`
  padding: 0px 16px;
  border: 2px solid transparent;
  border-radius: 16px;
  transition: all 0.3s;

  &: hover {
    border: 2px solid
      ${(props: any) =>
        props?.error ? theme.colors.semantics.error : "#4490ee"};
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 0px 12px;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0px 12px;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0px 8px;
    border: 1px solid transparent;
  }
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputLabel: any = styled.label`
  font-size: 12px;
  line-height: 12px;
  margin-top: 8px;
  color: ${(props: any) =>
    props.error ? theme.colors.semantics.error : "#8e96a4"};
  cursor: text;
  font-weight: 600;
  text-transform: capitalize;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const _Input = styled.input`
  font-size: 18px;
  border: unset;
  outline: unset;
  color: #ffffff;
  background: #333643;
  box-sizing: border-box;
  height: 36px;

  &:focus-visible,
  &:focus {
    border: unset;
    outline: unset;
  }
  &::placeholder {
    color: #8e96a4;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 16px;
    height: 34px;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 14px;
    height: 42px;
    line-height: 42px;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
`;

export const InputIcon = styled.div`
  margin-left: 16px;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 12px;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    margin-left: 8px;
  }
`;

export const InputErrorMessage = styled.div`
  color: ${theme.colors.semantics.error};
  font-size: 14px;
  padding-left: 8px;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 12px;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 12px;
  }
`;
