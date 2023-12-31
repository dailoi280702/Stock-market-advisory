import { Tooltip } from 'react-tooltip';

type Props = {
  data: CompanyOverview;
};

const formatCurrency = (value: string, currency: string): string => {
  return `${Number(value).toLocaleString()} ${currency}`;
};

const CompanyFinancialInfo = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Financial Metrics</h3>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="market-cap-tooltip"
              data-tooltip-content="The total market value of a company's outstanding shares of stock."
              data-tooltip-place="top-start"
            >
              Market Cap:
            </span>{' '}
            {formatCurrency(data.MarketCapitalization, data.Currency)}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="ebitda-tooltip"
              data-tooltip-content="Earnings Before Interest, Taxes, Depreciation, and Amortization."
              data-tooltip-place="top-start"
            >
              EBITDA:
            </span>{' '}
            {formatCurrency(data.EBITDA, data.Currency)}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="pe-ratio-tooltip"
              data-tooltip-content="Price-to-Earnings Ratio. It measures the valuation of a company's stock."
              data-tooltip-place="top-start"
            >
              P/E Ratio:
            </span>{' '}
            {data.PERatio}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="peg-ratio-tooltip"
              data-tooltip-content="PEG Ratio is a valuation metric that factors in a company's growth rate."
              data-tooltip-place="top-start"
            >
              PEG Ratio:
            </span>{' '}
            {data.PEGRatio}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="book-value-tooltip"
              data-tooltip-content="The net asset value of a company, calculated as total assets minus total liabilities."
              data-tooltip-place="top-start"
            >
              Book Value:
            </span>{' '}
            {formatCurrency(data.BookValue, data.Currency)}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="dividend-per-share-tooltip"
              data-tooltip-content="The amount of money a company pays to its shareholders in the form of dividends, per share."
              data-tooltip-place="top-start"
            >
              Dividend Per Share:
            </span>{' '}
            {formatCurrency(data.DividendPerShare, data.Currency)}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="dividend-yield-tooltip"
              data-tooltip-content="Dividend Yield is the annual dividend income an investor can expect to receive, expressed as a percentage of the stock's current market price."
              data-tooltip-place="top-start"
            >
              Dividend Yield:
            </span>{' '}
            {`${data.DividendYield}%`}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="eps-tooltip"
              data-tooltip-content="Earnings Per Share is a company's net profit divided by the number of its outstanding shares of common stock."
              data-tooltip-place="top-start"
            >
              EPS:
            </span>{' '}
            {formatCurrency(data.EPS, data.Currency)}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="revenue-per-share-tooltip"
              data-tooltip-content="Revenue Per Share (TTM) is the total revenue generated by a company divided by its weighted average number of shares outstanding."
              data-tooltip-place="top-start"
            >
              Revenue Per Share (TTM):
            </span>{' '}
            {formatCurrency(data.RevenuePerShareTTM, data.Currency)}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="profit-margin-tooltip"
              data-tooltip-content="Profit Margin is the percentage of revenue that exceeds the cost of goods sold and other expenses, indicating how much profit a company makes on its total sales."
              data-tooltip-place="top-start"
            >
              Profit Margin:
            </span>{' '}
            {`${data.ProfitMargin}%`}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="operating-margin-tooltip"
              data-tooltip-content="Operating Margin (TTM) is a profitability ratio calculated as operating income divided by revenue, indicating the percentage of revenue that remains after covering operating expenses."
              data-tooltip-place="top-start"
            >
              Operating Margin (TTM):
            </span>{' '}
            {`${data.OperatingMarginTTM}%`}
          </p>
        </div>
      </div>

      <Tooltip id="market-cap-tooltip" />
      <Tooltip id="ebitda-tooltip" />
      <Tooltip id="pe-ratio-tooltip" />
      <Tooltip id="peg-ratio-tooltip" />
      <Tooltip id="book-value-tooltip" />
      <Tooltip id="dividend-per-share-tooltip" />
      <Tooltip id="dividend-yield-tooltip" />
      <Tooltip id="eps-tooltip" />
      <Tooltip id="revenue-per-share-tooltip" />
      <Tooltip id="profit-margin-tooltip" />
      <Tooltip id="operating-margin-tooltip" />
    </>
  );
};

export default CompanyFinancialInfo;
