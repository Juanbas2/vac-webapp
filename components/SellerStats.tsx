import React from 'react';
import { Order } from '../types';
import { AVAILABLE_SELLERS } from '../constants';

interface SellerStatsProps {
  orders: Order[];
}

interface SellerData {
  count: number;
  totalSales: number;
}
interface SellerStatsData {
  [sellerName: string]: SellerData;
}

const SellerStats: React.FC<SellerStatsProps> = ({ orders }) => {
  const sellerData = AVAILABLE_SELLERS.reduce<SellerStatsData>((acc, sellerOption) => {
    acc[sellerOption.value] = { count: 0, totalSales: 0 };
    return acc;
  }, {});

  let overallTotalSales = 0;

  orders.forEach(order => {
    if (sellerData.hasOwnProperty(order.seller)) {
      sellerData[order.seller].count++;
      sellerData[order.seller].totalSales += order.totalOrderPrice;
    }
    overallTotalSales += order.totalOrderPrice;
  });

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-700">Rendimiento del Vendedor</h2>
      {AVAILABLE_SELLERS.length > 0 ? (
        <ul className="space-y-3 flex-grow">
          {AVAILABLE_SELLERS.map(sellerOption => (
            <li 
              key={sellerOption.value} 
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-white rounded-md shadow-sm border border-gray-200"
              aria-label={`${sellerOption.label} tiene ${sellerData[sellerOption.value].count} pedidos, totalizando ${sellerData[sellerOption.value].totalSales.toFixed(2)} €`}
            >
              <span className="text-gray-700 font-medium mb-1 sm:mb-0">{sellerOption.label}:</span>
              <div className="text-right sm:text-left">
                <span className="font-semibold text-[#0B192E] text-lg block sm:inline">
                  {sellerData[sellerOption.value].count} pedidos
                </span>
                <span className="font-semibold text-green-600 text-md block sm:inline sm:ml-2">
                  ({sellerData[sellerOption.value].totalSales.toFixed(2)} €)
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">No hay vendedores configurados. Añade vendedores en las constantes para ver estadísticas.</p>
      )}
      <div className="mt-6 pt-4 border-t border-gray-300">
        <p className="text-xl font-bold text-center text-gray-800">
          Total Ventas Globales: 
          <span className="text-green-700 ml-2">{overallTotalSales.toFixed(2)} €</span>
        </p>
      </div>
       <p className="text-xs text-gray-500 mt-4 text-center">
        El recuento y total de pedidos se actualiza automáticamente.
      </p>
    </div>
  );
};

export default SellerStats;
