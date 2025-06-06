import { ProductDiseno, ShippingZone } from './types';
import { PRODUCTO_PLACEHOLDER_VALUE, DISENO_PLACEHOLDER_VALUE } from './constants';

const priceMatrix: { [producto: string]: { [diseno in ProductDiseno]?: number } } = {
  "BOTELLA DE NOCHE (Corate P 75)": {
    [ProductDiseno.ACAPULCO]: 112.00, [ProductDiseno.DRAGONFLIES]: 110.00, [ProductDiseno.HOLLAND]: 114.00, [ProductDiseno.JALISCO]: 110.00, [ProductDiseno.MELIDES]: 112.00, [ProductDiseno.NAIROBI]: 112.00, [ProductDiseno.NORMANDIE]: 110.00, [ProductDiseno.OAXACA]: 110.00, [ProductDiseno.PALAWAN]: 114.00, [ProductDiseno.PARIS]: 112.00, [ProductDiseno.PATMOS]: 110.00, [ProductDiseno.PORTOFINO]: 110.00, [ProductDiseno.SAANEN]: 114.00, [ProductDiseno.SOUL]: 114.00, [ProductDiseno.ST_REMY]: 114.00, [ProductDiseno.ST_TROPEZ]: 114.00, [ProductDiseno.TIROL]: 114.00, [ProductDiseno.VERMONT]: 114.00,
  },
  "CARAFE GRANDE 1,0 L": {
    [ProductDiseno.ACAPULCO]: 102.00, [ProductDiseno.DRAGONFLIES]: 100.00, [ProductDiseno.HOLLAND]: 104.00, [ProductDiseno.JALISCO]: 100.00, [ProductDiseno.MELIDES]: 102.00, [ProductDiseno.NAIROBI]: 102.00, [ProductDiseno.NORMANDIE]: 100.00, [ProductDiseno.OAXACA]: 100.00, [ProductDiseno.PALAWAN]: 104.00, [ProductDiseno.PARIS]: 102.00, [ProductDiseno.PATMOS]: 100.00, [ProductDiseno.PORTOFINO]: 100.00, [ProductDiseno.SAANEN]: 104.00, [ProductDiseno.SOUL]: 104.00, [ProductDiseno.ST_REMY]: 104.00, [ProductDiseno.ST_TROPEZ]: 104.00, [ProductDiseno.TIROL]: 104.00, [ProductDiseno.VERMONT]: 104.00,
  },
  "CARAFE PEQUENA 0,5 L": {
    [ProductDiseno.ACAPULCO]: 82.00, [ProductDiseno.DRAGONFLIES]: 80.00, [ProductDiseno.HOLLAND]: 84.00, [ProductDiseno.JALISCO]: 80.00, [ProductDiseno.MELIDES]: 82.00, [ProductDiseno.NAIROBI]: 82.00, [ProductDiseno.NORMANDIE]: 80.00, [ProductDiseno.OAXACA]: 80.00, [ProductDiseno.PALAWAN]: 84.00, [ProductDiseno.PARIS]: 82.00, [ProductDiseno.PATMOS]: 80.00, [ProductDiseno.PORTOFINO]: 80.00, [ProductDiseno.SAANEN]: 84.00, [ProductDiseno.SOUL]: 84.00, [ProductDiseno.ST_REMY]: 84.00, [ProductDiseno.ST_TROPEZ]: 84.00, [ProductDiseno.TIROL]: 84.00, [ProductDiseno.VERMONT]: 84.00,
  },
  "COPA BOHEMIA VINO BLANCO 26 cl": {
    [ProductDiseno.ACAPULCO]: 38.00, [ProductDiseno.DRAGONFLIES]: 37.00, [ProductDiseno.HOLLAND]: 39.00, [ProductDiseno.JALISCO]: 37.00, [ProductDiseno.MELIDES]: 38.00, [ProductDiseno.NAIROBI]: 38.00, [ProductDiseno.NORMANDIE]: 37.00, [ProductDiseno.OAXACA]: 37.00, [ProductDiseno.PALAWAN]: 39.00, [ProductDiseno.PARIS]: 38.00, [ProductDiseno.PATMOS]: 37.00, [ProductDiseno.PORTOFINO]: 37.00, [ProductDiseno.SAANEN]: 39.00, [ProductDiseno.SOUL]: 39.00, [ProductDiseno.ST_REMY]: 39.00, [ProductDiseno.ST_TROPEZ]: 39.00, [ProductDiseno.TIROL]: 39.00, [ProductDiseno.VERMONT]: 39.00,
  },
  "COPA BOHEMIA VINO TINTO 33 cl": {
    [ProductDiseno.ACAPULCO]: 38.00, [ProductDiseno.DRAGONFLIES]: 37.00, [ProductDiseno.HOLLAND]: 39.00, [ProductDiseno.JALISCO]: 37.00, [ProductDiseno.MELIDES]: 38.00, [ProductDiseno.NAIROBI]: 38.00, [ProductDiseno.NORMANDIE]: 37.00, [ProductDiseno.OAXACA]: 37.00, [ProductDiseno.PALAWAN]: 39.00, [ProductDiseno.PARIS]: 38.00, [ProductDiseno.PATMOS]: 37.00, [ProductDiseno.PORTOFINO]: 37.00, [ProductDiseno.SAANEN]: 39.00, [ProductDiseno.SOUL]: 39.00, [ProductDiseno.ST_REMY]: 39.00, [ProductDiseno.ST_TROPEZ]: 39.00, [ProductDiseno.TIROL]: 39.00, [ProductDiseno.VERMONT]: 39.00,
  },
  "COPA CRISTAL VINO BLANCO 22 cl": {
    [ProductDiseno.ACAPULCO]: 33.00, [ProductDiseno.DRAGONFLIES]: 32.00, [ProductDiseno.HOLLAND]: 34.00, [ProductDiseno.JALISCO]: 32.00, [ProductDiseno.MELIDES]: 33.00, [ProductDiseno.NAIROBI]: 33.00, [ProductDiseno.NORMANDIE]: 32.00, [ProductDiseno.OAXACA]: 32.00, [ProductDiseno.PALAWAN]: 34.00, [ProductDiseno.PARIS]: 33.00, [ProductDiseno.PATMOS]: 32.00, [ProductDiseno.PORTOFINO]: 32.00, [ProductDiseno.SAANEN]: 34.00, [ProductDiseno.SOUL]: 34.00, [ProductDiseno.ST_REMY]: 34.00, [ProductDiseno.ST_TROPEZ]: 34.00, [ProductDiseno.TIROL]: 34.00, [ProductDiseno.VERMONT]: 34.00,
  },
  "COPA CRISTAL VINO TINTO 28 cl": {
    [ProductDiseno.ACAPULCO]: 33.00, [ProductDiseno.DRAGONFLIES]: 32.00, [ProductDiseno.HOLLAND]: 34.00, [ProductDiseno.JALISCO]: 32.00, [ProductDiseno.MELIDES]: 33.00, [ProductDiseno.NAIROBI]: 33.00, [ProductDiseno.NORMANDIE]: 32.00, [ProductDiseno.OAXACA]: 32.00, [ProductDiseno.PALAWAN]: 34.00, [ProductDiseno.PARIS]: 33.00, [ProductDiseno.PATMOS]: 32.00, [ProductDiseno.PORTOFINO]: 32.00, [ProductDiseno.SAANEN]: 34.00, [ProductDiseno.SOUL]: 34.00, [ProductDiseno.ST_REMY]: 34.00, [ProductDiseno.ST_TROPEZ]: 34.00, [ProductDiseno.TIROL]: 34.00, [ProductDiseno.VERMONT]: 34.00,
  },
  "JARRA RECTA 1,3 L": {
    [ProductDiseno.ACAPULCO]: 117.00, [ProductDiseno.DRAGONFLIES]: 115.00, [ProductDiseno.HOLLAND]: 119.00, [ProductDiseno.JALISCO]: 115.00, [ProductDiseno.MELIDES]: 117.00, [ProductDiseno.NAIROBI]: 117.00, [ProductDiseno.NORMANDIE]: 115.00, [ProductDiseno.OAXACA]: 115.00, [ProductDiseno.PALAWAN]: 119.00, [ProductDiseno.PARIS]: 117.00, [ProductDiseno.PATMOS]: 115.00, [ProductDiseno.PORTOFINO]: 115.00, [ProductDiseno.SAANEN]: 119.00, [ProductDiseno.SOUL]: 119.00, [ProductDiseno.ST_REMY]: 119.00, [ProductDiseno.ST_TROPEZ]: 119.00, [ProductDiseno.TIROL]: 119.00, [ProductDiseno.VERMONT]: 119.00,
  },
  "JARRA REDONDA GRANDE 1,5 L": {
    [ProductDiseno.ACAPULCO]: 117.00, [ProductDiseno.DRAGONFLIES]: 115.00, [ProductDiseno.HOLLAND]: 119.00, [ProductDiseno.JALISCO]: 115.00, [ProductDiseno.MELIDES]: 117.00, [ProductDiseno.NAIROBI]: 117.00, [ProductDiseno.NORMANDIE]: 115.00, [ProductDiseno.OAXACA]: 115.00, [ProductDiseno.PALAWAN]: 119.00, [ProductDiseno.PARIS]: 117.00, [ProductDiseno.PATMOS]: 115.00, [ProductDiseno.PORTOFINO]: 115.00, [ProductDiseno.SAANEN]: 119.00, [ProductDiseno.SOUL]: 119.00, [ProductDiseno.ST_REMY]: 119.00, [ProductDiseno.ST_TROPEZ]: 119.00, [ProductDiseno.TIROL]: 119.00, [ProductDiseno.VERMONT]: 119.00,
  },
  "JARRA REDONDA PEQUENA 1,0 L": {
    [ProductDiseno.ACAPULCO]: 97.00, [ProductDiseno.DRAGONFLIES]: 95.00, [ProductDiseno.HOLLAND]: 99.00, [ProductDiseno.JALISCO]: 95.00, [ProductDiseno.MELIDES]: 97.00, [ProductDiseno.NAIROBI]: 97.00, [ProductDiseno.NORMANDIE]: 95.00, [ProductDiseno.OAXACA]: 95.00, [ProductDiseno.PALAWAN]: 99.00, [ProductDiseno.PARIS]: 97.00, [ProductDiseno.PATMOS]: 95.00, [ProductDiseno.PORTOFINO]: 95.00, [ProductDiseno.SAANEN]: 99.00, [ProductDiseno.SOUL]: 99.00, [ProductDiseno.ST_REMY]: 99.00, [ProductDiseno.ST_TROPEZ]: 99.00, [ProductDiseno.TIROL]: 99.00, [ProductDiseno.VERMONT]: 99.00,
  },
  "VASO BOHEMIA 33 cl": {
    [ProductDiseno.ACAPULCO]: 38.00, [ProductDiseno.DRAGONFLIES]: 37.00, [ProductDiseno.HOLLAND]: 39.00, [ProductDiseno.JALISCO]: 37.00, [ProductDiseno.MELIDES]: 38.00, [ProductDiseno.NAIROBI]: 38.00, [ProductDiseno.NORMANDIE]: 37.00, [ProductDiseno.OAXACA]: 37.00, [ProductDiseno.PALAWAN]: 39.00, [ProductDiseno.PARIS]: 38.00, [ProductDiseno.PATMOS]: 37.00, [ProductDiseno.PORTOFINO]: 37.00, [ProductDiseno.SAANEN]: 39.00, [ProductDiseno.SOUL]: 39.00, [ProductDiseno.ST_REMY]: 39.00, [ProductDiseno.ST_TROPEZ]: 39.00, [ProductDiseno.TIROL]: 39.00, [ProductDiseno.VERMONT]: 39.00,
  },
  "VASO CHUPITO 5 cl": {
    [ProductDiseno.ACAPULCO]: 28.00, [ProductDiseno.DRAGONFLIES]: 27.00, [ProductDiseno.HOLLAND]: 29.00, [ProductDiseno.JALISCO]: 27.00, [ProductDiseno.MELIDES]: 28.00, [ProductDiseno.NAIROBI]: 28.00, [ProductDiseno.NORMANDIE]: 27.00, [ProductDiseno.OAXACA]: 27.00, [ProductDiseno.PALAWAN]: 29.00, [ProductDiseno.PARIS]: 28.00, [ProductDiseno.PATMOS]: 27.00, [ProductDiseno.PORTOFINO]: 27.00, [ProductDiseno.SAANEN]: 29.00, [ProductDiseno.SOUL]: 29.00, [ProductDiseno.ST_REMY]: 29.00, [ProductDiseno.ST_TROPEZ]: 29.00, [ProductDiseno.TIROL]: 29.00, [ProductDiseno.VERMONT]: 29.00,
  },
  "VASO CRISTAL MEDIANO 50 cl": {
    [ProductDiseno.ACAPULCO]: 33.00, [ProductDiseno.DRAGONFLIES]: 32.00, [ProductDiseno.HOLLAND]: 34.00, [ProductDiseno.JALISCO]: 32.00, [ProductDiseno.MELIDES]: 33.00, [ProductDiseno.NAIROBI]: 33.00, [ProductDiseno.NORMANDIE]: 32.00, [ProductDiseno.OAXACA]: 32.00, [ProductDiseno.PALAWAN]: 34.00, [ProductDiseno.PARIS]: 33.00, [ProductDiseno.PATMOS]: 32.00, [ProductDiseno.PORTOFINO]: 32.00, [ProductDiseno.SAANEN]: 34.00, [ProductDiseno.SOUL]: 34.00, [ProductDiseno.ST_REMY]: 34.00, [ProductDiseno.ST_TROPEZ]: 34.00, [ProductDiseno.TIROL]: 34.00, [ProductDiseno.VERMONT]: 34.00,
  },
  "VASO CRISTAL PEQUENO 35 cl": {
    [ProductDiseno.ACAPULCO]: 33.00, [ProductDiseno.DRAGONFLIES]: 32.00, [ProductDiseno.HOLLAND]: 34.00, [ProductDiseno.JALISCO]: 32.00, [ProductDiseno.MELIDES]: 33.00, [ProductDiseno.NAIROBI]: 33.00, [ProductDiseno.NORMANDIE]: 32.00, [ProductDiseno.OAXACA]: 32.00, [ProductDiseno.PALAWAN]: 34.00, [ProductDiseno.PARIS]: 33.00, [ProductDiseno.PATMOS]: 32.00, [ProductDiseno.PORTOFINO]: 32.00, [ProductDiseno.SAANEN]: 34.00, [ProductDiseno.SOUL]: 34.00, [ProductDiseno.ST_REMY]: 34.00, [ProductDiseno.ST_TROPEZ]: 34.00, [ProductDiseno.TIROL]: 34.00, [ProductDiseno.VERMONT]: 34.00,
  },
  "VASO PREMIUM GRANDE 56 cl": {
    [ProductDiseno.ACAPULCO]: 33.00, [ProductDiseno.DRAGONFLIES]: 32.00, [ProductDiseno.HOLLAND]: 34.00, [ProductDiseno.JALISCO]: 32.00, [ProductDiseno.MELIDES]: 33.00, [ProductDiseno.NAIROBI]: 33.00, [ProductDiseno.NORMANDIE]: 32.00, [ProductDiseno.OAXACA]: 32.00, [ProductDiseno.PALAWAN]: 34.00, [ProductDiseno.PARIS]: 33.00, [ProductDiseno.PATMOS]: 32.00, [ProductDiseno.PORTOFINO]: 32.00, [ProductDiseno.SAANEN]: 34.00, [ProductDiseno.SOUL]: 34.00, [ProductDiseno.ST_REMY]: 34.00, [ProductDiseno.ST_TROPEZ]: 34.00, [ProductDiseno.TIROL]: 34.00, [ProductDiseno.VERMONT]: 34.00,
  },
  "VELA GRANDE 15 cm": {
    [ProductDiseno.ACAPULCO]: 120.00, [ProductDiseno.DRAGONFLIES]: 120.00, [ProductDiseno.HOLLAND]: 120.00, [ProductDiseno.JALISCO]: 120.00, [ProductDiseno.MELIDES]: 120.00, [ProductDiseno.NAIROBI]: 120.00, [ProductDiseno.NORMANDIE]: 120.00, [ProductDiseno.OAXACA]: 120.00, [ProductDiseno.PALAWAN]: 120.00, [ProductDiseno.PARIS]: 120.00, [ProductDiseno.PATMOS]: 120.00, [ProductDiseno.PORTOFINO]: 120.00, [ProductDiseno.SAANEN]: 120.00, [ProductDiseno.SOUL]: 120.00, [ProductDiseno.ST_REMY]: 120.00, [ProductDiseno.ST_TROPEZ]: 120.00, [ProductDiseno.TIROL]: 120.00, [ProductDiseno.VERMONT]: 120.00,
  },
  "VELA PEQUENA 9,5 cm": {
    [ProductDiseno.ACAPULCO]: 55.00, [ProductDiseno.DRAGONFLIES]: 55.00, [ProductDiseno.HOLLAND]: 55.00, [ProductDiseno.JALISCO]: 55.00, [ProductDiseno.MELIDES]: 55.00, [ProductDiseno.NAIROBI]: 55.00, [ProductDiseno.NORMANDIE]: 55.00, [ProductDiseno.OAXACA]: 55.00, [ProductDiseno.PALAWAN]: 55.00, [ProductDiseno.PARIS]: 55.00, [ProductDiseno.PATMOS]: 55.00, [ProductDiseno.PORTOFINO]: 55.00, [ProductDiseno.SAANEN]: 55.00, [ProductDiseno.SOUL]: 55.00, [ProductDiseno.ST_REMY]: 55.00, [ProductDiseno.ST_TROPEZ]: 55.00, [ProductDiseno.TIROL]: 55.00, [ProductDiseno.VERMONT]: 55.00,
  },
};

export const getUnitPrice = (
  producto: string,
  diseno: ProductDiseno | typeof DISENO_PLACEHOLDER_VALUE,
  extraOro: boolean,
  shippingZone: ShippingZone
): number => {
  if (
    producto === PRODUCTO_PLACEHOLDER_VALUE ||
    diseno === DISENO_PLACEHOLDER_VALUE ||
    !shippingZone // Ensure shipping zone is provided
  ) {
    return 0; 
  }

  const basePrice = priceMatrix[producto]?.[diseno as ProductDiseno];

  if (typeof basePrice !== 'number') {
    console.warn(`Price not found for ${producto} - ${diseno}. Returning 0.`);
    return 0;
  }

  let price = basePrice;

  if (extraOro) {
    price *= 1.15; // Add 15% for extra gold
  }

  switch (shippingZone) {
    case ShippingZone.EUROPA:
      price *= 1.10; // Add 10% for Europe
      break;
    case ShippingZone.EXTRACOMUNITARIO:
      price *= 1.20; // Add 20% for Extracomunitario
      break;
    case ShippingZone.ESPANA:
    default:
      // No change for Espana
      break;
  }
  
  return parseFloat(price.toFixed(2));
};