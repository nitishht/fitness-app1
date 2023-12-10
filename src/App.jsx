// App.jsx
import React, { useState } from 'react';
import './app.css';
import ClientList from './ClientList';
import Calendar from './Calendar';

function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className='gradient_background'>
      <div className="navbar">
        <img className="logo" src="logo.png" alt="Logo" />
        <div className="search-bar">
          <input className="search-input" type="text" placeholder="Search..." />
        </div>
        <button className="show-calendar-btn" onClick={() => setShowCalendar(!showCalendar)}>
          {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
        </button>
        <img className="profile-symbol" src="profile.png" alt="Profile" />
        
      </div>
      <div className="grid-container">
        {/* Render the ClientList component */}
        <ClientList />
        {/* Conditionally render the Calendar component */}
        {showCalendar && <Calendar />}
      </div>
    </div>
  );
}

export default App;
