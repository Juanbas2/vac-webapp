import { ProductDiseno, ShippingZone } from './types';

export const PRODUCTO_PLACEHOLDER_VALUE = "-"; // Changed from PRODUCT_TYPE_PLACEHOLDER_VALUE
export const DISENO_PLACEHOLDER_VALUE = "-"; // Changed from DIBUJO_PLACEHOLDER_VALUE
export const COLOR_PLACEHOLDER_VALUE = "-"; // For primary color
export const SECONDARY_COLOR_NONE_VALUE = "NONE"; // Represents no secondary color
export const SHIPPING_ZONE_PLACEHOLDER_VALUE = "-";

export const DEFAULT_SHIPPING_ZONE = ShippingZone.ESPANA;

export const AVAILABLE_PRODUCTOS: { value: string; label: string }[] = [ // Changed from AVAILABLE_PRODUCT_TYPES
  { value: PRODUCTO_PLACEHOLDER_VALUE, label: "- Seleccionar Producto -" }, // Changed label
  { value: "BOTELLA DE NOCHE (Corate P 75)", label: "BOTELLA DE NOCHE (Corate P 75)" },
  { value: "CARAFE GRANDE 1,0 L", label: "CARAFE GRANDE 1,0 L" },
  { value: "CARAFE PEQUENA 0,5 L", label: "CARAFE PEQUENA 0,5 L" },
  { value: "COPA BOHEMIA VINO BLANCO 26 cl", label: "COPA BOHEMIA VINO BLANCO 26 cl" },
  { value: "COPA BOHEMIA VINO TINTO 33 cl", label: "COPA BOHEMIA VINO TINTO 33 cl" },
  { value: "COPA CRISTAL VINO BLANCO 22 cl", label: "COPA CRISTAL VINO BLANCO 22 cl" },
  { value: "COPA CRISTAL VINO TINTO 28 cl", label: "COPA CRISTAL VINO TINTO 28 cl" },
  { value: "JARRA RECTA 1,3 L", label: "JARRA RECTA 1,3 L" },
  { value: "JARRA REDONDA GRANDE 1,5 L", label: "JARRA REDONDA GRANDE 1,5 L" },
  { value: "JARRA REDONDA PEQUENA 1,0 L", label: "JARRA REDONDA PEQUENA 1,0 L" },
  { value: "VASO BOHEMIA 33 cl", label: "VASO BOHEMIA 33 cl" },
  { value: "VASO CHUPITO 5 cl", label: "VASO CHUPITO 5 cl" },
  { value: "VASO CRISTAL MEDIANO 50 cl", label: "VASO CRISTAL MEDIANO 50 cl" },
  { value: "VASO CRISTAL PEQUENO 35 cl", label: "VASO CRISTAL PEQUENO 35 cl" },
  { value: "VASO PREMIUM GRANDE 56 cl", label: "VASO PREMIUM GRANDE 56 cl" },
  { value: "VELA GRANDE 15 cm", label: "VELA GRANDE 15 cm" },
  { value: "VELA PEQUENA 9,5 cm", label: "VELA PEQUENA 9,5 cm" },
];

export const AVAILABLE_COLORS: { value: string; label: string }[] = [
  { value: COLOR_PLACEHOLDER_VALUE, label: "- Seleccionar Color -" },
  { value: "Rojo", label: "Rojo" },
  { value: "Azul Marino", label: "Azul Marino" },
  { value: "Verde Esmeralda", label: "Verde Esmeralda" },
  { value: "Amarillo Sol", label: "Amarillo Sol" },
  { value: "Naranja", label: "Naranja" },
  { value: "Morado", label: "Morado" },
  { value: "Rosa Fucsia", label: "Rosa Fucsia" },
  { value: "Turquesa", label: "Turquesa" },
  { value: "Beige", label: "Beige" },
  { value: "Gris Perla", label: "Gris Perla" },
  { value: "Negro Ónix", label: "Negro Ónix" },
  { value: "Blanco Nieve", label: "Blanco Nieve" },
  { value: "Marrón Chocolate", label: "Marrón Chocolate" },
  { value: "Dorado", label: "Dorado" },
  { value: "Plateado", label: "Plateado" },
  { value: "Coral", label: "Coral" },
  { value: "Lavanda", label: "Lavanda" },
  { value: "Menta", label: "Menta" },
  { value: "Salmón", label: "Salmón" },
  { value: "Celeste", label: "Celeste" },
];

export const AVAILABLE_SECONDARY_COLORS: { value: string; label: string }[] = [
  { value: SECONDARY_COLOR_NONE_VALUE, label: "- Ninguno -" },
  ...AVAILABLE_COLORS.filter(color => color.value !== COLOR_PLACEHOLDER_VALUE)
];

export const AVAILABLE_DISENOS: { value: ProductDiseno | typeof DISENO_PLACEHOLDER_VALUE; label: string }[] = [ // Changed from AVAILABLE_DIBUJOS
  { value: DISENO_PLACEHOLDER_VALUE, label: "- Seleccionar Diseño -" }, // Changed label
  { value: ProductDiseno.ACAPULCO, label: "ACAPULCO" },
  { value: ProductDiseno.DRAGONFLIES, label: "DRAGONFLIES" },
  { value: ProductDiseno.HOLLAND, label: "HOLLAND" },
  { value: ProductDiseno.JALISCO, label: "JALISCO" },
  { value: ProductDiseno.MELIDES, label: "MELIDES" },
  { value: ProductDiseno.NAIROBI, label: "NAIROBI" },
  { value: ProductDiseno.NORMANDIE, label: "NORMANDIE" },
  { value: ProductDiseno.OAXACA, label: "OAXACA" },
  { value: ProductDiseno.PALAWAN, label: "PALAWAN" },
  { value: ProductDiseno.PARIS, label: "PARIS" },
  { value: ProductDiseno.PATMOS, label: "PATMOS" },
  { value: ProductDiseno.PORTOFINO, label: "PORTOFINO" },
  { value: ProductDiseno.SAANEN, label: "SAANEN" },
  { value: ProductDiseno.SOUL, label: "SOUL" },
  { value: ProductDiseno.ST_REMY, label: "ST. REMY" },
  { value: ProductDiseno.ST_TROPEZ, label: "ST. TROPEZ" },
  { value: ProductDiseno.TIROL, label: "TIROL" },
  { value: ProductDiseno.VERMONT, label: "VERMONT" },
];

export const AVAILABLE_SELLERS: { value: string; label: string }[] = [
  { value: "Clara", label: "Clara" },
  { value: "Maite", label: "Maite" },
  { value: "Vendedor 3", label: "Vendedor 3" },
  { value: "Vendedor 4", label: "Vendedor 4" },
];

export const AVAILABLE_SHIPPING_ZONES: { value: ShippingZone | typeof SHIPPING_ZONE_PLACEHOLDER_VALUE; label: string }[] = [
  // { value: SHIPPING_ZONE_PLACEHOLDER_VALUE, label: "- Seleccionar Zona de Envío -" }, // Removed placeholder to default to Espana
  { value: ShippingZone.ESPANA, label: "España" },
  { value: ShippingZone.EUROPA, label: "Europa (+10%)" },
  { value: ShippingZone.EXTRACOMUNITARIO, label: "Extracomunitario (+20%)" },
];