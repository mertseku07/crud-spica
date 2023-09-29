import React from 'react';

import { InputProps } from '.';

export interface TextProps extends Omit<InputProps, "onChange"|"value"> {
    onChange: (e: any) => void;
    value: any
  }

const TextInput: React.FC<TextProps> = ({ label, name, value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
            {label}
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            name={name}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      );
}

export default TextInput;
