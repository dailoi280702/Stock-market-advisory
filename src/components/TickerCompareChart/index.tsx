import { RunningCalculations } from 'hooks/useCompareTickers';
import { HtmlHTMLAttributes, useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';

type Props = {
  calculations: RunningCalculations;
} & HtmlHTMLAttributes<HTMLDivElement>;

type ChartData = {
  date: Date;
  value: number;
};

const TickersCompareChart = ({ calculations, ...divProps }: Props) => {
  const data: { label: string; data: ChartData[] }[] = Object.keys(calculations).map((symbol) => {
    return {
      label: symbol,
      data: Object.entries(calculations[symbol]).map(([date, value]) => ({
        date: new Date(date),
        value
      }))
    };
  });

  const primaryAxis = useMemo(
    (): AxisOptions<ChartData> => ({
      getValue: (datum) => datum.date
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ChartData>[] => [
      {
        getValue: (datum) => datum.value
      }
    ],
    []
  );

  return (
    <div {...divProps}>
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

export default TickersCompareChart;
