import React, { useRef } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { HTMLAttributes, useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import DeleteWatchlistModal from 'components/Modal/DeleteWatchlistModal';

type Props = {
  watchlist: Watchlist;
  iscurrent: boolean;
  rename: (name: string) => void;
  onDelete: () => void;
} & HTMLAttributes<HTMLDivElement>;

const WatchlistTab = (props: Props) => {
  const { watchlist, iscurrent, rename, onDelete, ...divProps } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [name, setName] = useState(watchlist.name);

  const containerRef = useRef<HTMLDivElement>(null);

  const saveEdit = () => {
    if (!name || name === watchlist.name) {
      setName(watchlist.name);
    } else {
      rename(name);
    }

    setIsEditing(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        if (!name || name === watchlist.name) {
          setName(watchlist.name);
        } else {
          rename(name);
        }

        setIsEditing(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [name, rename, watchlist.name]);

  const handleDeleteClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  return (
    <>
      <div
        {...divProps}
        ref={containerRef}
        onDoubleClick={() => setIsEditing(true)}
        className={`h-10 rounded-lg bg-white border border-neutral-300 flex items-center justify-center px-4 transition-all ${
          iscurrent
            ? isEditing
              ? 'border-2 border-blue-600'
              : 'border-b-2 border-b-blue-600 shadow'
            : ''
        }`}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!isEditing}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              saveEdit();
            }
          }}
          className="ring-0 outline-none focus:ring-0 focus:outline-none cursor-pointer"
        />
        <button className="w-6 h-6">
          {isEditing && (
            <TrashIcon
              onClick={handleDeleteClick}
              data-tooltip-id="delete-tooltip"
              className={`w-6 h-6 text-red-600 cursor-pointer`}
            />
          )}
        </button>
      </div>

      {isDeleting && (
        <DeleteWatchlistModal
          onDelete={() => {
            onDelete();
            setIsDeleting(false);
          }}
          onClose={() => setIsDeleting(false)}
        />
      )}
      <Tooltip id="tab-tooltip" content="Double click to enter edit mode" />
      <Tooltip id="delete-tooltip" content="Double click to delete this list" />
    </>
  );
};

export default WatchlistTab;
