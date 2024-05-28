/* eslint-disable no-unused-vars */
export enum SelectType {
  DROPDOWN,
  BAR,
}

export enum OrderType {
  BUY_LIMIT = 'BUY LIMIT',
  SELL_LIMIT = 'SELL LIMIT',
  MARKET_BUY = 'MARKET BUY',
  MARKET_SELL = 'MARKET SELL',
}

export enum PricePairTypes {
  BTC_USDT = 'BTC-USDT',
  ETH_BTC = 'ETH-BTC',
  LTC_USDT = 'LTC-USDT',
  XRP_USDT = 'XRP-USDT',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  DONE = 'FILLED',
  CANCELED = 'CANCELED',
}
