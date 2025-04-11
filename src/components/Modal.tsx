import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string; // Optional title
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  // Handle Escape key press to close the modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto"; // Ensure scroll is restored
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // Ensure the portal target exists
  let portalRoot = document.getElementById("modal-root");
  if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(portalRoot);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}>
      <div
        className="relative bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Title (Optional) */}
        {title && (
          <h2
            id="modal-title"
            className="text-lg font-medium text-gray-900 mb-4">
            {title}
          </h2>
        )}

        {/* Modal Content */}
        <div className="text-sm text-gray-700">{children}</div>

        {/* Optional Footer - Could add props for footer content or buttons */}
        {/* <div className="mt-4 flex justify-end"> */}
        {/*   <button onClick={onClose} className="...">Close</button> */}
        {/* </div> */}
      </div>
    </div>,
    portalRoot // Render into the portal target
  );
};

export default Modal;

// Add simple animation keyframes to index.css or a global css file if needed
/* Example for index.css:
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in-scale {
  animation: fadeInScale 0.2s ease-out forwards;
}
*/
