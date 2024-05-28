import { Dispatch, SetStateAction } from 'react';

import { OrderStatus } from '@/Utils/enum';
import { OrderItemType } from '@/Utils/type';

interface OrderBookProps {
  data: OrderItemType[];
  setData: Dispatch<SetStateAction<OrderItemType[]>>;
}

export const OrderBook = ({ data, setData }: OrderBookProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-auto">
      <div className="w-full flex">
        <div className="w-full py-2.5 border-t-4 text-center border-text-selected text-white">
          <span>Order History</span>
        </div>
      </div>
      <div className="w-full flex-grow flex overflow-auto">
        <div className="min-w-[600px] w-full h-full flex flex-col">
          <div className="w-full flex text-center border-secondary-light">
            <span className="w-1/12 border py-1">No</span>
            <span className="w-1/6 border py-1">Price</span>
            <span className="w-1/6 border py-1">Amount</span>
            <span className="w-1/6 border py-1">Pair</span>
            <span className="w-1/4 border py-1">Status</span>
            <span className="w-1/6 border py-1">Finished Time</span>
          </div>
          <div className="w-full flex-grow flex flex-col overflow-auto">
            {data.map((item, index) => (
              <div className="w-full flex text-center">
                <span className="w-1/12 border py-1 truncate">{index + 1}</span>
                <span className="w-1/6 border py-1 truncate">{item.price}</span>
                <span className="w-1/6 border py-1 truncate">
                  {item.amount}
                </span>
                <span className="w-1/6 border py-1 truncate">{item.pair}</span>
                <span className="w-1/4 border py-1 truncate">
                  <span
                    className={
                      'rounded-full border text-xs font-light text-white border-none px-2 py-0.5 ' +
                      (item.status == OrderStatus.DONE
                        ? 'bg-text-success'
                        : item.status === OrderStatus.PENDING
                        ? 'bg-text-selected'
                        : 'bg-text-primary')
                    }
                  >
                    {item.status}
                  </span>
                  {item.status === OrderStatus.PENDING && (
                    <span
                      className="rounded-full px-2 y-full text-white bg-secondary-light"
                      onClick={e => {
                        e.stopPropagation();
                        data[index].status = OrderStatus.CANCELED;

                        setData([...data]);
                      }}
                    >
                      &times;
                    </span>
                  )}
                </span>
                <span className="w-1/6 border py-1 truncate">
                  {item.finishedTime ? item.finishedTime.toDateString() : '-'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
