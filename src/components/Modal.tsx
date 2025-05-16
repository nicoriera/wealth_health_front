import { ReactNode } from "react";
import ReactModalConverted from "@nicoriera/react-modal-converted";

// Typage des props pour la modale réutilisable
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  console.log("Modal rendered, isOpen:", isOpen);
  return (
    <ReactModalConverted
      isOpen={isOpen}
      onClose={onClose}
      overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/50  transition-opacity duration-300 ease-in-out"
      modalClassName="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full transform transition-all duration-300 ease-in-out scale-95  animate-fade-in-scale">
      {title && (
        <h2 className="text-xl font-bold mb-4" id="modal-title">
          {title}
        </h2>
      )}
      {children}
    </ReactModalConverted>
  );
};

export default Modal;
