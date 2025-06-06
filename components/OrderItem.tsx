
import React, { useState } from 'react';
import { Order, ShippingZone } from '../types';
import Button from './ui/Button';
import { openOrderPrintView } from '../lib/printOrder'; 
import { SECONDARY_COLOR_NONE_VALUE, AVAILABLE_SHIPPING_ZONES } from '../constants';

interface OrderItemProps {
  order: Order;
  onRemoveOrder: (id: string) => void;
  onEditOrder: (order: Order) => void;
}

const getShippingZoneLabel = (zoneValue: ShippingZone): string => {
  const zone = AVAILABLE_SHIPPING_ZONES.find(z => z.value === zoneValue);
  return zone ? zone.label.split(' (')[0] : zoneValue; // Get base label like "España"
};


const OrderItem: React.FC<OrderItemProps> = ({ order, onRemoveOrder, onEditOrder }) => {
  const [isProcessingPrint, setIsProcessingPrint] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handlePrintTicket = () => {
    if (isConfirmingDelete) {
      setIsConfirmingDelete(false); 
    }
    setIsProcessingPrint(true);
    try {
      openOrderPrintView(order);
    } catch (error) {
      console.error("Error al abrir la vista de impresión:", error);
      alert("Hubo un error al preparar el ticket para impresión. Por favor, inténtalo de nuevo.");
    } finally {
      setIsProcessingPrint(false);
    }
  };

  const handleEditClick = () => {
    if (isConfirmingDelete) {
      setIsConfirmingDelete(false); 
    }
    onEditOrder(order);
  };

  const handleDeleteClick = () => {
    if (isConfirmingDelete) {
      onRemoveOrder(order.id);
      setIsConfirmingDelete(false); 
    } else {
      setIsConfirmingDelete(true);
    }
  };

  const shippingZoneLabel = getShippingZoneLabel(order.shippingZone);

  return (
    <li className="bg-white p-5 rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-150 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
        <div className="flex-grow mb-3 sm:mb-0">
          <h3 className="text-xl font-semibold text-[#0B192E]"> 
            Pedido para: <span className="text-[#0B192E]">{order.customerName}</span> 
          </h3>
          <p className="text-gray-600 text-sm">
            Vendedor: <span className="font-medium text-gray-700">{order.seller}</span>
          </p>
          <p className="text-gray-600 text-sm">
            Zona de Envío: <span className="font-medium text-gray-700">{shippingZoneLabel}</span>
          </p>
          <p className="text-gray-500 text-sm">
            Total Pedido: <span className="font-semibold text-gray-700">{order.totalOrderPrice.toFixed(2)} €</span>
          </p>
          <p className="text-xs text-gray-500 pt-1">
            Pedido Realizado: {new Date(order.timestamp).toLocaleString('es-ES')}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-3 sm:mt-0 sm:ml-auto">
          <Button
            onClick={handlePrintTicket}
            variant="secondary" 
            size="sm"
            aria-label={`Imprimir ticket del pedido para ${order.customerName}`}
            className="w-full sm:w-auto" 
            disabled={isProcessingPrint} 
          >
            {isProcessingPrint ? (
              <svg className="animate-spin h-4 w-4 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a8.518 8.518 0 01-1.586-.957L4.5 14.5M4.5 14.5v5.25A2.25 2.25 0 006.75 22h10.5A2.25 2.25 0 0019.5 19.75V14.5M4.5 14.5L6.75 12h10.5l2.25 2.5M19.5 14.5v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5A3.375 3.375 0 0010.125 2H8.25M19.5 14.5M16.5 18h.008v.008H16.5V18zm-3 0h.008v.008H13.5V18zm-3 0h.008v.008H10.5V18z" />
              </svg>
            )}
            Imprimir Ticket
          </Button>
          <Button
            onClick={handleEditClick}
            variant="primary" 
            size="sm"
            aria-label={`Editar pedido para ${order.customerName}`}
            className="w-full sm:w-auto" 
            disabled={isProcessingPrint} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Editar
          </Button>
          <Button
            onClick={handleDeleteClick}
            variant="danger" 
            size="sm"
            aria-label={isConfirmingDelete ? `Confirmar eliminación del pedido para ${order.customerName}` : `Eliminar pedido para ${order.customerName}`}
            className={`w-full sm:w-auto ${isConfirmingDelete ? 'bg-red-700 hover:bg-red-800' : ''}`}
            disabled={isProcessingPrint} 
          >
            {isConfirmingDelete ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.096m-3.22-.096L3.75 5.79m0 0L3.03 4.227A1.5 1.5 0 014.25 3h15.5A1.5 1.5 0 0121.227 4.227l-.722 1.561m-16.5 0a48.108 48.108 0 013.478-.397m12.56 0c-1.153 0-2.24-.032-3.22-.096m3.22-.096L19.25 5.79m0 0l.722-1.561A1.5 1.5 0 0018.75 3H5.25A1.5 1.5 0 003.527 4.227l.722 1.561" />
              </svg>
            )}
            {isConfirmingDelete ? 'Confirmar Eliminar' : 'Eliminar'}
          </Button>
        </div>
      </div>

      {order.subOrders.length > 0 ? (
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Artículos:</h4>
          <ul className="space-y-2 pl-2 sm:pl-4">
            {order.subOrders.map((subItem) => (
              <li key={subItem.id} className="text-sm p-3 bg-gray-50 rounded-md border border-gray-200">
                <p className="font-medium text-gray-800">
                  {subItem.producto} - <span className="text-gray-600">Cantidad:</span> {subItem.quantity}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="text-gray-500">Diseño:</span> {subItem.diseno}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="text-gray-500">Color Principal:</span> {subItem.color}
                  {subItem.secondaryColor && subItem.secondaryColor !== SECONDARY_COLOR_NONE_VALUE && (
                    <>, <span className="text-gray-500">Color Secundario:</span> {subItem.secondaryColor}</>
                  )}
                </p>
                <p className="text-xs text-gray-600">
                  {subItem.extraOro && <><span className="text-gray-500">Extra Oro:</span> Sí</>}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  <span className="text-gray-500">Precio Unitario:</span> {subItem.unitPrice.toFixed(2)} €
                </p>
                <p className="text-xs text-gray-600">
                  <span className="text-gray-500">Precio Total Artículo:</span> {subItem.totalItemPrice.toFixed(2)} €
                </p>
                {subItem.observaciones && (
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium text-gray-600">Observaciones:</span> {subItem.observaciones}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm border-t border-gray-200 pt-4">No hay artículos en este pedido.</p>
      )}
    </li>
  );
};

export default OrderItem;
