import { useEffect, useState } from 'react';
import { StockSymbol, getSymbols, getSymbolsResponse } from '../../api/symbols';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export type ServerState =
  | {
      state: 'loading';
    }
  | {
      state: 'success';
      data: unknown;
    }
  | {
      state: 'error';
      error: Error;
    };

const SymbolsTables = ({ symbols }: { symbols: StockSymbol[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm bg-white border border-gray-300">
        <thead className="hidden md:table-header-group">
          <tr>
            <th className="py-1 px-2 border-b">Symbol</th>
            <th className="py-1 px-2 border-b">Name</th>
            <th className="py-1 px-2 border-b">Last Sale</th>
            <th className="py-1 px-2 border-b">Net Change</th>
            <th className="py-1 px-2 border-b">Percent Change</th>
            <th className="py-1 px-2 border-b">Market Cap</th>
            <th className="py-2 px-2 border-b">Country</th>
            <th className="py-1 px-2 border-b">IPO Year</th>
            <th className="py-1 px-2 border-b">Volume</th>
            <th className="py-1 px-2 border-b">Sector</th>
            <th className="py-1 px-2 border-b">Industry</th>
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
  );
};

const SymbolsList = () => {
  const [serverState, setServerState] = useState<ServerState>({ state: 'loading' });
  const [search, setSearch] = useState({ page: 1, text: '' });
  const [text, setText] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSymbols(50, search.page, search.text);
        setServerState({ state: 'success', data });
      } catch (e) {
        console.log(e);
        setServerState({ state: 'error', error: e as Error });
      }
    };

    getData();
  }, [search]);

  if (serverState.state === 'loading') {
    return <></>;
  }

  if (serverState.state === 'error') {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <p className="text-lg font-bold px-4 w-full max-w-screen-lg mx-auto leading-none">
        Stock symbols
      </p>

      <div className="flex items-center max-w-screen-lg mx-auto p-4 w-screen">
        <input
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearch((s) => ({ ...s, text }));
            }
          }}
          className="border p-3 rounded-lg h-12 placeholder:text-neutral-700"
          placeholder="symbol or name"
          value={text}
        />

        <span className="flex-1" />

        <p className="text-sm mx-2">
          Page {search.page} of {Math.ceil((serverState.data as getSymbolsResponse).total / 50)}
        </p>
        <button
          className="h-10 w-10 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-600/10 transition-colors"
          onClick={() => setSearch((s) => ({ ...s, page: s.page - 1 }))}
          disabled={search.page === 1}
        >
          <ChevronLeftIcon className="h-6 w-6 m-auto stroke-2" />
        </button>
        <span className="px-1" />
        <button
          className="h-10 w-10 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-900/10 transition-colors"
          onClick={() => setSearch((s) => ({ ...s, page: s.page + 1 }))}
          disabled={search.page === Math.ceil((serverState.data as getSymbolsResponse).total / 50)}
        >
          <ChevronRightIcon className="h-6 w-6 m-auto stroke-2" />
        </button>
      </div>
      <SymbolsTables symbols={(serverState.data as getSymbolsResponse).data} />
    </>
  );
};

export default SymbolsList;
