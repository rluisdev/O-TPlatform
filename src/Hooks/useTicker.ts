import { useContext, useEffect, useState } from 'react';

import { WebSocketContext } from '@/Provider';

export const useTicker = (pair: string) => {
  const socketContext = useContext(WebSocketContext);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  if (!socketContext) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  const { ws, connected } = socketContext;

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 50000);
  }, []);

  useEffect(() => {
    if (connected && ws) {
      ws.onmessage = event => {
        const data = JSON.parse(event?.data);
        if (data.e === 'get-ticker' && data.data.pair === pair) {
          setData(data.data);
        }
      };
    }
  }, [pair, count]);

  return data;
};
