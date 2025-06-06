
import { Order, SubOrder, ShippingZone } from '../types';
import { SECONDARY_COLOR_NONE_VALUE, AVAILABLE_SHIPPING_ZONES } from '../constants';

const SHOP_LOGO_URL = "https://i.pinimg.com/280x280_RS/70/e8/df/70e8dff4cb2095ff63869b5c36072486.jpg";

const getShippingZoneLabelForPrint = (zoneValue: ShippingZone): string => {
  const zone = AVAILABLE_SHIPPING_ZONES.find(z => z.value === zoneValue);
  return zone ? zone.label : zoneValue; // Return full label e.g. "Europa (+10%)"
};

function getPrintStyles(): string {
  return `
    @media print {
      body {
        margin: 0;
        padding: 0;
        background-color: #ffffff;
        font-family: 'GFS Didot', serif, 'Helvetica', 'Arial', sans-serif;
        -webkit-print-color-adjust: exact; 
        color-adjust: exact; 
      }
      .print-ticket-container {
        margin: 0;
        padding: 10mm; 
        width: auto;
        box-shadow: none;
        border: none;
      }
      .print-header, .print-footer {
        text-align: center;
      }
      button { display: none !important; } 
       @page {
        size: A4 portrait;
        margin: 10mm; 
      }
    }
    body { 
      font-family: 'GFS Didot', serif, 'Helvetica', 'Arial', sans-serif; 
      margin: 0; 
      padding: 0; 
      background-color: #f8f9fa; 
      color: #333333; 
      display: flex;
      justify-content: center;
      align-items: flex-start; 
      min-height: 100vh;
    }
    .print-ticket-container { 
      width: 210mm; 
      min-height: 297mm; 
      padding: 15mm; 
      box-sizing: border-box; 
      background-color: white; 
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      margin-top: 20px; 
      margin-bottom: 20px; 
    }
    .print-header { text-align: center; margin-bottom: 10mm; }
    .print-header img { max-width: 50mm; max-height: 30mm; margin-bottom: 5mm; }
    .print-header h1 { font-size: 24pt; color: #0B192E; margin-bottom: 2mm; font-family: 'GFS Didot', serif; }
    .print-header p { font-size: 10pt; color: #555555; margin: 1mm 0; }
    .order-details { margin-bottom: 8mm; padding-bottom: 5mm; border-bottom: 1px solid #eeeeee; }
    .order-details p { font-size: 10pt; margin: 2mm 0; }
    .order-details strong { color: #0B192E; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 8mm; font-size: 9pt; }
    .items-table th, .items-table td { border: 1px solid #dddddd; text-align: left; padding: 3mm 2mm; }
    .items-table th { background-color: #f2f2f2; color: #0B192E; font-size: 10pt; }
    .items-table td.numeric { text-align: right; }
    .total-section { text-align: right; margin-top: 5mm; }
    .total-section p { font-size: 12pt; margin: 2mm 0; font-weight: bold; color: #0B192E; }
    .print-footer { text-align: center; font-size: 8pt; color: #777777; margin-top: 10mm; padding-top: 5mm; border-top: 1px solid #eeeeee;}
    .item-observaciones { font-size: 8pt; color: #444; padding-top: 1mm; }
    .print-button-bar { display: block; text-align: center; padding: 10px; background-color: #f0f0f0; border-top: 1px solid #ccc; position: sticky; top:0; z-index: 100; }
    @media screen { 
        .print-button-bar { display: block; }
    }
    @media print { 
        .print-button-bar { display: none !important; }
    }
  `;
}

function generatePrintableOrderHtml(order: Order): string {
  const subOrderRows = order.subOrders.map((item: SubOrder) => `
    <tr>
      <td>${item.producto}</td>
      <td>${item.diseno}</td>
      <td>${item.color}</td>
      <td>${item.secondaryColor && item.secondaryColor !== SECONDARY_COLOR_NONE_VALUE ? item.secondaryColor : 'N/A'}</td>
      <td>${item.extraOro ? 'Sí' : 'No'}</td>
      <td class="numeric">${item.quantity}</td>
      <td class="numeric">${item.unitPrice.toFixed(2)} €</td>
      <td class="numeric">${item.totalItemPrice.toFixed(2)} €</td>
    </tr>
    ${item.observaciones ? `<tr><td colspan="8" class="item-observaciones"><em>Observaciones: ${item.observaciones}</em></td></tr>` : ''}
  `).join('');

  const shippingZoneLabel = getShippingZoneLabelForPrint(order.shippingZone);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ticket Pedido - ${order.customerName}</title>
      <link href="https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap" rel="stylesheet">
      <style>${getPrintStyles()}</style>
    </head>
    <body>
      <div class="print-button-bar">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer; background-color: #0B192E; color: white; border: none; border-radius: 5px;">Imprimir / Guardar como PDF</button>
      </div>
      <div class="print-ticket-container" id="print-content-for-${order.id}">
        <div class="print-header">
          <img src="${SHOP_LOGO_URL}" alt="VAC Logo" />
          <h1>Los Vasos de Agua Clara</h1>
          <p>Maison&Objet Pedido</p>
        </div>

        <div class="order-details">
          <p><strong>Cliente:</strong> ${order.customerName}</p>
          <p><strong>Vendedor:</strong> ${order.seller}</p>
          <p><strong>Zona de Envío:</strong> ${shippingZoneLabel}</p>
          <p><strong>Fecha del Pedido:</strong> ${new Date(order.timestamp).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })} ${new Date(order.timestamp).toLocaleTimeString('es-ES')}</p>
          <p><strong>ID Pedido:</strong> ${order.id}</p>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Diseño</th>
              <th>Color P.</th>
              <th>Color S.</th>
              <th>Oro</th>
              <th class="numeric">Cant.</th>
              <th class="numeric">P. Unit.</th>
              <th class="numeric">P. Total</th>
            </tr>
          </thead>
          <tbody>
            ${subOrderRows}
          </tbody>
        </table>

        <div class="total-section">
          <p>Total Pedido: ${order.totalOrderPrice.toFixed(2)} €</p>
        </div>

        <div class="print-footer">
          <p>Gracias por su pedido.</p>
          <p>Los Vasos de Agua Clara &copy; ${new Date().getFullYear()}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export const openOrderPrintView = (order: Order): void => {
  const orderHtml = generatePrintableOrderHtml(order);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(orderHtml);
    printWindow.document.close();
    // Optional: Trigger print dialog automatically after a short delay,
    // giving the browser time to render the content.
    // setTimeout(() => {
    //   printWindow.print();
    // }, 500);
  } else {
    alert("No se pudo abrir la ventana de impresión. Verifique la configuración de su bloqueador de pop-ups.");
  }
};