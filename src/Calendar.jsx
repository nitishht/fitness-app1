import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-heading">Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="custom-calendar" // Add a custom class for additional styling
      />
    </div>
  );
};

export default MyCalendar;
