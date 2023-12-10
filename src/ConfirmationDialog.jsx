// ConfirmationDialog.jsx
import React from 'react';

const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div className={`confirmation-dialog ${isOpen ? 'open' : ''}`}>
      <div className="dialog-content">
        <p>Are you sure you want to delete this client?</p>
        <div className="button-container">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
