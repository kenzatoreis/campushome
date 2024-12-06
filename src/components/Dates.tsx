import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Dates() {
  const [date, setDate] = useState<Date | null>(new Date());

  // Define events
  const events: { [key: string]: string } = {
    '2024-12-05': 'Hackathon',
    '2024-12-06': 'Workshop: React Basics',
    '2024-12-15': 'End-of-Semester Party',
  };

  // Format a date object to 'YYYY-MM-DD' for comparison
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-emerald-900 mb-6">Dates</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar Component */}
        <div className="flex-1">
          <Calendar
            onChange={(value) => setDate(value as Date | null)}
            value={date}
            className="rounded-lg shadow-sm text-emerald-900"
            tileClassName={({ date, view }) => {
                if (view !== 'month') return ''; // Only apply styles in month view
              
                const formattedDate = formatDate(date);
              
                if (events[formattedDate]) {
                  // Check for adjacent events
                  const previousDate = new Date(date);
                  previousDate.setDate(previousDate.getDate() - 1);
              
                  const nextDate = new Date(date);
                  nextDate.setDate(nextDate.getDate() + 1);
              
                  const hasPreviousEvent = events[formatDate(previousDate)];
                  const hasNextEvent = events[formatDate(nextDate)];
              
                  // Determine rounding based on adjacency
                  if (hasPreviousEvent && hasNextEvent) {
                    return 'p-2 bg-slate-100 text-emerald-900 font-bold'; // No specific rounding
                  } else if (hasPreviousEvent) {
                    return 'p-2 bg-slate-100 text-emerald-900 font-bold rounded-r-lg';
                  } else if (hasNextEvent) {
                    return 'p-2 bg-slate-100 text-emerald-900 font-bold rounded-l-lg';
                  } else {
                    return 'p-2 bg-slate-100 text-emerald-900 font-bold rounded-lg';
                  }
                }
              
                return ''; // Default style for non-event days
              }}
          />
        </div>

        {/* Event Details */}
        <div className="flex-1 bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800">Selected Date:</h3>
          <p className="text-gray-600 mt-2 mb-4">
            {date ? formatDate(date) : 'No date selected'}
          </p>

          <h3 className="text-lg font-semibold text-gray-800">Event:</h3>
          <p className="text-gray-600 mt-2">
            {date && events[formatDate(date)]
              ? events[formatDate(date)]
              : 'No events for this day'}
          </p>
        </div>
      </div>
    </div>
  );
}
