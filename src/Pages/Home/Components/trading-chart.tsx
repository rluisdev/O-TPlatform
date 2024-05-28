import { Dispatch, SetStateAction } from 'react';

import { CustomSelect, CandlestickChart } from '@/Components';

import { useOHLCVData } from '@/Hooks';
import { PRICE_PAIRS, TIME_FRAMES } from '@/Utils/constant';
import { SelectType } from '@/Utils/enum';
import { OHLCVData } from '@/Utils/type';

interface TradingChartProps {
  timeFrameIndex: number;
  pricePairIndex: number;
  setTimeFrameIndex: Dispatch<SetStateAction<number>>;
  setPricePairIndex: Dispatch<SetStateAction<number>>;
}

export const TradingChart = ({
  timeFrameIndex,
  pricePairIndex,
  setTimeFrameIndex,
  setPricePairIndex,
}: TradingChartProps) => {
  const ohlcvData: OHLCVData[] = useOHLCVData(
    PRICE_PAIRS[pricePairIndex],
    TIME_FRAMES[timeFrameIndex]
  );

  return (
    <div className="trading-chart">
      <div className="trading-chart-header">
        <CustomSelect
          type={SelectType.BAR}
          options={TIME_FRAMES}
          selectedIndex={timeFrameIndex}
          setSelectedIndex={setTimeFrameIndex}
        />
        <CustomSelect
          type={SelectType.BAR}
          options={PRICE_PAIRS}
          selectedIndex={pricePairIndex}
          setSelectedIndex={setPricePairIndex}
        />
      </div>
      <div className="trading-chart-body">
        <CandlestickChart data={ohlcvData} />
      </div>
    </div>
  );
};
