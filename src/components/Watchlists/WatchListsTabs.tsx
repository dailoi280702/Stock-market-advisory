import { useEffect, useState } from 'react';
import WatchlistTab from './WatchListsTab';

type Props = {
  mWatchlist: Map<string, Watchlist>;
  renameWatchlist: (id: string, name: string) => void;
  removeWatchlist: (id: string) => void;
  setCurrentWatchlist: (watlist: Watchlist) => void;
};

const WatchlistTabs = ({
  mWatchlist,
  renameWatchlist,
  setCurrentWatchlist,
  removeWatchlist
}: Props) => {
  const [current, setCurrent] = useState(mWatchlist.entries().next().value[0]);

  useEffect(() => {
    if (mWatchlist.has(current)) {
      setCurrentWatchlist(mWatchlist.get(current)!);
    }
  }, [current, mWatchlist, setCurrentWatchlist]);

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
          onDelete={() => {
            removeWatchlist(id);
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
