type Props = {
  data: CompanyOverview;
};

const CompanyValuation = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Valuation Ratios</h3>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Trailing P/E Ratio:</span> {data.TrailingPE}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Forward P/E Ratio:</span> {data.ForwardPE}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Price-to-Sales Ratio (TTM):</span>{' '}
            {data.PriceToSalesRatioTTM}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Price-to-Book Ratio:</span>{' '}
            {data.PriceToBookRatio}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Enterprise Value to Revenue:</span>{' '}
            {data.EVToRevenue}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Enterprise Value to EBITDA:</span>{' '}
            {data.EVToEBITDA}
          </p>
        </div>
      </div>
    </>
  );
};

export default CompanyValuation;
