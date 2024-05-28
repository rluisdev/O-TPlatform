import './global';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WebSocketProvider } from './Provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </React.StrictMode>
);
