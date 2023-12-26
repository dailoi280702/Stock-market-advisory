import { useWatchlist } from 'hooks/useWatchlist';
import { HTMLAttributes } from 'react';

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
            <div key={symbol} className="">
              {data.name}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default Watchlist;
