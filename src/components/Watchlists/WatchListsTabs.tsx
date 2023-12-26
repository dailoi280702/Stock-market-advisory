import { useState } from 'react';
import WatchlistTab from './WatchListsTab';

type Props = {
  mWatchlist: Map<string, Watchlist>;
};

const WatchlistTabs = ({ mWatchlist }: Props) => {
  const [current, setCurrent] = useState(mWatchlist.entries().next().value[0]);

  return (
    <>
      {Array.from(mWatchlist.entries()).map(([id, watchlist]) => (
        <WatchlistTab
          key={id}
          watchlist={watchlist}
          iscurrent={current === id}
          onClick={() => setCurrent(id)}
        />
      ))}
    </>
  );
};

export default WatchlistTabs;
