import { ChangeEvent } from "react";
import TextInput from "./text";



export interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: string | Date) => void;
    placeholder?: string;
  }

export const decorateInput = (args: any) => {
  return {
    string: <TextInput {...args}></TextInput>,
  };
};
