type Props = {
  data: CompanyOverview;
};

const CompanyStatement = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Financial Statements</h3>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Revenue (TTM):</span> {data.RevenueTTM}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Gross Profit (TTM):</span>{' '}
            {data.GrossProfitTTM}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Diluted EPS (TTM):</span> {data.DilutedEPSTTM}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Quarterly Earnings Growth (YoY):</span>{' '}
            {data.QuarterlyEarningsGrowthYOY}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Quarterly Revenue Growth (YoY):</span>{' '}
            {data.QuarterlyRevenueGrowthYOY}
          </p>
        </div>
      </div>
    </>
  );
};

export default CompanyStatement;
