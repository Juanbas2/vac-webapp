

import React, { useState, useEffect, useCallback } from 'react';
import { Order, ProductDiseno, SubOrder, ShippingZone } from '../../types'; 
import { 
  AVAILABLE_DISENOS,      
  AVAILABLE_PRODUCTOS,    
  AVAILABLE_COLORS,
  AVAILABLE_SECONDARY_COLORS,
  AVAILABLE_SHIPPING_ZONES,
  PRODUCTO_PLACEHOLDER_VALUE, 
  DISENO_PLACEHOLDER_VALUE,   
  COLOR_PLACEHOLDER_VALUE,
  SECONDARY_COLOR_NONE_VALUE,
  DEFAULT_SHIPPING_ZONE,
  SHIPPING_ZONE_PLACEHOLDER_VALUE
} from '../../constants'; 
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { getUnitPrice } from '../../pricing';

interface OrderFormProps {
  onSubmitOrder: (customerName: string, shippingZone: ShippingZone, subOrders: Omit<SubOrder, 'id'>[], orderId?: string) => void;
  disabled?: boolean; 
  orderToEdit?: Order | null;
  onCancelEdit?: () => void;
}

interface FormSubOrderItem extends Omit<SubOrder, 'id' | 'secondaryColor' | 'producto' | 'diseno'> {
  tempId: string;
  producto: string; 
  diseno: ProductDiseno | typeof DISENO_PLACEHOLDER_VALUE; 
  secondaryColor?: string;
}


const OrderForm: React.FC<OrderFormProps> = ({ onSubmitOrder, disabled, orderToEdit, onCancelEdit }) => {
  const [customerName, setCustomerName] = useState('');
  const [currentShippingZone, setCurrentShippingZone] = useState<ShippingZone>(DEFAULT_SHIPPING_ZONE);
  
  const [currentProducto, setCurrentProducto] = useState(PRODUCTO_PLACEHOLDER_VALUE);
  const [currentDiseno, setCurrentDiseno] = useState<ProductDiseno | typeof DISENO_PLACEHOLDER_VALUE>(DISENO_PLACEHOLDER_VALUE);
  const [currentColor, setCurrentColor] = useState(COLOR_PLACEHOLDER_VALUE);
  const [currentSecondaryColor, setCurrentSecondaryColor] = useState(SECONDARY_COLOR_NONE_VALUE);
  const [currentExtraOro, setCurrentExtraOro] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState<string>('0'); 
  const [currentObservaciones, setCurrentObservaciones] = useState('');

  const [currentUnitPrice, setCurrentUnitPrice] = useState(0);
  const [currentTotalItemPrice, setCurrentTotalItemPrice] = useState(0);

  const [subOrders, setSubOrders] = useState<FormSubOrderItem[]>([]);
  const [currentOrderTotal, setCurrentOrderTotal] = useState(0);
  
  const [error, setError] = useState('');
  const [itemError, setItemError] = useState('');

  const [editingSubOrderItemTempId, setEditingSubOrderItemTempId] = useState<string | null>(null);
  const orderFormRef = React.useRef<HTMLFormElement>(null); 


  const resetItemFields = useCallback(() => {
    setCurrentProducto(PRODUCTO_PLACEHOLDER_VALUE); 
    setCurrentDiseno(DISENO_PLACEHOLDER_VALUE);     
    setCurrentColor(COLOR_PLACEHOLDER_VALUE);
    setCurrentSecondaryColor(SECONDARY_COLOR_NONE_VALUE);
    setCurrentExtraOro(false);
    setCurrentQuantity('0');
    setCurrentObservaciones('');
    setCurrentUnitPrice(0);
    setCurrentTotalItemPrice(0);
    setItemError('');
    setEditingSubOrderItemTempId(null); 
  }, []);

  const resetForm = useCallback(() => {
    setCustomerName('');
    setCurrentShippingZone(DEFAULT_SHIPPING_ZONE);
    setSubOrders([]);
    resetItemFields();
    setError('');
    setCurrentOrderTotal(0);
  }, [resetItemFields]);

  useEffect(() => {
    if (orderToEdit) {
      setCustomerName(orderToEdit.customerName);
      setCurrentShippingZone(orderToEdit.shippingZone || DEFAULT_SHIPPING_ZONE);
      const formSubOrders = orderToEdit.subOrders.map(so => {
        const { id, ...rest } = so; 
        return {
          ...rest,
          tempId: crypto.randomUUID(), 
          secondaryColor: rest.secondaryColor === undefined ? SECONDARY_COLOR_NONE_VALUE : rest.secondaryColor,
        };
      });
      setSubOrders(formSubOrders as FormSubOrderItem[]); 
      setError('');
      resetItemFields(); 
    } else {
      resetForm();
    }
  }, [orderToEdit, resetForm, resetItemFields]);


  useEffect(() => {
    const unitPrice = getUnitPrice(currentProducto, currentDiseno, currentExtraOro, currentShippingZone);
    setCurrentUnitPrice(unitPrice);
  }, [currentProducto, currentDiseno, currentExtraOro, currentShippingZone]);

  useEffect(() => {
    const quantityNum = parseInt(currentQuantity, 10);
    if (!isNaN(quantityNum) && quantityNum > 0 && currentUnitPrice >= 0) {
      setCurrentTotalItemPrice(parseFloat((currentUnitPrice * quantityNum).toFixed(2)));
    } else {
      setCurrentTotalItemPrice(0);
    }
  }, [currentQuantity, currentUnitPrice]);

  useEffect(() => {
    const total = subOrders.reduce((sum, item) => sum + item.totalItemPrice, 0);
    setCurrentOrderTotal(parseFloat(total.toFixed(2)));
  }, [subOrders]);


  const handleItemAction = () => {
    setItemError('');
    const quantityNum = parseInt(currentQuantity, 10);

    if (currentProducto === PRODUCTO_PLACEHOLDER_VALUE) { 
      setItemError('Por favor, selecciona un Producto.'); 
      return;
    }
    if ((currentDiseno as string) === DISENO_PLACEHOLDER_VALUE) { 
      setItemError('Por favor, selecciona un Diseño.'); 
      return;
    }
    if (currentColor === COLOR_PLACEHOLDER_VALUE) {
      setItemError('Por favor, selecciona un Color Principal.');
      return;
    }
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setItemError('La cantidad debe ser un número positivo mayor que cero.');
      return;
    }
     if (currentUnitPrice < 0 ) { 
        setItemError('Error en el precio del artículo. Verifica las opciones.');
        return;
    }
    
    const currentItemData = { 
      producto: currentProducto,  
      diseno: currentDiseno as ProductDiseno, 
      color: currentColor, 
      secondaryColor: currentSecondaryColor === SECONDARY_COLOR_NONE_VALUE ? undefined : currentSecondaryColor,
      extraOro: currentExtraOro,
      quantity: quantityNum,
      unitPrice: currentUnitPrice,
      totalItemPrice: currentTotalItemPrice,
      observaciones: currentObservaciones.trim() || undefined
    };

    if (editingSubOrderItemTempId) { 
      setSubOrders(prev => 
        prev.map(item => 
          item.tempId === editingSubOrderItemTempId 
            ? { ...item, ...currentItemData } 
            : item
        )
      );
    } else { 
      const subOrderToAdd: FormSubOrderItem = { 
        ...currentItemData,
        tempId: crypto.randomUUID(),
      };
      setSubOrders(prev => [...prev, subOrderToAdd]);
    }
    resetItemFields();
  };

  const handleEditSubOrderItemClick = (tempId: string) => {
    const itemToEdit = subOrders.find(item => item.tempId === tempId);
    if (itemToEdit) {
      setCurrentProducto(itemToEdit.producto); 
      setCurrentDiseno(itemToEdit.diseno);     
      setCurrentColor(itemToEdit.color);
      setCurrentSecondaryColor(itemToEdit.secondaryColor || SECONDARY_COLOR_NONE_VALUE);
      setCurrentExtraOro(itemToEdit.extraOro);
      setCurrentQuantity(String(itemToEdit.quantity));
      setCurrentObservaciones(itemToEdit.observaciones || '');
      setEditingSubOrderItemTempId(tempId);
      setItemError(''); 
      if (orderFormRef.current) { 
        const itemFormSection = orderFormRef.current.querySelector('#item-form-section');
        if (itemFormSection) {
          itemFormSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  };
  

  const handleRemoveSubOrder = (tempIdToRemove: string) => {
    setSubOrders(prev => prev.filter(item => item.tempId !== tempIdToRemove));
    if (editingSubOrderItemTempId === tempIdToRemove) {
      resetItemFields();
    }
  };

  const handleSubmitMainOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (disabled && !orderToEdit) {
      setError('Por favor, selecciona un vendedor antes de realizar el pedido.');
      return;
    }
    if (!customerName.trim()) {
      setError('El nombre del cliente no puede estar vacío.');
      return;
    }
    if (!currentShippingZone || currentShippingZone === (SHIPPING_ZONE_PLACEHOLDER_VALUE as any) ) { // Check against placeholder if used
      setError('Por favor, selecciona una Zona de Envío.');
      return;
    }
    if (subOrders.length === 0) {
      setError('Por favor, añade al menos un artículo al pedido.');
      return;
    }
    
    const subOrdersToSubmit = subOrders.map(so => {
      const { tempId, ...rest } = so; 
      return { 
        producto: rest.producto,
        diseno: rest.diseno as ProductDiseno, 
        color: rest.color,
        secondaryColor: rest.secondaryColor === SECONDARY_COLOR_NONE_VALUE ? undefined : rest.secondaryColor,
        extraOro: rest.extraOro,
        quantity: rest.quantity,
        unitPrice: rest.unitPrice,
        totalItemPrice: rest.totalItemPrice,
        observaciones: rest.observaciones,
      };
    });
    
    onSubmitOrder(customerName, currentShippingZone, subOrdersToSubmit, orderToEdit ? orderToEdit.id : undefined);
    
    if (!orderToEdit) { 
        resetForm();
    }
  };

  const handleIncrementQuantity = () => {
    const val = parseInt(currentQuantity, 10) || 0;
    setCurrentQuantity(String(val + 1));
  };

  const handleDecrementQuantity = () => {
    const val = parseInt(currentQuantity, 10) || 0;
    if (val > 0) {
      setCurrentQuantity(String(val - 1));
    }
  };
  
  const actualDisabledState = disabled && !orderToEdit;

  const quantityValue = parseInt(currentQuantity, 10);
  const isItemActionButtonEffectivelyDisabled = 
    actualDisabledState || 
    currentProducto === PRODUCTO_PLACEHOLDER_VALUE || 
    (currentDiseno as string) === DISENO_PLACEHOLDER_VALUE || 
    currentColor === COLOR_PLACEHOLDER_VALUE || 
    isNaN(quantityValue) || 
    quantityValue <= 0 ||
    (currentUnitPrice < 0 && (currentProducto !== PRODUCTO_PLACEHOLDER_VALUE && (currentDiseno as string) !== DISENO_PLACEHOLDER_VALUE && currentColor !== COLOR_PLACEHOLDER_VALUE));

  return (
    <form onSubmit={handleSubmitMainOrder} className="space-y-8" ref={orderFormRef}>
      {error && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md border border-red-200">{error}</p>}
      
      <Input
        label="Nombre del Cliente"
        id="customerName"
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Ej: María Pérez"
        required
        aria-required="true"
        disabled={actualDisabledState}
      />

      <Select
        label="Zona de Envío"
        id="shippingZone"
        options={AVAILABLE_SHIPPING_ZONES as { value: string; label: string }[]} // Cast for SelectProps
        value={currentShippingZone}
        onChange={(e) => setCurrentShippingZone(e.target.value as ShippingZone)}
        disabled={actualDisabledState}
        required
        aria-required="true"
      />


      <div id="item-form-section" className="border border-gray-200 rounded-lg p-6 space-y-6 bg-gray-50 shadow-sm">
        <h3 className="text-xl font-semibold text-[#0B192E] mb-4">
          {editingSubOrderItemTempId ? 'Modificar Artículo' : 'Añadir Artículo al Pedido'}
        </h3>
        {itemError && <p className="text-red-600 text-sm bg-red-100 p-3 rounded-md border border-red-200 -mt-2 mb-4">{itemError}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Select
            label="Producto" 
            id="itemProducto" 
            options={AVAILABLE_PRODUCTOS} 
            value={currentProducto} 
            onChange={(e) => setCurrentProducto(e.target.value)} 
            disabled={actualDisabledState}
            aria-required="true"
          />
          <Select
            label="Diseño" 
            id="itemDiseno" 
            options={AVAILABLE_DISENOS} 
            value={currentDiseno} 
            onChange={(e) => setCurrentDiseno(e.target.value as ProductDiseno | typeof DISENO_PLACEHOLDER_VALUE)} 
            disabled={actualDisabledState}
            aria-required="true"
          />
          <Select
            label="Color principal"
            id="itemColor"
            options={AVAILABLE_COLORS}
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            disabled={actualDisabledState}
            aria-required="true"
          />
          <Select
            label="Color Secundario"
            id="itemSecondaryColor"
            options={AVAILABLE_SECONDARY_COLORS}
            value={currentSecondaryColor}
            onChange={(e) => setCurrentSecondaryColor(e.target.value)}
            disabled={actualDisabledState}
          />
          <div className="flex items-center md:col-span-2">
            <input
                id="itemExtraOro"
                type="checkbox"
                checked={currentExtraOro}
                onChange={(e) => setCurrentExtraOro(e.target.checked)}
                disabled={actualDisabledState}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 shadow-sm"
            />
            <label htmlFor="itemExtraOro" className="ml-2 block text-sm font-medium text-gray-700">
                Extra Oro
            </label>
          </div>
           <Input
            label="Cantidad"
            id="itemQuantity"
            type="number"
            value={currentQuantity}
            onChange={(e) => setCurrentQuantity(e.target.value)}
            min="0" 
            placeholder="Ej: 1"
            disabled={actualDisabledState}
            aria-required="true"
            showSteppers={true}
            onIncrement={handleIncrementQuantity}
            onDecrement={handleDecrementQuantity}
            containerClassName="md:col-span-2" 
          />
          <Input
            label="Observaciones (opcional)"
            id="itemObservaciones"
            type="text"
            value={currentObservaciones}
            onChange={(e) => setCurrentObservaciones(e.target.value)}
            placeholder="Ej: Envolver para regalo"
            disabled={actualDisabledState}
            containerClassName="md:col-span-2"
          />

          {(currentUnitPrice > 0 || currentTotalItemPrice > 0 || (currentQuantity !== '0' && currentUnitPrice === 0)) && ( 
            <div className="md:col-span-2 mt-1 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                Precio Unitario: <span className="font-semibold">{currentUnitPrice.toFixed(2)} €</span>
              </p>
              {currentTotalItemPrice >= 0 && currentQuantity !== '0' && ( 
                <p className="text-sm text-blue-700 mt-1">
                  Precio Total Artículo: <span className="font-semibold">{currentTotalItemPrice.toFixed(2)} €</span>
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Button 
              type="button" 
              onClick={handleItemAction} 
              variant="secondary" 
              className={`w-full ${ 
                !isItemActionButtonEffectivelyDisabled 
                  ? editingSubOrderItemTempId 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-500 focus:ring-blue-400' 
                    : 'bg-gray-500 hover:bg-gray-600 text-white border-gray-500 focus:ring-gray-500' 
                  : '' 
              }`}
              disabled={isItemActionButtonEffectivelyDisabled}
              aria-disabled={isItemActionButtonEffectivelyDisabled}
              aria-label={editingSubOrderItemTempId ? "Actualizar artículo en el pedido" : "Añadir artículo al pedido actual"}
            >
              {editingSubOrderItemTempId ? 'Actualizar Artículo' : '+ Añadir Artículo'}
            </Button>
            {editingSubOrderItemTempId && (
                <Button
                    type="button"
                    onClick={resetItemFields} 
                    variant="secondary"
                    className="w-full sm:w-auto"
                    aria-label="Cancelar edición de artículo"
                >
                    Cancelar Edición Artículo
                </Button>
            )}
        </div>
      </div>

      {subOrders.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Artículos en este Pedido:</h3>
          <ul className="space-y-3 max-h-72 overflow-y-auto bg-gray-50 p-4 rounded-md border border-gray-200">
            {subOrders.map((item) => (
              <li key={item.tempId} className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-medium text-gray-800">{item.producto} ({item.quantity})</p> 
                        <p className="text-sm text-gray-600">
                            Diseño: {item.diseno}, Color Principal: {item.color} 
                            {item.secondaryColor && item.secondaryColor !== SECONDARY_COLOR_NONE_VALUE ? `, Color Secundario: ${item.secondaryColor}` : ""}
                            {item.extraOro ? ", Extra Oro: Sí" : ""}
                        </p>
                        <p className="text-xs text-gray-500">
                            Precio: {item.unitPrice.toFixed(2)} €/ud. - Total: {item.totalItemPrice.toFixed(2)} €
                        </p>
                        {item.observaciones && <p className="text-xs text-gray-500 mt-1">Observaciones: {item.observaciones}</p>}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 ml-2 self-start">
                        <Button 
                          type="button" 
                          onClick={() => handleEditSubOrderItemClick(item.tempId)} 
                          variant="secondary" 
                          size="sm"
                          aria-label={`Editar ${item.producto}`} 
                          disabled={actualDisabledState}
                          className="text-xs px-2 py-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 border-yellow-400 focus:ring-yellow-300"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1 inline">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L16.862 4.487" />
                            </svg>
                            Editar
                        </Button>
                        <Button 
                          type="button" 
                          onClick={() => handleRemoveSubOrder(item.tempId)} 
                          variant="danger" 
                          size="sm"
                          aria-label={`Eliminar ${item.producto} del pedido`} 
                          disabled={actualDisabledState}
                          className="text-xs px-2 py-1"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1 inline">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.096m-3.22-.096L3.75 5.79m0 0L3.03 4.227A1.5 1.5 0 014.25 3h15.5A1.5 1.5 0 0121.227 4.227l-.722 1.561m-16.5 0a48.108 48.108 0 013.478-.397m12.56 0c-1.153 0-2.24-.032-3.22-.096m3.22-.096L19.25 5.79m0 0l.722-1.561A1.5 1.5 0 0018.75 3H5.25A1.5 1.5 0 003.527 4.227l.722 1.561" />
                            </svg>
                            Eliminar
                        </Button>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {subOrders.length > 0 && (
        <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg text-center">
          <p className="text-lg font-semibold text-blue-800">
            Total Pedido Actual: <span className="text-xl">{currentOrderTotal.toFixed(2)} €</span>
          </p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 !mt-6">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="w-full"
          disabled={actualDisabledState || subOrders.length === 0 || !customerName.trim() || !currentShippingZone || currentShippingZone === (SHIPPING_ZONE_PLACEHOLDER_VALUE as any)}
          aria-label={orderToEdit ? "Actualizar pedido completo" : "Realizar pedido completo"}
        >
          {orderToEdit ? 'Actualizar Pedido' : 'Realizar Pedido Completo'}
        </Button>
        {orderToEdit && onCancelEdit && (
          <Button 
            type="button" 
            onClick={() => {
                if(onCancelEdit) onCancelEdit();
                resetForm(); // Use resetForm to ensure shipping zone also resets
            }}
            variant="secondary" 
            size="lg" 
            className="w-full sm:w-auto"
            aria-label="Cancelar edición del pedido"
          >
            Cancelar Edición
          </Button>
        )}
      </div>
    </form>
  );
};

export default OrderForm;