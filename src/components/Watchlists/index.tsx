import { PlusIcon } from '@heroicons/react/24/solid';
import AddWatchListModal from 'components/Modal/AddWatchListModal';
import { useWatchlists } from 'hooks/useWatchLists';
import { useState } from 'react';
import WatchlistTabs from './WatchListsTabs';

const Watchlists: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  const [isAddWatchlistOpen, setIsAddWatchlistOpen] = useState(false);
  const { createWatchlist, mWatchlist } = useWatchlists();

  const addWatchlist = async (name: string) => {
    await createWatchlist(name);
    setIsAddWatchlistOpen(false);
  };

  return (
    <div {...props}>
      <p className="text-lg font-bold w-full max-w-screen-lg mx-auto leading-none">Watch List</p>

      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-4">
        {mWatchlist.state === 'success' && <WatchlistTabs mWatchlist={mWatchlist.data} />}

        <button
          className="text-sm font-medium rounded-full text-blue-600 pl-3 pr-4 flex items-center gap-2 h-10 hover:bg-blue-100"
          onClick={() => setIsAddWatchlistOpen(true)}
        >
          <PlusIcon className="w-5 h-5 stroke-2" />
          New watchlist
        </button>
      </div>

      {isAddWatchlistOpen && (
        <AddWatchListModal
          addWatchlist={addWatchlist}
          onClose={() => setIsAddWatchlistOpen(false)}
        />
      )}
    </div>
  );
};

export default Watchlists;
