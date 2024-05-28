import { useContext, useEffect, useState } from 'react';

import { WebSocketContext } from '@/Provider';
import { OHLCVData } from '@/Utils/type';

export const useOHLCVData = (pair: string, timeFrame: string): OHLCVData[] => {
  const socketContext = useContext(WebSocketContext);
  const [data, setData] = useState([]);
  if (!socketContext) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  const { ws, connected } = socketContext;

  if (connected && ws) {
    ws.onmessage = event => {
      const data = JSON.parse(event?.data);
      if (data.e === 'init-ohlcv-data') {
        setData(data.data);
      }
    };
  }

  useEffect(() => {
    if (connected && ws) {
      ws.send(
        JSON.stringify({
          e: 'get-ohlcv-data',
          pair: pair,
          timeFrame: timeFrame,
        })
      );
    }
  }, [pair, timeFrame, connected]);

  return data;
};
