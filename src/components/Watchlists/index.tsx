import { PlusIcon } from '@heroicons/react/24/solid';
import AddWatchListModal from 'components/Modal/AddWatchListModal';
import { useWatchlists } from 'hooks/useWatchLists';
import { useState } from 'react';
import WatchlistTabs from './WatchListsTabs';
import Watchlist from 'components/Watlist';
import { useNavigate } from 'react-router-dom';

const Watchlists: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  const [isAddWatchlistOpen, setIsAddWatchlistOpen] = useState(false);
  const { mWatchlist, createWatchlist, renameWatchlist, unsubcribe, removeWatchlist } =
    useWatchlists();
  const [currentWatchlist, setCurrentWatchlist] = useState<Watchlist | null>(null);

  const nagivate = useNavigate();

  const addWatchlist = async (name: string) => {
    await createWatchlist(name);
    setIsAddWatchlistOpen(false);
  };

  return (
    <div {...props}>
      <p className="text-lg font-bold w-full max-w-screen-lg mx-auto leading-none">Your lists</p>

      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-4">
        {mWatchlist.state === 'success' && mWatchlist.data.size > 0 && (
          <WatchlistTabs
            mWatchlist={mWatchlist.data}
            renameWatchlist={renameWatchlist}
            removeWatchlist={removeWatchlist}
            setCurrentWatchlist={setCurrentWatchlist}
          />
        )}

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

      <hr className="h-px mt-8 mb-4 bg-neutral-300 border-0" />

      <div className="flex items-center justify-between">
        <p className="text-lg font-bold w-full max-w-screen-lg mx-auto leading-none">Watchlist</p>
        <button
          className="text-sm font-medium rounded-full text-blue-50 pl-3 pr-4 flex items-center gap-2 h-10 bg-blue-600 hover:bg-blue-500"
          onClick={() => {
            nagivate('market');
          }}
        >
          <PlusIcon className="w-5 h-5 stroke-2" />
          Investment
        </button>
      </div>

      {mWatchlist.state === 'success' && currentWatchlist && (
        <Watchlist symbols={currentWatchlist?.watchlist} unsubcribe={unsubcribe} className="mt-4" />
      )}
    </div>
  );
};

export default Watchlists;
