import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const FormField = ({ label, id, ...props }: FormFieldProps) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-black mb-1 text-sm font-medium">
      {label}
    </label>
    <input
      id={id}
      {...props}
      value={props.value || ""}
      className={`p-2 border border-gray-300 rounded text-black ${
        props.readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);
