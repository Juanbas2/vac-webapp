
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Order, ProductDiseno, SubOrder, ShippingZone } from './types'; 
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import SellerStats from './components/SellerStats';
import Select from './components/ui/Select';
import Button from './components/ui/Button';
import { 
  AVAILABLE_SELLERS, 
  PRODUCTO_PLACEHOLDER_VALUE, 
  DISENO_PLACEHOLDER_VALUE, 
  COLOR_PLACEHOLDER_VALUE, 
  SECONDARY_COLOR_NONE_VALUE,
  DEFAULT_SHIPPING_ZONE
} from './constants'; 
import { getUnitPrice } from './pricing'; 

const LOCAL_STORAGE_KEY = 'popupshop_orders';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => {
          let cumulativeOrderPrice = 0;
          const shippingZone = order.shippingZone || DEFAULT_SHIPPING_ZONE; // Migration for shippingZone

          const migratedSubOrders = order.subOrders.map((so: any) => {
            const { size, unitPrice: oldUnitPrice, totalItemPrice: oldTotalItemPrice, productType: oldProductType, dibujo: oldDibujo, ...restOfSubOrder } = so;
            
            const producto = oldProductType || so.producto || PRODUCTO_PLACEHOLDER_VALUE;

            let disenoValue = oldDibujo || so.diseno || size || DISENO_PLACEHOLDER_VALUE;
            let diseno: ProductDiseno | typeof DISENO_PLACEHOLDER_VALUE;
            if (Object.values(ProductDiseno).includes(disenoValue as ProductDiseno)) {
              diseno = disenoValue as ProductDiseno;
            } else {
              diseno = DISENO_PLACEHOLDER_VALUE as typeof DISENO_PLACEHOLDER_VALUE;
            }

            const color = restOfSubOrder.color || COLOR_PLACEHOLDER_VALUE;
            const secondaryColor = restOfSubOrder.secondaryColor === undefined || restOfSubOrder.secondaryColor === null ? SECONDARY_COLOR_NONE_VALUE : restOfSubOrder.secondaryColor;
            const extraOro = typeof so.extraOro === 'boolean' ? so.extraOro : false;
            const quantity = parseInt(String(restOfSubOrder.quantity), 10) || 1;

            let unitPrice = oldUnitPrice;
            let totalItemPrice = oldTotalItemPrice;

            // Recalculate price using new logic if old prices are invalid or if shipping zone affects it
            // The getUnitPrice now depends on shippingZone, so prices might need re-evaluation if old orders are loaded
            // For simplicity, we'll trust old prices unless they are clearly invalid.
            // A more robust migration would re-calculate all prices based on stored shippingZone or default.
            if (typeof unitPrice !== 'number' || typeof totalItemPrice !== 'number' || isNaN(unitPrice) || isNaN(totalItemPrice)) {
              unitPrice = getUnitPrice(producto, diseno, extraOro, shippingZone); 
              totalItemPrice = parseFloat((unitPrice * quantity).toFixed(2));
            }
            
            cumulativeOrderPrice += totalItemPrice;

            return {
              ...restOfSubOrder,
              id: restOfSubOrder.id || crypto.randomUUID(),
              producto, 
              diseno,   
              color,
              secondaryColor: secondaryColor === SECONDARY_COLOR_NONE_VALUE ? undefined : secondaryColor,
              extraOro,
              observaciones: so.observaciones || '',
              unitPrice: parseFloat(unitPrice.toFixed(2)),
              totalItemPrice: parseFloat(totalItemPrice.toFixed(2)),
              quantity
            };
          });
          
          const totalOrderPrice = parseFloat(order.totalOrderPrice?.toFixed(2) || cumulativeOrderPrice.toFixed(2));

          return {
            ...order,
            shippingZone, // Ensure shippingZone is part of the order
            timestamp: new Date(order.timestamp),
            subOrders: migratedSubOrders,
            totalOrderPrice: isNaN(totalOrderPrice) ? 0 : totalOrderPrice,
          };
        });
        return parsedOrders;
      }
    } catch (error) {
      console.error("Failed to load orders from localStorage:", error);
    }
    return [];
  });

  const [currentSeller, setCurrentSeller] = useState<string>(AVAILABLE_SELLERS[0]?.value || '');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const orderFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error("Error al guardar pedidos en localStorage:", error);
    }
  }, [orders]);

  const handleSetEditingOrder = useCallback((order: Order | null) => {
    setEditingOrder(order);
    if (order && orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  
  const handleSubmitOrder = useCallback((customerName: string, shippingZone: ShippingZone, subOrdersFromForm: Omit<SubOrder, 'id'>[], orderIdToUpdate?: string) => {
    if (subOrdersFromForm.length === 0) {
      alert("No se puede guardar un pedido sin artículos. Por favor, añade al menos un artículo.");
      return;
    }

    const processedSubOrders: SubOrder[] = subOrdersFromForm.map(so => ({
      ...so,
      id: crypto.randomUUID(), 
      secondaryColor: so.secondaryColor === SECONDARY_COLOR_NONE_VALUE ? undefined : so.secondaryColor,
    }));

    const totalOrderPrice = processedSubOrders.reduce((sum, item) => sum + item.totalItemPrice, 0);

    if (orderIdToUpdate) { 
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderIdToUpdate 
            ? {
                ...order, 
                customerName,
                shippingZone,
                subOrders: processedSubOrders,
                totalOrderPrice: parseFloat(totalOrderPrice.toFixed(2)),
                timestamp: new Date(), 
              }
            : order
        )
      );
      handleSetEditingOrder(null); 
    } else { 
      if (!currentSeller) {
        alert("Por favor, selecciona un vendedor antes de añadir un pedido.");
        return;
      }
      const newOrder: Order = {
        id: crypto.randomUUID(),
        customerName,
        seller: currentSeller,
        shippingZone,
        subOrders: processedSubOrders,
        timestamp: new Date(),
        totalOrderPrice: parseFloat(totalOrderPrice.toFixed(2)),
      };
      setOrders(prevOrders => [newOrder, ...prevOrders]);
    }
  }, [currentSeller, handleSetEditingOrder]);

  const removeOrder = useCallback((orderId: string) => {
    if (editingOrder && editingOrder.id === orderId) {
      handleSetEditingOrder(null); 
    }
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  }, [editingOrder, handleSetEditingOrder]);

  const escapeCSVField = (field: string | number | Date | boolean | undefined): string => {
    if (field === undefined || field === null) {
        return '';
    }
    if (typeof field === 'boolean') {
      return field ? 'Sí' : 'No';
    }
    if (typeof field === 'number') {
      return field.toFixed(2); 
    }
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };
  
  const handleExportToCSV = useCallback(() => {
    if (orders.length === 0) {
      alert("No hay pedidos para exportar.");
      return;
    }

    const headers = [
      'ID Pedido', 'Nombre Cliente', 'Vendedor', 'Zona de Envío', 'Fecha Pedido', 'Precio Total Pedido (€)',
      'ID Artículo', 'Producto', 'Diseño', 'Color Principal', 'Color Secundario', 'Extra Oro', 'Cantidad', 'Precio Unitario (€)', 'Precio Total Artículo (€)', 'Observaciones'
    ];
    
    const rows = orders.flatMap(order => 
      order.subOrders.map(subOrder => [
        escapeCSVField(order.id),
        escapeCSVField(order.customerName),
        escapeCSVField(order.seller),
        escapeCSVField(order.shippingZone),
        escapeCSVField(order.timestamp.toISOString()),
        escapeCSVField(order.totalOrderPrice),
        escapeCSVField(subOrder.id),
        escapeCSVField(subOrder.producto),
        escapeCSVField(subOrder.diseno),  
        escapeCSVField(subOrder.color),
        escapeCSVField(subOrder.secondaryColor || ''),
        escapeCSVField(subOrder.extraOro),
        escapeCSVField(subOrder.quantity),
        escapeCSVField(subOrder.unitPrice),
        escapeCSVField(subOrder.totalItemPrice),
        escapeCSVField(subOrder.observaciones)
      ].join(','))
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); 
    const link = document.createElement('a');
    if (link.download !== undefined) { 
      const url = URL.createObjectURL(blob);
      const today = new Date().toISOString().slice(0,10); 
      link.setAttribute('href', url);
      link.setAttribute('download', `pedidos_maison_objet_${today}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("La exportación CSV no es compatible con este navegador.");
    }
  }, [orders]);

  const isFormEffectivelyDisabled = !editingOrder && !currentSeller;

  return (
    <div className="min-h-screen text-gray-200 flex flex-col items-center p-4 sm:p-8">
      
      <div className="w-full max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row justify-end items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-auto sm:max-w-xs">
        {AVAILABLE_SELLERS.length > 0 ? (
          <Select
            label="Vendedor Actual:"
            id="globalSeller"
            options={AVAILABLE_SELLERS}
            value={currentSeller}
            onChange={(e) => setCurrentSeller(e.target.value)}
            className="bg-white border-gray-300 text-gray-800"
            labelClassName="text-gray-200"
            aria-label="Seleccionar vendedor actual"
            disabled={!!editingOrder} 
          />
          ) : (
            <p className="text-sm text-gray-300">No hay vendedores disponibles. Por favor, configura los vendedores.</p>
          )}
        </div>
      </div>

      <Header />
      <main className="container mx-auto w-full max-w-4xl flex-grow">
        <div ref={orderFormRef} className="bg-white shadow-xl rounded-xl p-6 sm:p-10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-700">
            {editingOrder ? `Modificar Pedido de: ${editingOrder.customerName}` : "Añadir Nuevo Pedido"}
          </h2>
          <OrderForm 
            onSubmitOrder={handleSubmitOrder} 
            disabled={isFormEffectivelyDisabled} 
            orderToEdit={editingOrder}
            onCancelEdit={() => handleSetEditingOrder(null)}
          />
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10 mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-4 sm:mb-0">
              Pedidos Actuales ({orders.length})
            </h2>
            <Button
              onClick={handleExportToCSV}
              variant="secondary"
              size="md"
              disabled={orders.length === 0}
              aria-label="Exportar todos los pedidos a CSV"
              className="bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 border-green-600 disabled:bg-gray-300 disabled:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 inline-block">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Exportar Pedidos a CSV
            </Button>
          </div>
          <OrderList 
            orders={orders} 
            onRemoveOrder={removeOrder}
            onEditOrder={handleSetEditingOrder}
          />
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-10">
            <SellerStats orders={orders} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;