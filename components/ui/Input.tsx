
import React from 'react';
import { InputProps } from '../../types';

const Input: React.FC<InputProps> = ({ 
  label, 
  id, 
  className, 
  type, 
  showSteppers, 
  onIncrement, 
  onDecrement,
  containerClassName, 
  ...props 
}) => {
  const commonInputProps = {
    id,
    type,
    ...props,
  };

  const inputElement = (showSteppers && type === 'number') ? (
    <div className={`flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 overflow-hidden ${props.disabled ? 'bg-gray-100' : 'bg-white'}`}>
      <button
        type="button"
        onClick={onDecrement}
        disabled={props.disabled || (parseInt(String(props.value), 10) <= (props.min ? parseInt(String(props.min), 10) : 0))}
        className="px-3 py-2.5 text-gray-700 hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Disminuir cantidad"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
      </button>
      <input
        {...commonInputProps}
        className={`w-full flex-grow px-1 py-2.5 text-center text-gray-800 border-x border-gray-300 focus:ring-0 focus:border-transparent placeholder-gray-400 transition duration-150 ease-in-out no-number-spinners ${className || ''} ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
        style={{ MozAppearance: 'textfield' }} // For Firefox
      />
      <button
        type="button"
        onClick={onIncrement}
        disabled={props.disabled}
        className="px-3 py-2.5 text-gray-700 hover:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar cantidad"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      </button>
    </div>
  ) : (
    <input
      {...commonInputProps}
      className={`w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition duration-150 ease-in-out ${className || ''}`}
    />
  );

  return (
    <div className={`w-full ${containerClassName || ''}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      {inputElement}
    </div>
  );
};

export default Input;