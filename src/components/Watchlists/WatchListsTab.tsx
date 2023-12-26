import { HTMLAttributes } from 'react';

type Props = {
  watchlist: Watchlist;
  iscurrent: boolean;
} & HTMLAttributes<HTMLDivElement>;

const WatchlistTab = (props: Props) => {
  const { watchlist, iscurrent, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={`h-10 rounded-lg bg-white border border-neutral-300 flex items-center px-4 ${
        iscurrent ? 'border-b-2 border-b-blue-600' : ''
      }`}
    >
      <input
        value={watchlist.name}
        readOnly
        className="ring-0 outline-none focus:ring-0 focus:outline-none"
      />
    </div>
  );
};

export default WatchlistTab;
