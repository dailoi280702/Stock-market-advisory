import TradingChart from 'components/TradingChart';
import { useTradingData } from 'hooks/useTradingData';

type Props = {
  data: CompanyOverview;
};

const CompanyPerformance = ({ data }: Props) => {
  const { tradingData } = useTradingData('IBM');

  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Stock Performance</h3>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">52-Week High:</span> {data['52WeekHigh']}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">52-Week Low:</span> {data['52WeekLow']}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">50-Day Moving Average:</span>{' '}
            {data['50DayMovingAverage']}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">200-Day Moving Average:</span>{' '}
            {data['200DayMovingAverage']}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Shares Outstanding:</span>{' '}
            {data.SharesOutstanding}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Beta:</span> {data.Beta}
          </p>
        </div>
      </div>

      {tradingData.state === 'success' && <TradingChart tradingData={tradingData.data} />}
    </>
  );
};

export default CompanyPerformance;
