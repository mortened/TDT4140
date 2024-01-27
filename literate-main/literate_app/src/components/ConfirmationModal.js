import React from "react";

function ConfirmationModal(props) {
  const handleConfirm = () => {
    props.onConfirm();
    props.onClose();
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h2>{props.title}</h2>
          <button className="close-btn" onClick={handleCancel}>
            X
          </button>
        </div>
        <div className="modal-content">
          <p>{props.message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleConfirm}>
            Yes
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
