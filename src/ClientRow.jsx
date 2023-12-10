import React, { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog'; // Import your ConfirmationDialog component

const ClientRow = ({ clientId, isEditing, onDelete, onStartEditing, onStopEditing }) => {
  const [clientInfo, setClientInfo] = useState({
    firstName: 'Enter First Name',
    lastName: 'Enter Last Name',
    location: 'Enter Location',
    appointments: [],
  });

  const [newAppointment, setNewAppointment] = useState('');
  const [originalClientInfo, setOriginalClientInfo] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const addAppointment = () => {
    if (newAppointment.trim() !== '') {
      setClientInfo((prevClientInfo) => ({
        ...prevClientInfo,
        appointments: [...prevClientInfo.appointments, newAppointment],
      }));
      setNewAppointment('');
      setIsDirty(true);
    }
  };

  const handleInputChange = (field, value) => {
    setClientInfo((prevClientInfo) => ({
      ...prevClientInfo,
      [field]: value,
    }));
    setIsDirty(true);
  };

  const editClientInfo = () => {
    onStartEditing(clientId);
    setOriginalClientInfo({ ...clientInfo });
  };

  const saveClientInfo = () => {
    onStopEditing();
    setIsDirty(false);
  };

  const cancelEditing = () => {
    onStopEditing();
    setClientInfo(originalClientInfo);
    setIsDirty(false);
  };

  const showDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(true);
  };

  const hideDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(false);
  };

  const confirmDeleteClient = () => {
    onDelete();
    setShowDeleteConfirmation(false);
  };

  const deleteAppointment = (index) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setClientInfo((prevClientInfo) => {
        const updatedAppointments = [...prevClientInfo.appointments];
        updatedAppointments.splice(index, 1);
        return {
          ...prevClientInfo,
          appointments: updatedAppointments,
        };
      });
      setIsDirty(true);
    }
  };

  const renderDateTimePicker = (index) => {
    return (
      <>
        <input
          type="date"
          value={clientInfo.appointments[index].split('T')[0]}
          onChange={(e) => handleAppointmentEdit(index, e.target.value)}
        />
        {' '}
        <input
          type="time"
          value={clientInfo.appointments[index].split('T')[1]}
          onChange={(e) => handleAppointmentEdit(index, e.target.value)}
        />
      </>
    );
  };

  const handleAppointmentEdit = (index, value) => {
    setClientInfo((prevClientInfo) => {
      const updatedAppointments = [...prevClientInfo.appointments];
      updatedAppointments[index] = value;
      return {
        ...prevClientInfo,
        appointments: updatedAppointments,
      };
    });
    setIsDirty(true);
  };

  return (
    <div className="client-row" id={`client-${clientId}`}>
      <div className="name-container">
        <div>
          <label>First Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={clientInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          ) : (
            <span>{clientInfo.firstName}</span>
          )}
        </div>
        <div>
          <label>Last Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={clientInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
          ) : (
            <span>{clientInfo.lastName}</span>
          )}
        </div>
      </div>
      <div className="right-column">
        <label>Location:</label>
        {isEditing ? (
          <input
            type="text"
            value={clientInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
        ) : (
          <span>{clientInfo.location}</span>
        )}
        <label>Appointments:</label>
        <ul>
          {clientInfo.appointments.map((appointment, index) => (
            <li key={index}>
              {isEditing ? (
                renderDateTimePicker(index)
              ) : (
                <span>{appointment}</span>
              )}
              {isEditing && (
                <button onClick={() => deleteAppointment(index)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
        {isEditing && (
          <>
            <input
              type="datetime-local"
              value={newAppointment}
              onChange={(e) => setNewAppointment(e.target.value)}
            />
            <button className="add-appointment-btn" onClick={addAppointment}>
              Add Appointment
            </button>
          </>
        )}
      </div>
      <div>
        {isEditing ? (
          <>
            <button className="edit-save-btn" onClick={saveClientInfo} disabled={!isDirty}>
              Save
            </button>
            <button className="edit-save-btn" onClick={cancelEditing}>
              Cancel
            </button>

            <button className="edit-save-btn" onClick={showDeleteConfirmationDialog}>
              Delete
            </button>
          </>
        ) : (
          <button className="edit-save-btn" onClick={editClientInfo}>
            Edit
          </button>
        )}
      </div>
      {/* Render the ConfirmationDialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onCancel={hideDeleteConfirmationDialog}
        onConfirm={confirmDeleteClient}
      />
    </div>
  );
};

export default ClientRow;
