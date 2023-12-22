import React, { useMemo } from 'react';
import { AdjustedData } from 'hooks/useTradingData';
import { Chart, AxisOptions } from 'react-charts';

type Props = {
  tradingdata: AdjustedData;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

type TradingData = {
  date: Date;
  value: number;
};

const TradingChart = (props: Props) => {
  const seriesData = Object.entries(props.tradingdata).map(([date, values]) => ({
    date: new Date(date),
    open: values['1. open'],
    close: values['4. close'],
    adjustedClose: values['5. adjusted close'],
    volume: values['6. volume'],
    low: values['3. low'],
    high: values['2. high']
  }));

  const data = [
    {
      label: 'Open',
      data: seriesData.map(({ date, open }) => ({ date, value: open }))
    },
    {
      label: 'Close',
      data: seriesData.map(({ date, close }) => ({ date, value: close }))
    },
    {
      label: 'Adjusted Close',
      data: seriesData.map(({ date, adjustedClose }) => ({ date, value: adjustedClose }))
    },
    // {
    //   label: 'Volume',
    //   data: seriesData.map(({ date, volume }) => ({ date, value: volume }))
    // },
    {
      label: 'Low',
      data: seriesData.map(({ date, low }) => ({ date, value: low }))
    },
    {
      label: 'High',
      data: seriesData.map(({ date, high }) => ({ date, value: high }))
    }
  ];

  const primaryAxis = useMemo(
    (): AxisOptions<TradingData> => ({
      getValue: (datum) => datum.date
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<TradingData>[] => [
      {
        getValue: (datum) => datum.value
      }
    ],
    []
  );

  return (
    <div {...props}>
      <Chart
        className="block"
        options={{
          data,
          primaryAxis,
          secondaryAxes
        }}
      />
    </div>
  );
};

export default TradingChart;
