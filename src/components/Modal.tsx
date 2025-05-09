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
    <ReactModalConverted isOpen={isOpen} onClose={onClose}>
      {title && <h2>{title}</h2>}
      {children}
    </ReactModalConverted>
  );
};

export default Modal;
