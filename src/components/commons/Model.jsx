// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, img }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center p-10">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <img src={img} alt="" className="w-[80%] z-50 object-contain" />
      </div>
    </div>
  );
};

export default Modal;
