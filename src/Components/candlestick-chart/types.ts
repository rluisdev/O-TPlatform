import { UTCTimestamp } from 'lightweight-charts';

export interface OHLCVChartDataType {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
