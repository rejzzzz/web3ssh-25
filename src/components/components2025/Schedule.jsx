'use client';
import React, { useState } from 'react';

export const Schedule = () => {
  const [activeDate, setActiveDate] = useState('29 June 2025');

  const scheduleData = {
    '29 June 2025': [
      { time: '9:30-9:45', title: 'Inauguration', first: true },
      { time: '9:45-11:45', title: 'Coding session 1' },
      { time: '12:00-12:45', title: 'Key note 1' },
      { time: '2:00-3:30', title: 'Coding session 2' },
      { time: '3:45-4:30', title: 'Fire-side Chat 1', last: true },
    ],
    '30 June 2025': [
      { time: '9:30-9:45', title: 'Assignment 1', first: true },
      { time: '9:45-11:45', title: 'Coding session 3' },
      { time: '12:00-12:45', title: 'Key note 2' },
      { time: '2:00-3:30', title: 'Coding session 4' },
      { time: '3:45-4:30', title: 'Team Building 1', last: true },
    ],
    '01 July 2025': [
      { time: '9:30-9:45', title: 'Assignment 2', first: true },
      { time: '9:45-11:45', title: 'Coding session 5' },
      { time: '12:00-12:45', title: 'Key note 3' },
      { time: '2:00-3:30', title: 'Coding session 6' },
      { time: '3:45-4:30', title: 'Fire-side Chat 2', last: true },
    ],
    '02 July 2025': [
      { time: '9:30-9:45', title: 'Assignment 3', first: true },
      { time: '9:45-11:45', title: 'Coding session 7' },
      { time: '12:00-12:45', title: 'Key note 4' },
      { time: '2:00-3:30', title: 'Coding session 8' },
      { time: '3:45-4:30', title: 'Team Building 2', last: true },
    ],
    '03 July 2025': [
      { time: '9:30-9:45', title: 'Assignment 4', first: true },
      { time: '9:45-11:45', title: 'Coding session 9' },
      { time: '12:00-12:45', title: 'Key note 5' },
      { time: '2:00-3:30', title: 'Coding session 10' },
      { time: '3:45-4:30', title: 'Feedback Session' },
      { time: '5:00-6:00', title: 'Hackathon PS Discussion' },
      { time: '6:00 PM', title: 'Hackathon Start', last: true },
    ],
    '04 July 2025': [
      { time: '9:30 AM', title: 'Hackathon', first: true },
      { time: '6:00 PM', title: 'Check-in', last: true },
    ],
    '05 July 2025': [
      { time: '9:30 AM', title: 'Hackathon', first: true },
      { time: '6:00 PM', title: 'Check-in', last: true },
    ],
    '06 July 2025': [
      {
        time: '9:30 AM',
        title: 'Hackathon Final Day & Evaluation',
        first: true,
      },
      { time: '6:00 PM', title: 'Closing Ceremony', last: true },
    ],
  };

  return (
    <section
      id="schedule"
      className="mx-auto px-4 sm:px-6 md:px-8 max-w-5xl py-8 sm:py-12"
    >
      <h1 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl tracking-wide text-white mb-8">
        Schedule
      </h1>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
        {Object.keys(scheduleData).map((date, index) => (
          <div
            key={date}
            onClick={() => setActiveDate(date)}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              activeDate === date ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white font-semibold text-sm sm:text-base ${
                activeDate === date
                  ? 'bg-cyan-600 shadow-lg'
                  : 'bg-gray-800 bg-opacity-50 border border-white border-opacity-30'
              }`}
            >
              Day {index + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <span className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
          {activeDate}
        </span>
      </div>
      <div className="mt-8 space-y-4">
        {scheduleData[activeDate].map((event, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row bg-black bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-lg overflow-hidden"
          >
            <div
              className={`w-full sm:w-32 md:w-40 bg-gradient-to-r from-gray-900 to-cyan-900 text-white p-3 sm:p-4 flex flex-col justify-center items-center sm:items-start border-b sm:border-b-0 sm:border-r border-white border-opacity-30`}
            >
              <div className="text-sm sm:text-base md:text-lg font-bold">
                {event.time}
              </div>
              <div className="text-xs sm:text-sm text-gray-300 hidden sm:block">
                {activeDate}
              </div>
            </div>
            <div className="flex-1 p-3 sm:p-4 flex items-center">
              <div className="text-white font-semibold text-base sm:text-lg md:text-xl">
                {event.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
