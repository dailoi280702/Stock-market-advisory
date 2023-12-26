import { HTMLAttributes, useState } from 'react';
import { Tooltip } from 'react-tooltip';

type Props = {
  watchlist: Watchlist;
  iscurrent: boolean;
  rename: (name: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const WatchlistTab = (props: Props) => {
  const { watchlist, iscurrent, rename, ...divProps } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(watchlist.name);

  const saveEdit = () => {
    if (!name || name === watchlist.name) {
      setName(watchlist.name);
    } else {
      rename(name);
    }

    setIsEditing(false);
  };

  return (
    <>
      <div
        {...divProps}
        className={`h-10 rounded-lg bg-white border border-neutral-300 flex items-center px-4 transition-all ${
          iscurrent ? 'border-b-2 border-b-blue-600' : ''
        }`}
      >
        <input
          data-tooltip-id="tab-tooltip"
          data-tooltip-place="bottom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!isEditing}
          onDoubleClick={() => setIsEditing(true)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              saveEdit();
            }
          }}
          className="ring-0 outline-none focus:ring-0 focus:outline-none cursor-pointer"
        />
      </div>

      <Tooltip id="tab-tooltip" content="Double click to enter edit mode" />
    </>
  );
};

export default WatchlistTab;
