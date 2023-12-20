type Props = {
  data: CompanyOverview;
};

const CompanyFinancialInfo = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Financial Metrics</h3>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Market Cap:</span> {data.MarketCapitalization}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">EBITDA:</span> {data.EBITDA}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">P/E Ratio:</span> {data.PERatio}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">PEG Ratio:</span> {data.PEGRatio}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Book Value:</span> {data.BookValue}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Dividend Per Share:</span>{' '}
            {data.DividendPerShare}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Dividend Yield:</span> {data.DividendYield}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">EPS:</span> {data.EPS}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Revenue Per Share (TTM):</span>{' '}
            {data.RevenuePerShareTTM}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Profit Margin:</span> {data.ProfitMargin}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Operating Margin (TTM):</span>{' '}
            {data.OperatingMarginTTM}
          </p>
        </div>
      </div>
    </>
  );
};

export default CompanyFinancialInfo;
