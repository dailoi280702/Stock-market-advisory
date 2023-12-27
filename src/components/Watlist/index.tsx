import { ArrowUpIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import { useWatchlist } from 'hooks/useWatchlist';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { getColorFromString } from 'src/util';

type Props = {
  symbols: string[];
  unsubcribe: (symbol: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const Watchlist = ({ symbols, unsubcribe, ...divProps }: Props) => {
  const { mSymbols } = useWatchlist(symbols);

  return (
    <div {...divProps}>
      {mSymbols.state === 'success' && (
        <>
          {Array.from(mSymbols.data.entries()).map(([symbol, data]) => (
            <Link
              to={`/details/${data.symbol}`}
              key={symbol}
              className="py-2 border-t border-neutral-300 flex items-center cursor-pointer hover:bg-neutral-100 group"
            >
              <p
                className={`flex-0 mx-2 py-1 px-3 rounded-lg text-white min-w-[80px] text-center`}
                style={{ backgroundColor: `${getColorFromString(data.symbol)}` }}
              >
                {data.symbol}
              </p>
              <p className="flex-[2] truncate mx-2" data-tooltip-id={data.symbol + '-stock-name'}>
                {data.name}
              </p>
              <p className="flex-1 text-right mx-2">{data.last_sale}</p>
              <p
                className={`flex-1 text-right mx-2  ${
                  data.net_change != '' && data.net_change[0] !== '-'
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}
              >
                {data.net_change}
              </p>

              <div className="flex flex-1">
                <div className="flex-1" />
                {data.net_change != '' && data.net_change[0] !== '-' ? (
                  <div className="flex-1 text-right mx-2 px-2 py-1 rounded-lg bg-green-600/10 text-green-700 flex items-center justify-center gap-2">
                    <ArrowUpIcon className="h-4 w-4 stroke-2" />
                    {data.percent_change}
                  </div>
                ) : (
                  <div className="flex-1 text-right mx-2 px-2 py-1 rounded-lg bg-red-600/10 text-red-700 flex items-center justify-center gap-2">
                    <ArrowDownIcon className="h-4 w-4 stroke-2" />
                    {data.percent_change.substring(1)}
                  </div>
                )}
              </div>

              <Tooltip id={data.symbol + '-stock-name'} content={data.name} />
              <div className="h-10 w-10 flex items-center justify-center min-w-max mx-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    unsubcribe(data.symbol);
                  }}
                  className="h-10 w-10 hidden group-hover:flex items-center justify-center rounded-full hover:bg-neutral-200"
                >
                  <XMarkIcon className="h-6 w-6 stroke-2" />
                </button>
              </div>
            </Link>
          ))}

          {mSymbols.data.size === 0 && (
            <div className="w-full flex flex-col justify-center items-center gap-4 my-16">
              <p className="text-lg">Nothing in this watchlist yet</p>

              <p className="text-sm text-neutral-700">Track investments you care about here</p>
              <Link
                to="/market"
                className="flex items-center justify-center gap-2 pl-3 pr-4 text-blue-500 hover:bg-blue-100 rounded-full text-sm font-medium h-10"
              >
                <PlusIcon className="w-5 h-5 stroke-2" />
                Add investments
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Watchlist;
