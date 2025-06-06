
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl py-8 mb-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-4"> {/* Changed to flex-col and added space-y */}
        <img 
          src="https://i.pinimg.com/280x280_RS/70/e8/df/70e8dff4cb2095ff63869b5c36072486.jpg"
          alt="VAC Logo"
          className="h-32 w-auto object-contain mb-4" // Increased size (was h-20 w-20) and added bottom margin
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-50"> {/* Changed text-gray-800 to text-gray-50 */}
          VAC: Pedidos Maison&Objet
        </h1>
      </div>
      <p className="mt-3 text-lg text-gray-200"> {/* Changed text-gray-600 to text-gray-200 */}
        Los Vasos de Agua Clara
      </p>
    </header>
  );
};