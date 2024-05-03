import React from "react";
import { ICross } from "../ui-icons";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  file?:any;
  heading?: string;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children , file , heading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className=" bg-white w-96 rounded shadow-lg">
        <div
          onClick={onClose}
          className="flex justify-end m-2 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 rounded-full "
        >
          <ICross/>
        </div>
        <div className="px-4 font-semibold">{heading}</div>
        <div className="px-4 pt-2 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
