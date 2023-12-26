import { useState } from 'react';
import WatchlistTab from './WatchListsTab';

type Props = {
  mWatchlist: Map<string, Watchlist>;
  renameWatchlist: (id: string, name: string) => void;
};

const WatchlistTabs = ({ mWatchlist, renameWatchlist }: Props) => {
  const [current, setCurrent] = useState(mWatchlist.entries().next().value[0]);

  return (
    <>
      {Array.from(mWatchlist.entries()).map(([id, watchlist]) => (
        <WatchlistTab
          key={id}
          rename={(name) => {
            if (name !== '' && name != watchlist.name) {
              renameWatchlist(id, name);
            }
          }}
          watchlist={watchlist}
          iscurrent={current === id}
          onClick={() => setCurrent(id)}
        />
      ))}
    </>
  );
};

export default WatchlistTabs;
