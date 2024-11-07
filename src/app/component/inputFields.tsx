import React from "react";
interface InputFieldsProps {
  label: string;
  name: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
  label,
  name,
  value,
  type,
  onChange,
}) => {
  return (
    <>
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          className="m-2 block rounded-md shadow-sm 
          focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-80 p-4 border-2 border-gray-700"
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputFields;
