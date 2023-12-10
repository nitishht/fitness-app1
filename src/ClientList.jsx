// ClientList.jsx

import React, { useState, useEffect } from 'react';
import ClientRow from './ClientRow';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showAddClientButton, setShowAddClientButton] = useState(true);

  const addNewClient = () => {
    setClients((prevClients) => [...prevClients, { id: Date.now() }]);
    setShowAddClientButton(false);
  };

  const deleteClient = (clientId) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  const [editingClientId, setEditingClientId] = useState(null);

  const startEditing = (clientId) => {
    setEditingClientId(clientId);
  };

  const stopEditing = () => {
    setEditingClientId(null);
  };

  useEffect(() => {
    // Check if there are no clients left
    if (clients.length === 0) {
      setShowAddClientButton(true);
    }
  }, [clients]);

  return (
    <div className="client-list-container">
      {clients.length === 0 ? (
        showAddClientButton ? (
          <div className>
            <p className='t1'>No Clients Added</p>
            <button className="add-client-btn" onClick={addNewClient}>
              Add New Client
            </button>
          </div>
        ) : null
      ) : (
        <>
          {/* Render client rows */}
          {clients.map((client) => (
            <ClientRow
              key={client.id}
              clientId={client.id}
              isEditing={editingClientId === client.id}
              onDelete={() => deleteClient(client.id)}
              onStartEditing={() => startEditing(client.id)}
              onStopEditing={stopEditing}
            />
          ))}
          {/* Add New Client button below the client rows */}
          <button className="add-client-btn" onClick={addNewClient}>
            Add New Client
          </button>
        </>
      )}
    </div>
  );
};

export default ClientList;
