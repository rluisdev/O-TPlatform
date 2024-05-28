import { useEffect, useMemo, useState } from 'react';

import { TradingChart, OrderBook, OrderPanel } from './Components';

import { useTicker } from '@/Hooks';
import { ORDER_TYPES, PRICE_PAIRS } from '@/Utils/constant';
import { OrderStatus, OrderType } from '@/Utils/enum';
import { OrderItemType } from '@/Utils/type';

import './index.css';

function Home() {
  const [timeFrameIndex, setTimeFrameIndex] = useState<number>(0);
  const [pricePairIndex, setPricePairIndex] = useState<number>(0);
  const [orderCurrency, setOrderCurrency] = useState<number>(0);
  const [selectedOrderType, setSelectedOrderType] = useState<number>(0);
  const [balance, setBalance] = useState<string>('0');
  const [price, setPrice] = useState<string>('0');
  const [amount, setAmount] = useState<string>('0');
  const [orderbooks, setOrderBooks] = useState<OrderItemType[]>([]);
  const currentTicker: any = useTicker(PRICE_PAIRS[orderCurrency]);
  console.log(currentTicker);
  const handleSubmit = () => {
    const orderItem: OrderItemType = {
      type: ORDER_TYPES[selectedOrderType],
      status: OrderStatus.PENDING,
      price: parseFloat(price),
      amount: parseFloat(amount),
      pair: PRICE_PAIRS[orderCurrency],
      createdTime: new Date(),
      finishedTime: null,
    };

    if (
      ORDER_TYPES[selectedOrderType] === OrderType.MARKET_BUY ||
      ORDER_TYPES[selectedOrderType] === OrderType.MARKET_SELL
    ) {
      orderItem.finishedTime = new Date();
      orderItem.status = OrderStatus.DONE;
      orderItem.price = parseFloat(currentTicker.last);
    }

    setOrderBooks([...orderbooks, orderItem]);
  };
  const sortedData = useMemo(
    () =>
      orderbooks.sort((a, b) =>
        Number(a.createdTime.toISOString() > b.createdTime.toISOString())
      ),
    [orderbooks]
  );

  useEffect(() => {
    setOrderBooks(
      orderbooks.map(data => {
        if (
          data.status === OrderStatus.PENDING &&
          data.price === currentTicker.last &&
          data.pair === currentTicker.pair
        ) {
          data.status = OrderStatus.DONE;
          data.finishedTime = new Date();
        }
        return { ...data };
      })
    );
  }, [currentTicker]);

  return (
    <div className="w-full xl:w-3/4 h-full flex flex-col lg:flex-row border-x text-text-primary text-sm font-bold">
      <div className="w-full lg:w-3/4 h-full flex flex-col border-r">
        <TradingChart
          timeFrameIndex={timeFrameIndex}
          pricePairIndex={pricePairIndex}
          setTimeFrameIndex={setTimeFrameIndex}
          setPricePairIndex={setPricePairIndex}
        />
        <div className="w-full h-1/3">
          <OrderPanel
            orderCurrency={orderCurrency}
            selectedOrderType={selectedOrderType}
            amount={amount}
            price={price}
            balance={balance}
            setOrderCurrency={setOrderCurrency}
            setSelectedOrderType={setSelectedOrderType}
            setAmount={setAmount}
            setPrice={setPrice}
            setBalance={setBalance}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/4 h-[500px] max-h-[500px] lg:h-full">
        <OrderBook data={sortedData} setData={setOrderBooks} />
      </div>
    </div>
  );
}

export default Home;
