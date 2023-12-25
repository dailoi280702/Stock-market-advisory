import CompanyOverview from 'components/CompanyOverview';
import { useLoaderData, useParams } from 'react-router-dom';
import { useWishList } from 'hooks/useWishlist';

const CompanyDetail = () => {
  const { symbol } = useParams();
  const data = useLoaderData() as CompanyOverview;
  const { subcribe, unsubcribe, wishlist } = useWishList();
  data.Symbol = symbol ? symbol : 'IBM';

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto px-4">
        <div className="flex items-center gap-4 mt-4">
          <p className="text-lg font-bold m-x">Company Informations</p>

          {wishlist.state == 'success' ? (
            wishlist.data.length && wishlist.data.includes(data.Symbol) ? (
              <button
                onClick={() => unsubcribe(data.Symbol)}
                className="rounded-full h-10 px-4 text-sm font-medium hover:bg-neutral-200 text-red-600"
              >
                Remove from watch list
              </button>
            ) : (
              <button
                onClick={() => subcribe(data.Symbol)}
                className="rounded-full h-10 px-4 text-sm font-medium hover:bg-neutral-200 text-blue-600"
              >
                Add to watch list
              </button>
            )
          ) : null}
        </div>
        <CompanyOverview data={data} />
      </div>
    </>
  );
};

export default CompanyDetail;
