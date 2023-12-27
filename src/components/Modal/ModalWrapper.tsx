import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClose?: () => void;
};

const ModalWrapper = ({ children, onClose }: Props) => {
  return (
    <>
      <div
        onClick={() => {
          if (onClose) {
            onClose();
          }
        }}
        className="bg-white/10 backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full flex items-center flex-col"
      >
        <div className="w-full max-w-screen-sm h-full sm:h-auto mx-auto my-auto bg-white sm:rounded-lg p-4 sm:p-8 sm:border sm:border-neutral-300 sm:shadow-lg">
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
