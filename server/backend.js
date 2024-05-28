const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const CEX_WS_URL = "wss://trade.cex.io/terminal/mw/ws-public";
const PORT = 8080;

const app = express();
const server = http.createServer(app);
const cexSocket = new WebSocket(CEX_WS_URL);
const wss = new WebSocket.Server({ server });

const TIMESTAMP_OF_MINUTE = 1000 * 60;
const OHLCV_DATA_COUNT = 200;

const getMarketDataRefresh = (pair) => {
  cexSocket.send(
    JSON.stringify({
      data: { pair: pair },
      e: "subscribeTicker",
      oid: `${new Date().getTime()}_subscribeTicker`,
    })
  );
};

const subscribeToOHLCV = (pair, timeFrame) => {
  const currentDate = new Date();
  let fromDate = new Date();

  switch (String(timeFrame).slice(-1)) {
    case "m":
      fromDate.setTime(
        currentDate.getTime() -
          parseInt(String(timeFrame).slice(0, -1)) *
            TIMESTAMP_OF_MINUTE *
            OHLCV_DATA_COUNT
      );
      break;
    case "h":
      fromDate.setTime(
        currentDate.getTime() -
          parseInt(String(timeFrame).slice(0, -1)) *
            TIMESTAMP_OF_MINUTE *
            OHLCV_DATA_COUNT *
            60
      );
      break;
  }

  cexSocket.send(
    JSON.stringify({
      data: {
        fromISO: fromDate,
        pair: pair,
        resolution: timeFrame,
        toISO: currentDate,
      },

      e: "getCandles",
      oid: `${currentDate.getTime()}_getCandles`,
    })
  );
};

cexSocket.on("open", () => {
  console.log("Connected to CEX.IO WebSocket API");
  getMarketDataRefresh("BTC-USDT");
  getMarketDataRefresh("ETH-BTC");
  getMarketDataRefresh("LTC-USDT");
  getMarketDataRefresh("XRP-USDT");

  setInterval(() => {
    cexSocket.send(JSON.stringify({ e: "ping" }));
  }, [60000]);
});

cexSocket.on("close", () => {
  console.log("CEX.IO WebSocket connection closed");
});

cexSocket.on("error", (err) => {
  console.error("CEX.IO WebSocket error:", err);
});

wss.on("connection", (clientSocket) => {
  console.log("Client connected");

  cexSocket.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.e === "getCandles") {
      clientSocket.send(
        JSON.stringify({
          e: "init-ohlcv-data",
          data: parsedMessage.data,
        })
      );
    } else if (parsedMessage.e === "ticker") {
      clientSocket.send(
        JSON.stringify({
          e: "get-ticker",
          timeStamp: parsedMessage.timeStamp,
          data: parsedMessage.data,
        })
      );
    }
  });

  clientSocket.on("message", (message) => {
    const request = JSON.parse(message);
    if (request.e === "get-ohlcv-data") {
      subscribeToOHLCV(request.pair, request.timeFrame);
    }
  });

  clientSocket.on("close", () => {
    console.log("Client disconnected");
  });

  clientSocket.on("error", (err) => {
    console.error("Client WebSocket error:", err);
  });
});

server.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
