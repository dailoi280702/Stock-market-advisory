import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

type Props = {
  symbol: string;
  mWatchlist: Map<string, Watchlist>;
  onClose: () => void;
  onSave: (mChecks: Map<string, boolean>) => void;
};

const UpdateWatchlistModal = ({ symbol, mWatchlist, onClose, onSave }: Props) => {
  const getChecks = () => {
    const mChecks: Map<string, boolean> = new Map();
    for (const [id, list] of mWatchlist.entries()) {
      mChecks.set(id, list.watchlist.includes(symbol));
    }
    return mChecks;
  };

  const [mChecks, setMChecks] = useState(getChecks());

  const onCheck = (id: string) => {
    setMChecks((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, !prev.get(id));

      return newMap;
    });
  };

  return (
    <ModalWrapper>
      <p className="text-lg font-medium">Add or delete {symbol} to your lists</p>

      <ul className="flex items-center flex-wrap gap-2">
        {Array.from(mWatchlist.entries()).map(([id, watchlist]) => (
          <div key={id} className="p-2 flex items-center justify-center gap-2">
            <input
              type="checkbox"
              checked={mChecks.get(id)}
              onChange={() => onCheck(id)}
              className="w-4 h-4"
            />
            <p onClick={() => onCheck(id)} className="cursor-pointer">
              {watchlist.name}
            </p>
          </div>
        ))}
      </ul>

      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          className="h-10 rounded-full px-4 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-color"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="h-10 rounded-full px-4 text-sm font-medium text-white bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-500 transition-color"
          onClick={() => onSave(mChecks)}
        >
          Save
        </button>
      </div>
    </ModalWrapper>
  );
};

export default UpdateWatchlistModal;
