import { IoClose } from 'react-icons/io5';
import ButtonDefault from './ButtonDefault';

// eslint-disable-next-line react/prop-types
const ModalContent = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center p-10">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="min-w-[700px] rounded-md bg-white z-50 flex flex-col justify-between ">
          <div className="flex p-3 items-center justify-between">
            <span className="font-semibold text-xl">{title}</span>
            <span>
              <IoClose className="text-xl cursor-pointer" onClick={onClose} />
            </span>
          </div>
          <div className="max-h-[500px]  overflow-scroll">{children}</div>
          <ButtonDefault
            onClick={onClose}
            className="p-3 flex items-center justify-center bg-black rounded-none text-white"
          >
            Đóng
          </ButtonDefault>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
