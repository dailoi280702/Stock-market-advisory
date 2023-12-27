import { ArrowDownIcon, ArrowUpIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useWatchlist } from 'hooks/useWatchlist';
import { useRecommendTickers } from 'hooks/userRecommendTickers';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { getColorFromString } from 'src/util';

type Props = {
  watchlist: Watchlist;
  subcribe: (symbol: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const RecommendedTickers = ({ watchlist, subcribe, ...divProps }: Props) => {
  const recommendedTickers = useRecommendTickers(watchlist);
  const { mSymbols } = useWatchlist(recommendedTickers);

  return (
    <div {...divProps}>
      <p className="text-base mb-2">Related to your watchlist</p>

      {mSymbols.state === 'success' && (
        <>
          {Array.from(mSymbols.data.entries()).map(([symbol, data]) => (
            <Link
              to={`/details/${data.symbol}`}
              key={symbol}
              className="py-2 border-t border-neutral-300 flex items-center cursor-pointer hover:bg-neutral-100 group"
            >
              <p
                className={`px-3 py-1 rounded-lg text-white min-w-[80px] text-center w-fit truncate`}
                style={{ backgroundColor: `${getColorFromString(data.symbol)}` }}
              >
                {data.symbol}
              </p>
              <p className="flex-1 text-right mx-2">{data.last_sale}</p>
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
                    subcribe(data.symbol);
                  }}
                  className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-neutral-200 text-neutral-600"
                >
                  <PlusCircleIcon className="h-6 w-6 stroke-2" />
                </button>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default RecommendedTickers;
