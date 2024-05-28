import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { CustomInput, CustomSelect, CustomSlider } from '@/Components';

import { ORDER_TYPES, PRICE_PAIRS, QUANTITY_TYPE } from '@/Utils/constant';
import { SelectType } from '@/Utils/enum';

interface OrderPanelProps {
  amount: string;
  balance: string;
  orderCurrency: number;
  price: string;
  selectedOrderType: number;
  setAmount: Dispatch<SetStateAction<string>>;
  setBalance: Dispatch<SetStateAction<string>>;
  setOrderCurrency: Dispatch<SetStateAction<number>>;
  setPrice: Dispatch<SetStateAction<string>>;
  setSelectedOrderType: Dispatch<SetStateAction<number>>;
  handleSubmit: () => void;
}

export const OrderPanel = ({
  amount,
  balance,
  orderCurrency,
  price,
  selectedOrderType,
  setBalance,
  setPrice,
  setAmount,
  setOrderCurrency,
  setSelectedOrderType,
  handleSubmit,
}: OrderPanelProps) => {
  const [quantityType, setQuantityType] = useState<number>(0);

  useEffect(() => {
    if (balance === '' || parseFloat(balance) < 0) {
      setBalance('0');
    }
    if (parseFloat(amount) < 0 || amount === '') {
      setAmount('0');
    }
    if (parseFloat(price) < 0 || price === '') {
      setPrice('0');
    }
    if (parseFloat(amount) >= parseFloat(balance)) {
      setAmount(balance);
    }
  }, [balance, amount, price]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex">
        <div className="max-w-fit px-16 py-4 border-t-4 border-text-selected bg-secondary-dark bg-opacity-100 text-white">
          <span>Spot</span>
        </div>
      </div>
      <div className="w-full flex-grow bg-secondary-dark bg-opacity-100 px-10 py-6 flex flex-col gap-3">
        <div className="flex w-full justify-between items-center gap-3 flex-col-reverse lg:flex-row">
          <CustomInput
            label="Balance"
            value={balance}
            onChange={setBalance}
            className="w-full lg:flex-grow"
          />
          <div className="flex gap-3 items-center h-full">
            <CustomSelect
              type={SelectType.DROPDOWN}
              options={QUANTITY_TYPE}
              selectedIndex={quantityType}
              setSelectedIndex={setQuantityType}
            />
            <CustomSelect
              type={SelectType.DROPDOWN}
              options={PRICE_PAIRS}
              selectedIndex={orderCurrency}
              setSelectedIndex={setOrderCurrency}
            />
            <CustomSelect
              type={SelectType.DROPDOWN}
              options={ORDER_TYPES}
              selectedIndex={selectedOrderType}
              setSelectedIndex={setSelectedOrderType}
            />
          </div>
        </div>
        <div className="flex items-start justify-between gap-3">
          <CustomInput
            label="Price"
            value={price}
            onChange={setPrice}
            className="w-full"
            disabled={selectedOrderType === 2 || selectedOrderType === 3}
          />
          <div className="w-full flex flex-col gap-3">
            {quantityType === 0 ? (
              <CustomInput
                label="Quantity"
                value={amount}
                onChange={setAmount}
                className="w-full"
              />
            ) : (
              <div className="px-3">
                <CustomSlider
                  handleChange={values =>
                    setAmount(String((values[0] / 100) * parseFloat(balance)))
                  }
                />
              </div>
            )}
          </div>
        </div>
        <button
          className="mt-5 w-full py-2 bg-secondary-light rounded-md text-white hover:bg-text-selected disabled:bg-secondary-normal disabled:text-text-primary"
          disabled={parseFloat(balance) === 0}
          onClick={() => handleSubmit()}
        >
          {ORDER_TYPES[selectedOrderType]}
        </button>
      </div>
    </div>
  );
};
