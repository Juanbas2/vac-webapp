
import React from 'react';
import { Order } from '../types';
import OrderItem from './OrderItem';

interface OrderListProps {
  orders: Order[];
  onRemoveOrder: (id: string) => void;
  onEditOrder: (order: Order) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onRemoveOrder, onEditOrder }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75S9.75 9.336 9.75 9.75zm4.5 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z" />
        </svg>
        <p className="text-gray-600 text-lg">Aún no hay pedidos. ¡Añade algunos usando el formulario de arriba!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {orders.map(order => (
        <OrderItem 
          key={order.id} 
          order={order} 
          onRemoveOrder={onRemoveOrder}
          onEditOrder={onEditOrder} 
        />
      ))}
    </ul>
  );
};

export default OrderList;
