import CompanyOverview from 'components/CompanyOverview';
import { useLoaderData, useParams } from 'react-router-dom';
import { useWatchlists } from 'hooks/useWatchLists';
import { PencilIcon } from '@heroicons/react/24/outline';
import UpdateWatchlistModal from 'components/Modal/UpdateWatchlistModal';
import { useState } from 'react';

const CompanyDetail = () => {
  const { symbol } = useParams();
  const data = useLoaderData() as CompanyOverview;
  data.Symbol = symbol ? symbol : 'IBM';
  const { mWatchlist, updateWatchlistsInBatches } = useWatchlists();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto px-4">
        <div className="flex items-center gap-4 mt-4">
          <p className="text-lg font-bold m-x">Stock Information</p>

          {mWatchlist.state === 'success' && (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full h-10 w-10 sm:w-auto sm:px-4 text-sm font-medium hover:bg-blue-50 text-blue-600 flex items-center justify-center gap-2"
            >
              <PencilIcon className="h-6 w-6 stroke-2" />
              <p className="hidden sm:block">Add or remove this stock to your wishlists</p>
            </button>
          )}
        </div>

        <CompanyOverview data={data} />
      </div>

      {mWatchlist.state === 'success' && isEditing && (
        <UpdateWatchlistModal
          symbol={data.Symbol}
          mWatchlist={mWatchlist.data}
          onClose={() => setIsEditing(false)}
          onSave={(mChecks) => {
            updateWatchlistsInBatches(data.Symbol, mChecks);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
};

export default CompanyDetail;
