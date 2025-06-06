export enum ProductDiseno {
  ACAPULCO = "ACAPULCO",
  DRAGONFLIES = "DRAGONFLIES",
  HOLLAND = "HOLLAND",
  JALISCO = "JALISCO",
  MELIDES = "MELIDES",
  NAIROBI = "NAIROBI",
  NORMANDIE = "NORMANDIE",
  OAXACA = "OAXACA",
  PALAWAN = "PALAWAN",
  PARIS = "PARIS",
  PATMOS = "PATMOS",
  PORTOFINO = "PORTOFINO",
  SAANEN = "SAANEN",
  SOUL = "SOUL",
  ST_REMY = "ST. REMY", // Enum key can't have '.', using underscore for consistency if needed but string value is exact
  ST_TROPEZ = "ST. TROPEZ",
  TIROL = "TIROL",
  VERMONT = "VERMONT",
}

export enum ShippingZone {
  ESPANA = "ESPANA",
  EUROPA = "EUROPA",
  EXTRACOMUNITARIO = "EXTRACOMUNITARIO",
}

export interface SubOrder {
  id: string; // Unique ID for the sub-order item
  producto: string; // Changed from productType
  diseno: ProductDiseno; // Changed from dibujo, uses new enum
  color: string; // Primary color
  secondaryColor?: string; // Optional secondary color
  extraOro: boolean; 
  quantity: number;
  unitPrice: number; // New field for unit price
  totalItemPrice: number; // New field for total price of this item (unitPrice * quantity)
  observaciones?: string; 
}

export interface Order {
  id: string; // Unique ID for the main order
  customerName: string;
  seller: string;
  shippingZone: ShippingZone; // New field for shipping zone
  subOrders: SubOrder[]; // Array of sub-order items
  timestamp: Date;
  totalOrderPrice: number; // New field for the total price of the entire order
}

// Props for UI components
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showSteppers?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
  containerClassName?: string; // Added for styling the component's root div
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  labelClassName?: string; // Added for custom label styling
}