import TickersCompareChart from 'components/TickerCompareChart';
import { useCompareTickers } from 'hooks/useCompareTickers';
import { HtmlHTMLAttributes } from 'react';
import AnalyticsStament from './AnalyticsStatement';

type Props = {
  tickers: string[];
} & HtmlHTMLAttributes<HTMLDivElement>;

const WatchlistAnalytics = ({ tickers, ...divProps }: Props) => {
  const serverState = useCompareTickers(tickers);

  return (
    <div {...divProps}>
      {serverState.state === 'loading' && (
        <div className="h-96 w-full mb-4 text-center">Loading data, please wait...</div>
      )}

      {serverState.state === 'success' && (
        <>
          <AnalyticsStament
            calculations={serverState.data.calculations}
            className="w-full mb-4 p-4 border rounded-md border-neutral-300 text-base"
          />

          <p className="py-2 text-sm">Moving mean (20 days) - {tickers.join(', ')}</p>
          <TickersCompareChart calculations={serverState.data.calculations} className="h-96" />
        </>
      )}
    </div>
  );
};

export default WatchlistAnalytics;
