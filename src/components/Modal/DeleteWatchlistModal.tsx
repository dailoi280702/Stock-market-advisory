import ModalWrapper from './ModalWrapper';

type Props = {
  onDelete: () => void;
  onClose: () => void;
};

const DeleteWatchlistModal = ({ onDelete, onClose }: Props) => {
  return (
    <ModalWrapper>
      <p className="text-lg font-medium">Delete watchlist confirm</p>
      <p className="text-base">
        Areyou sure you want to delete the list, this Action can't be undone
      </p>
      <div className="flex items-center justify-end gap-4 mt-8">
        <button
          className="h-10 rounded-full px-4 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-color"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="h-10 rounded-full px-4 text-sm font-medium text-white bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed hover:bg-blue-500 transition-color"
          onClick={onDelete}
        >
          Conitnue
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteWatchlistModal;
