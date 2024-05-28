import { OrderStatus, OrderType, PricePairTypes } from './enum';

export interface OHLCVData {
  close: number;
  high: number;
  isClosed: boolean;
  low: number;
  open: number;
  resolution: string;
  time: number;
  timestamp: number;
  timestampISO: string;
  volume: number;
}

export interface ChartProps {
  pair: string;
  interval: '1m' | '5m' | '15m' | '1h' | '4h';
}

export interface WebSocketResponse {
  e: string;
  data: OHLCVData[];
}

export interface OrderItemType {
  type: OrderType;
  status: OrderStatus;
  price: number;
  amount: number;
  pair: PricePairTypes;
  createdTime: Date;
  finishedTime: Date | null;
}
