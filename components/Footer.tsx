import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-4xl py-8 mt-12 text-center border-t border-gray-700"> {/* Changed border-gray-200 to border-gray-700 */}
      <p className="text-sm text-gray-300"> {/* Changed text-gray-500 to text-gray-300 */}
        &copy; 2025 Alvaro Bascones The Best SA. Todos los derechos reservados.
      </p>
    </footer>
  );
};