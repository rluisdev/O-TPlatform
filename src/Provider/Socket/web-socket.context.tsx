import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { WebSocketContextType } from './types';

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onopen = () => {
      console.log('WebSocket connection opened');
      setConnected(true);
    };

    websocket.onerror = err => {
      console.error('WebSocket error:', err);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnected(false);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
