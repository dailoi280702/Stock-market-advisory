import TradingChart from 'components/TradingChart';
import { useTradingData } from 'hooks/useTradingData';
import { Tooltip } from 'react-tooltip';

type Props = {
  data: CompanyOverview;
};

const CompanyPerformance = ({ data }: Props) => {
  const { tradingData } = useTradingData('IBM'); // Use the symbol from CompanyOverview

  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Stock Performance</h3>

      {tradingData.state === 'success' && (
        <TradingChart tradingdata={tradingData.data} className="h-96 mb-4" />
      )}

      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="52-week-high-tooltip"
              data-tooltip-content="The highest trading price of the stock in the last 52 weeks."
              data-tooltip-place="top-start"
            >
              52-Week High:
            </span>{' '}
            {data['52WeekHigh']} {data.Currency}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="52-week-low-tooltip"
              data-tooltip-content="The lowest trading price of the stock in the last 52 weeks."
              data-tooltip-place="top-start"
            >
              52-Week Low:
            </span>{' '}
            {data['52WeekLow']} {data.Currency}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="50-day-moving-average-tooltip"
              data-tooltip-content="The average closing price of the stock over the last 50 trading days."
              data-tooltip-place="top-start"
            >
              50-Day Moving Average:
            </span>{' '}
            {data['50DayMovingAverage']} {data.Currency}
          </p>
        </div>

        {/* Additional Financial Metrics */}
        <div className="mb-4">
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="200-day-moving-average-tooltip"
              data-tooltip-content="The average closing price of the stock over the last 200 trading days."
              data-tooltip-place="top-start"
            >
              200-Day Moving Average:
            </span>{' '}
            {data['200DayMovingAverage']} {data.Currency}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="shares-outstanding-tooltip"
              data-tooltip-content="The total number of shares of the company's stock currently held by all shareholders."
              data-tooltip-place="top-start"
            >
              Shares Outstanding:
            </span>{' '}
            {data.SharesOutstanding.toLocaleString()} shares
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="beta-tooltip"
              data-tooltip-content="Beta measures the stock's volatility in relation to the overall market."
              data-tooltip-place="top-start"
            >
              Beta:
            </span>{' '}
            {data.Beta}
          </p>
        </div>
      </div>

      <Tooltip id="52-week-high-tooltip" />
      <Tooltip id="52-week-low-tooltip" />
      <Tooltip id="50-day-moving-average-tooltip" />
      <Tooltip id="200-day-moving-average-tooltip" />
      <Tooltip id="shares-outstanding-tooltip" />
      <Tooltip id="beta-tooltip" />
    </>
  );
};

export default CompanyPerformance;
