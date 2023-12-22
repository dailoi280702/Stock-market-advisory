import { StockSymbol } from 'api/symbols';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const SymbolsTables = ({ symbols }: { symbols: StockSymbol[] }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white border border-gray-300">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="py-1 px-2 border-b" data-tooltip-id="symbol-tooltip">
                Symbol
              </th>
              <th
                className="py-1 px-2 border-b"
                data-tooltip-id="name-tooltip"
                data-tooltip-content="The name of the stock"
              >
                Name
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="last-sale-tooltip">
                Last Sale
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="net-change-tooltip">
                Net Change
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="percent-change-tooltip">
                Percent Change
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="market-cap-tooltip">
                Market Cap
              </th>
              <th className="py-2 px-2 border-b" data-tooltip-id="country-tooltip">
                Country
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="ipo-year-tooltip">
                IPO Year
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="volume-tooltip">
                Volume
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="sector-tooltip">
                Sector
              </th>
              <th className="py-1 px-2 border-b" data-tooltip-id="industry-tooltip">
                Industry
              </th>
            </tr>
          </thead>
          <tbody>
            {symbols.length &&
              symbols.map((symbol) => (
                <tr className="flex flex-col items-start md:table-row text-sm" key={symbol.symbol}>
                  <td className="py-1 px-4 md:px-2 border-b font-bold w-full md:w-fit md:font-normal md:table-cell">
                    <Link className="hover:text-blue-500" to={`/details/${symbol.symbol}`}>
                      {symbol.symbol}
                    </Link>
                  </td>
                  <td className="py-1 px-4 md:px-2 md:border-b">
                    <Link className="hover:text-blue-500" to={`/details/${symbol.symbol}`}>
                      <span className="font-medium md:hidden">Name: </span>
                      {symbol.name}
                    </Link>
                  </td>
                  <td className="py-1 px-4 md:px-2 md:border-b">
                    <span className="font-medium md:hidden">Last sale: </span>
                    {symbol.last_sale}
                  </td>
                  <td
                    className={`py-1 px-4 md:px-2 md:border-b ${
                      symbol.net_change != '' && symbol.net_change[0] !== '-'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    <span className="font-medium md:hidden">Net change: </span>
                    {symbol.net_change}
                  </td>
                  <td
                    className={`py-1 px-4 md:px-2 md:border-b ${
                      symbol.percent_change != '' && symbol.percent_change[0] !== '-'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    <span className="font-medium md:hidden">Percent change: </span>
                    {symbol.percent_change}
                  </td>
                  <td className="py-1 px-4 md:px-2 md:border-b">
                    <span className="font-medium md:hidden">Market cap: </span>
                    {symbol.market_cap}
                  </td>
                  <td className="py-1 px-4 md:px-2 md:border-b">
                    <span className="font-medium md:hidden">Country: </span>
                    {symbol.country}
                  </td>
                  <td className="py-1 px-4 md:px-2 md:border-b">
                    <span className="font-medium md:hidden">IPO year: </span>
                    {symbol.ipo_year}
                  </td>
                  <td className="py-1 px-4 md:px-2 md:border-b">
                    <span className="font-medium md:hidden">Volume: </span>
                    {symbol.volume}
                  </td>
                  <td className="py-1 px-4 md:px-2 md:border-b">
                    <span className="font-medium md:hidden">Sector: </span>
                    {symbol.sector}
                  </td>
                  <td className="py-1 px-4 md:px-2 border-b w-full md:w-fit">
                    <span className="font-medium md:hidden">Industry: </span>
                    {symbol.industry}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Tooltip
        id="symbol-tooltip"
        content="The stock symbol represents the unique identifier for a particular stock."
      />
      <Tooltip
        id="name-tooltip"
        content="The name of the stock provides information about the company associated with the stock symbol."
      />
      <Tooltip
        id="last-sale-tooltip"
        content="The last sale price represents the most recent price at which the stock was traded."
      />
      <Tooltip
        id="net-change-tooltip"
        content="The net change shows the difference between the current and previous stock price."
      />
      <Tooltip
        id="percent-change-tooltip"
        content="The percent change indicates the percentage change in the stock price."
      />
      <Tooltip
        id="market-cap-tooltip"
        content="Market cap is the total market value of a company's outstanding shares of stock."
      />
      <Tooltip
        id="country-tooltip"
        content="The country where the company associated with the stock is located."
      />
      <Tooltip
        id="ipo-year-tooltip"
        content="The IPO year represents the year in which the company went public."
      />
      <Tooltip
        id="volume-tooltip"
        content="Volume refers to the total number of shares traded for a particular stock."
      />
      <Tooltip
        id="sector-tooltip"
        content="The sector indicates the industry category to which the company belongs."
      />
      <Tooltip
        id="industry-tooltip"
        content="The industry represents the specific business sector of the company."
      />
    </>
  );
};

export default SymbolsTables;
