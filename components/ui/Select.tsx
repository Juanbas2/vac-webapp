import React from 'react';
import { SelectProps } from '../../types';

const Select: React.FC<SelectProps> = ({ label, id, options, className, labelClassName, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium mb-1 ${labelClassName || 'text-gray-700'}`}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-6 bg-no-repeat bg-right-2 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236B7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M10%2012.586l-4.293-4.293a1%201%200%2010-1.414%201.414l5%205a1%201%200%20001.414%200l5-5a1%201%200%2000-1.414-1.414L10%2012.586z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.75rem_0.75rem] transition duration-150 ease-in-out ${className}`}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-white text-gray-800">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;