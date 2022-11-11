import React from "react";

import InternalInput, { InputProps } from "./Input";
import Password from "./Password";
import TextArea from "./TextArea";

export type { InputProps } from "./Input";
export type { PasswordProps } from "./Password";
export type { TextAreaProps } from "./TextArea";

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  > {
  Password: typeof Password;
  TextArea: typeof TextArea;
}

const Input = InternalInput as CompoundedComponent;

Input.Password = Password;
Input.TextArea = TextArea;

export default Input;
