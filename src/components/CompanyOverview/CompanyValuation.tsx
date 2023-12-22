import { Tooltip } from 'react-tooltip';

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
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="trailing-pe-ratio-tooltip"
              data-tooltip-content="The ratio of the company's stock price to its earnings per share (EPS) over the last 12 months."
              data-tooltip-place="top-start"
            >
              Trailing P/E Ratio:
            </span>{' '}
            {data.TrailingPE}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="forward-pe-ratio-tooltip"
              data-tooltip-content="The ratio of the company's stock price to its estimated earnings per share (EPS) for the next 12 months."
              data-tooltip-place="top-start"
            >
              Forward P/E Ratio:
            </span>{' '}
            {data.ForwardPE}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="price-to-sales-ratio-tooltip"
              data-tooltip-content="The ratio of the company's stock price to its revenue per share over the trailing twelve months."
              data-tooltip-place="top-start"
            >
              Price-to-Sales Ratio (TTM):
            </span>{' '}
            {data.PriceToSalesRatioTTM}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="price-to-book-ratio-tooltip"
              data-tooltip-content="The ratio of the company's stock price to its book value per share."
              data-tooltip-place="top-start"
            >
              Price-to-Book Ratio:
            </span>{' '}
            {data.PriceToBookRatio}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="ev-to-revenue-ratio-tooltip"
              data-tooltip-content="The ratio of the company's enterprise value to its revenue over the trailing twelve months."
              data-tooltip-place="top-start"
            >
              Enterprise Value to Revenue:
            </span>{' '}
            {data.EVToRevenue}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="ev-to-ebitda-ratio-tooltip"
              data-tooltip-content="The ratio of the company's enterprise value to its earnings before interest, taxes, depreciation, and amortization (EBITDA)."
              data-tooltip-place="top-start"
            >
              Enterprise Value to EBITDA:
            </span>{' '}
            {data.EVToEBITDA}
          </p>
        </div>
      </div>

      <Tooltip id="trailing-pe-ratio-tooltip" />
      <Tooltip id="forward-pe-ratio-tooltip" />
      <Tooltip id="price-to-sales-ratio-tooltip" />
      <Tooltip id="price-to-book-ratio-tooltip" />
      <Tooltip id="ev-to-revenue-ratio-tooltip" />
      <Tooltip id="ev-to-ebitda-ratio-tooltip" />
    </>
  );
};

export default CompanyValuation;
