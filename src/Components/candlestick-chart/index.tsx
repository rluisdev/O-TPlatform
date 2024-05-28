import ReactApexChart from 'react-apexcharts';
import { OHLCVData } from '@/Utils/type';
import { useMemo } from 'react';

interface CandlestickChartProps {
  data: OHLCVData[];
}

export const CandlestickChart = ({ data }: CandlestickChartProps) => {
  const series = useMemo(
    () => [
      {
        name: 'Candles',
        data: data.map(d => ({
          x: new Date(d.time).getTime(),
          y: [d.open, d.high, d.low, d.close, d.volume],
        })),
      },
    ],
    [data]
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 400,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="candlestick"
      height={400}
      className="w-full"
    />
  );
};
