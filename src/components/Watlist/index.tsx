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
      {mSymbols.state === 'success' && <div>{JSON.stringify(mSymbols.data)}</div>}
      {mSymbols.state === 'success' && mSymbols.data.size && mSymbols.data.has(symbols) && (
        <>
          {mSymbols.data.get(symbols)!.map((symbol) => (
            <div onClick={() => unsubcribe(symbol.symbol)}>{symbol.symbol}</div>
          ))}
        </>
      )}
    </div>
  );
};
export default Watchlist;
