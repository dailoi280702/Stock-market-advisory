import { PlusIcon } from '@heroicons/react/24/outline';
import AddWatchListModal from 'components/Modal/AddWatchListModal';
import { useWatchlists } from 'hooks/useWatchLists';
import { useState } from 'react';
import WatchlistTabs from './WatchListsTabs';
import Watchlist from 'components/Watchlist';
import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import RecommendedTickers from 'components/RecommendedTickers';

const currentWatchlistAtom = atom<string | null>(null);

const Watchlists: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
  const [isAddWatchlistOpen, setIsAddWatchlistOpen] = useState(false);
  const { mWatchlist, createWatchlist, renameWatchlist, unsubcribe, subcribe, removeWatchlist } =
    useWatchlists();
  const [currentWatchlist, setCurrentWatchlist] = useAtom(currentWatchlistAtom);

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

      {/* <hr className="h-px mt-8 mb-4 bg-neutral-300 border-0" /> */}

      {mWatchlist.state === 'success' && currentWatchlist && mWatchlist.data.has(currentWatchlist) && (
        <>
          <div className="flex items-center justify-between mt-8">
            <p className="text-lg w-full max-w-screen-lg mx-auto leading-none">
              {mWatchlist.data.get(currentWatchlist)!.name}
            </p>
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

          <Watchlist
            symbols={mWatchlist.data.get(currentWatchlist)!.watchlist}
            unsubcribe={(symbol) => unsubcribe(currentWatchlist, symbol)}
            className="mt-4 text-sm"
          />
          <div className="mt-8">
            {mWatchlist.data.get(currentWatchlist)!.watchlist.length > 0 && (
              <RecommendedTickers
                watchlist={mWatchlist.data.get(currentWatchlist)!}
                subcribe={(symbol) => {
                  subcribe(currentWatchlist, symbol);
                }}
                className="rounded-lg border border-neutral-300 p-4 w-96 text-sm"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlists;
