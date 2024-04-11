// Modal component (assuming it's in a separate file)
import React from "react";

const Modal = ({ children, onClose }) => {
  const handleModalClose = (event) => {
    // Close the modal only if clicked outside the modal content
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-container" onClick={handleModalClose}>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;