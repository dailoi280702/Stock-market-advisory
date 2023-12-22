import { Tooltip } from 'react-tooltip';

type Props = {
  data: CompanyOverview;
};

const getRatingColor = (rating: string): string => {
  return rating === 'Buy' ? 'text-red-500' : 'text-green-500';
};

const getTrendColor = (trend: string): string => {
  return trend === 'Upward' ? 'text-red-500' : 'text-green-500';
};

const CompanyAnalyst = ({ data }: Props) => {
  // Temporary values (you can modify this based on your business logic)
  const analystRating = data.PERatio < '15' ? 'Buy' : 'Sell';
  const recommendationTrend = data.QuarterlyEarningsGrowthYOY > '0' ? 'Upward' : 'Downward';

  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Analyst Recommendations</h3>
      <div className="mb-4">
        <p className="mb-2">
          <span
            className="font-bold text-gray-800"
            data-tooltip-id="analyst-target-price-tooltip"
            data-tooltip-content="The average target price set by analysts covering the stock."
            data-tooltip-place="top-start"
          >
            Analyst Target Price:
          </span>{' '}
          {data.AnalystTargetPrice}
        </p>
        <p className={`mb-2 ${getRatingColor(analystRating)}`}>
          <span
            className="font-bold text-gray-800"
            data-tooltip-id="analyst-rating-tooltip"
            data-tooltip-content="The overall rating given by analysts for the stock (e.g., Buy, Hold, Sell)."
            data-tooltip-place="top-start"
          >
            Analyst Rating:
          </span>{' '}
          {analystRating}
        </p>
        <p className="mb-2">
          <span
            className="font-bold text-gray-800"
            data-tooltip-id="earnings-estimate-tooltip"
            data-tooltip-content="The average earnings estimate for the next quarter."
            data-tooltip-place="top-start"
          >
            Earnings Estimate (Next Quarter):
          </span>{' '}
          $2.45 per share
        </p>
        <p className={`mb-2 ${getTrendColor(recommendationTrend)}`}>
          <span
            className="font-bold text-gray-800"
            data-tooltip-id="recommendation-trend-tooltip"
            data-tooltip-content="The trend in analyst recommendations over a specified period."
            data-tooltip-place="top-start"
          >
            Recommendation Trend:
          </span>{' '}
          {recommendationTrend}
        </p>
      </div>

      <Tooltip id="analyst-target-price-tooltip" />
      <Tooltip id="analyst-rating-tooltip" />
      <Tooltip id="earnings-estimate-tooltip" />
      <Tooltip id="recommendation-trend-tooltip" />
    </>
  );
};

export default CompanyAnalyst;
