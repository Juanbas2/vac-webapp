import React from 'react';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-[#0B192E] hover:bg-[#09162A] text-white focus:ring-[#0B192E]"; // Changed from blue to #0B192E theme
      break;
    case 'secondary':
      variantStyles = "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400 border border-gray-300";
      break;
    case 'danger':
      variantStyles = "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500";
      break;
    case 'ghost':
      variantStyles = "bg-transparent hover:bg-blue-50 text-blue-600 hover:text-blue-700 focus:ring-blue-400 shadow-none hover:shadow-none";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-3 py-1.5 text-sm";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-base";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-lg";
      break;
    case 'icon':
      sizeStyles = "p-2"; // For buttons that primarily contain an icon
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;