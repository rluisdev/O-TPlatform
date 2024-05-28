import { OrderType, PricePairTypes } from './enum';

export const TIME_FRAMES = ['1m', '5m', '15m', '1h', '4h'];
export const PRICE_PAIRS = Object.values(PricePairTypes);
export const ORDER_TYPES = Object.values(OrderType);
export const QUANTITY_TYPE = ['AMOUNT', 'PERCENT'];
