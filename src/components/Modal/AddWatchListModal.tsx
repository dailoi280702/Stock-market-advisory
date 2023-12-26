import { useRef } from 'react';

type Props = {
  addWatchlist: (watchlist: string) => void;
  onClose: () => void;
};

const AddWatchListModal = ({ addWatchlist, onClose }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="bg-white/10 backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full flex items-center flex-col transition-all">
        <div className="w-full max-w-screen-sm h-full sm:h-auto mx-auto my-auto bg-white sm:rounded-lg p-4 sm:p-8 sm:border sm:border-neutral-300 sm:shadow-lg">
          <p className="text-lg font-medium">Create new list</p>

          <input
            ref={nameRef}
            className="border p-3 rounded-lg h-12 placeholder:text-neutral-700 w-full mt-4"
            placeholder="List name"
            required
          />

          <div className="flex items-center justify-end gap-4 mt-8">
            <button
              className="h-10 rounded-full px-4 text-sm font-medium text-blue-600 hover:bg-blue-50"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              className="h-10 rounded-full px-4 text-sm font-medium text-white bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-500"
              onClick={() => {
                addWatchlist(nameRef.current!.value);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWatchListModal;
