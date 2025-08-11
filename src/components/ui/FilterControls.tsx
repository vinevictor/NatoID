import React from "react";

interface FilterInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FilterInput = React.forwardRef<HTMLInputElement, FilterInputProps>(
  ({ id, label, ...props }, ref) => (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        type="text"
        {...props}
        className="w-full text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
);
FilterInput.displayName = "FilterInput";

interface FilterSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  defaultOption: string;
}

export const FilterSelect = React.forwardRef<
  HTMLSelectElement,
  FilterSelectProps
>(({ id, label, options, defaultOption, ...props }, ref) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      id={id}
      ref={ref}
      {...props}
      className="w-full text-black p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">{defaultOption}</option>
      {options.map(
        (opt, index) =>
          opt && (
            <option key={index} value={opt}>
              {opt}
            </option>
          )
      )}
    </select>
  </div>
));
FilterSelect.displayName = "FilterSelect";
