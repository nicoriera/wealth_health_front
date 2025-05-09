import { ReactNode } from "react";
import ReactModalConverted from "@nicoriera/react-modal-converted";

// Typage des props pour la modale réutilisable
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  console.log("Modal rendered, isOpen:", isOpen);
  return (
    <ReactModalConverted isOpen={isOpen} onClose={onClose}>
      {children}
    </ReactModalConverted>
  );
};

export default Modal;
