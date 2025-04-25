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
      className="mx-auto px-4 md:px-8 max-w-screen-xl py-6 pt-8"
    >
      <h1 className="text-center md:text-left font-bold text-4xl md:text-5xl tracking-wide text-white">
        Schedule
      </h1>
      <div className="flex gap-1 md:gap-2 mt-8 justify-start md:justify-around max-w-[100vw] flex-wrap">
        {Object.keys(scheduleData).map((date, index) => (
          <div
            key={date}
            onClick={() => setActiveDate(date)}
            className="cursor-pointer"
          >
            <div
              className={`ml-1 text-gray-200 text-sm md:text-base font-bold py-1 px-2 bg-gradient-to-l from-gray-900 to-cyan-900 rounded-tl-lg rounded-tr-lg ${activeDate === date ? 'bg-cyan-700' : ''}`}
            >
              Day {index + 1}
            </div>
            <a
              href={`#schedule-${date.replace(/ /g, '-')}`}
              className={`py-2 px-2 w-[120px] text-sm md:text-base tracking-wide inline-block font-semibold text-white ${activeDate === date ? 'bg-[#222]' : 'backdrop-blur-sm bg-black bg-opacity-20'} rounded-bl-lg rounded-br-lg border border-white border-opacity-50 transition-all duration-300`}
            >
              <span className="flex items-center justify-center">{date}</span>
            </a>
          </div>
        ))}
      </div>
      <div className="mt-10">
        {scheduleData[activeDate].map((event, index) => (
          <div key={index} className="flex">
            <div
              className={`flex border-r-2 border-white border-opacity-50 ${event.first ? '' : 'pt-3'} ${event.last ? '' : 'pb-3'}`}
            >
              <div className="w-24 md:w-36 items-center justify-between flex rounded-l-lg bg-gradient-to-r backdrop-blur-sm bg-black bg-opacity-20 border border-white border-opacity-50">
                <div className="ml-1 md:ml-2">
                  <div className="text-white font-bold text-sm md:text-lg">
                    {event.time}
                  </div>
                  <div className="text-gray-100 text-xs md:text-sm">
                    {activeDate}
                  </div>
                </div>
                <div className="w-2 md:w-4 border-t-2 border-white border-opacity-40"></div>
              </div>
            </div>
            <div
              className={`backdrop-blur-sm bg-black bg-opacity-20 flex-1 rounded-r-lg border border-white border-opacity-50 ${event.first ? '' : 'mt-3'} ${event.last ? '' : 'mb-3'}`}
            >
              <div className="flex py-2 md:py-4 px-1 md:px-4 items-center gap-2 md:gap-4 my-4">
                <div className="flex flex-col mx-3 md:mx-0 items-center md:items-start text-center md:text-start">
                  <div className="text-white font-bold text-base md:text-xl md:mx-4 my-3">
                    {event.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
