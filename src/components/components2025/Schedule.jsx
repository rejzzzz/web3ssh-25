'use client';
import React from 'react';

export const Schedule = () => {
  return (
    <section
      id="schedule"
      className="mx-auto px-4 md:px-8 max-w-screen-xl py-2 md:py-16 pt-20"
    >
      <div>
        <h1 className="text-center md:text-left font-bold text-4xl md:text-6xl tracking-wide leading-tight">
          <span className="text-white">Schedule</span>
        </h1>
      </div>
      <div className="mt-10 flex justify-center items-center">
        <div className="w-full h-full max-w-[1100px] aspect-[11/8]">
          <svg viewBox="0 0 1100 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#3498db", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#2980b9", stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="hackathonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#9b59b6", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#8e44ad", stopOpacity: 1 }} />
              </linearGradient>
              <style>
                {`
                  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
                  .day-header { font-family: Montserrat, sans-serif; font-size: 20px; font-weight: 700; fill: white; text-anchor: middle; }
                  .time-slot { font-family: Montserrat, sans-serif; font-size: 16px; font-weight: 500; fill: white; text-anchor: end; filter: url(#glow); }
                  .event-text { font-family: Montserrat, sans-serif; font-size: 14px; fill: white; text-anchor: middle; dominant-baseline: middle; }
                  .date-text { font-family: Montserrat, sans-serif; font-size: 14px; fill: white; text-anchor: middle; font-style: italic; }
                  .hackathon-text { font-family: Montserrat, sans-serif; font-size: 14px; font-weight: 700; fill: white; text-anchor: middle; }
                  .multi-line-text1, .multi-line-text2 { font-family: Montserrat, sans-serif; font-size: 14px; fill: white; text-anchor: middle; }
                `}
              </style>
            </defs>

            {/* Day headers */}
            <rect x="150" y="40" width="100" height="60" rx="10" ry="10" fill="url(#headerGradient)" opacity="0.9" />
            <text x="200" y="70" className="day-header">
              DAY 1
            </text>
            <text x="200" y="95" className="date-text">
              29 June 2025
            </text>

            <rect x="270" y="40" width="100" height="60" rx="10" ry="10" fill="url(#headerGradient)" opacity="0.9" />
            <text x="320" y="70" className="day-header">
              DAY 2
            </text>
            <text x="320" y="95" className="date-text">
              30 June 2025
            </text>

            <rect x="390" y="40" width="100" height="60" rx="10" ry="10" fill="url(#headerGradient)" opacity="0.9" />
            <text x="440" y="70" className="day-header">
              DAY 3
            </text>
            <text x="440" y="95" className="date-text">
              01 July 2025
            </text>

            <rect x="510" y="40" width="100" height="60" rx="10" ry="10" fill="url(#headerGradient)" opacity="0.9" />
            <text x="560" y="70" className="day-header">
              DAY 4
            </text>
            <text x="560" y="95" className="date-text">
              02 July 2025
            </text>

            <rect x="630" y="40" width="100" height="60" rx="10" ry="10" fill="url(#headerGradient)" opacity="0.9" />
            <text x="680" y="70" className="day-header">
              DAY 5
            </text>
            <text x="680" y="95" className="date-text">
              03 July 2025
            </text>

            <rect x="750" y="40" width="100" height="60" rx="10" ry="10" fill="url(#hackathonGradient)" opacity="0.9" />
            <text x="800" y="70" className="day-header">
              DAY 6
            </text>
            <text x="800" y="95" className="date-text">
              04 July 2025
            </text>

            <rect x="870" y="40" width="100" height="60" rx="10" ry="10" fill="url(#hackathonGradient)" opacity="0.9" />
            <text x="920" y="70" className="day-header">
              DAY 7
            </text>
            <text x="920" y="95" className="date-text">
              05 July 2025
            </text>

            <rect x="990" y="40" width="100" height="60" rx="10" ry="10" fill="url(#hackathonGradient)" opacity="0.9" />
            <text x="1040" y="70" className="day-header">
              DAY 8
            </text>
            <text x="1040" y="95" className="date-text">
              06 July 2025
            </text>

            {/* Timeline line - Extended to reach all the way to the bottom row */}
            <line x1="90" y1="150" x2="90" y2="760" stroke="white" strokeWidth="2" strokeOpacity="0.8" />

            {/* Connecting lines */}
            <line
              x1="90"
              y1="150"
              x2="1050"
              y2="150"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="220"
              x2="1050"
              y2="220"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="290"
              x2="1050"
              y2="290"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="345"
              x2="1050"
              y2="345"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="405"
              x2="1050"
              y2="405"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="460"
              x2="1050"
              y2="460"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="525"
              x2="1050"
              y2="525"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="585"
              x2="1050"
              y2="585"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="90"
              y1="660"
              x2="1050"
              y2="660"
              stroke="white"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3,3"
            />

            {/* Time slots */}
            <text x="80" y="185" className="time-slot">
              9:30-9:45
            </text>
            <text x="80" y="255" className="time-slot">
              9:45-11:45
            </text>
            <text x="85" y="320" className="time-slot">
              11:45-12:00
            </text>
            <text x="85" y="375" className="time-slot">
              12:00-12:45
            </text>
            <text x="80" y="435" className="time-slot">
              12:45-2:00
            </text>
            <text x="80" y="495" className="time-slot">
              2:00-3:30
            </text>
            <text x="80" y="555" className="time-slot">
              3:30-3:45
            </text>
            <text x="80" y="615" className="time-slot">
              3:45-4:30
            </text>
            <text x="80" y="690" className="time-slot">
              5:00-6:00
            </text>

            {/* Event pills - Day 1-4 */}
            <rect x="150" y="165" width="100" height="40" rx="15" ry="15" fill="#e74c3c" opacity="0.9" />
            <text x="200" y="185" className="event-text">
              Inauguration
            </text>

            <rect x="150" y="230" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="200" y="245" className="multi-line-text1">
              Coding
            </text>
            <text x="200" y="265" className="multi-line-text2">
              session 1
            </text>

            <rect x="150" y="300" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="200" y="320" className="event-text">
              Break
            </text>

            <rect x="150" y="355" width="100" height="40" rx="15" ry="15" fill="#f1c40f" opacity="0.9" />
            <text x="200" y="375" className="event-text">
              Key note 1
            </text>

            <rect x="150" y="415" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="200" y="435" className="event-text">
              Break
            </text>

            <rect x="150" y="470" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="200" y="485" className="multi-line-text1">
              Coding
            </text>
            <text x="200" y="505" className="multi-line-text2">
              session 2
            </text>

            <rect x="150" y="535" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="200" y="555" className="event-text">
              Break
            </text>

            <rect x="150" y="595" width="100" height="50" rx="15" ry="15" fill="#27ae60" opacity="0.9" />
            <text x="200" y="610" className="multi-line-text1">
              Fire-side
            </text>
            <text x="200" y="630" className="multi-line-text2">
              Chat 1
            </text>

            {/* Event pills - Day 2 */}
            <rect x="270" y="165" width="100" height="50" rx="15" ry="15" fill="#9b59b6" opacity="0.9" />
            <text x="320" y="180" className="multi-line-text1">
              Assignment
            </text>
            <text x="320" y="200" className="multi-line-text2">
              1
            </text>

            <rect x="270" y="230" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="320" y="245" className="multi-line-text1">
              Coding
            </text>
            <text x="320" y="265" className="multi-line-text2">
              session 3
            </text>

            <rect x="270" y="300" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="320" y="320" className="event-text">
              Break
            </text>

            <rect x="270" y="355" width="100" height="40" rx="15" ry="15" fill="#f1c40f" opacity="0.9" />
            <text x="320" y="375" className="event-text">
              Key note 2
            </text>

            <rect x="270" y="415" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="320" y="435" className="event-text">
              Break
            </text>

            <rect x="270" y="470" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="320" y="485" className="multi-line-text1">
              Coding
            </text>
            <text x="320" y="505" className="multi-line-text2">
              session 4
            </text>

            <rect x="270" y="535" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="320" y="555" className="event-text">
              Break
            </text>

            <rect x="270" y="595" width="100" height="50" rx="15" ry="15" fill="#16a085" opacity="0.9" />
            <text x="320" y="610" className="multi-line-text1">
              Team
            </text>
            <text x="320" y="630" className="multi-line-text2">
              Building 1
            </text>

            {/* Event pills - Day 3 */}
            <rect x="390" y="165" width="100" height="50" rx="15" ry="15" fill="#9b59b6" opacity="0.9" />
            <text x="440" y="180" className="multi-line-text1">
              Assignment
            </text>
            <text x="440" y="200" className="multi-line-text2">
              2
            </text>

            <rect x="390" y="230" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="440" y="245" className="multi-line-text1">
              Coding
            </text>
            <text x="440" y="265" className="multi-line-text2">
              session 5
            </text>

            <rect x="390" y="300" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="440" y="320" className="event-text">
              Break
            </text>

            <rect x="390" y="355" width="100" height="40" rx="15" ry="15" fill="#f1c40f" opacity="0.9" />
            <text x="440" y="375" className="event-text">
              Key note 3
            </text>

            <rect x="390" y="415" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="440" y="435" className="event-text">
              Break
            </text>

            <rect x="390" y="470" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="440" y="485" className="multi-line-text1">
              Coding
            </text>
            <text x="440" y="505" className="multi-line-text2">
              session 6
            </text>

            <rect x="390" y="535" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="440" y="555" className="event-text">
              Break
            </text>

            <rect x="390" y="595" width="100" height="50" rx="15" ry="15" fill="#27ae60" opacity="0.9" />
            <text x="440" y="610" className="multi-line-text1">
              Fire-side
            </text>
            <text x="440" y="630" className="multi-line-text2">
              Chat 2
            </text>

            {/* Event pills - Day 4 */}
            <rect x="510" y="165" width="100" height="50" rx="15" ry="15" fill="#9b59b6" opacity="0.9" />
            <text x="560" y="180" className="multi-line-text1">
              Assignment
            </text>
            <text x="560" y="200" className="multi-line-text2">
              3
            </text>

            <rect x="510" y="230" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="560" y="245" className="multi-line-text1">
              Coding
            </text>
            <text x="560" y="265" className="multi-line-text2">
              session 7
            </text>

            <rect x="510" y="300" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="560" y="320" className="event-text">
              Break
            </text>

            <rect x="510" y="355" width="100" height="40" rx="15" ry="15" fill="#f1c40f" opacity="0.9" />
            <text x="560" y="375" className="event-text">
              Key note 4
            </text>

            <rect x="510" y="415" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="560" y="435" className="event-text">
              Break
            </text>

            <rect x="510" y="470" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="560" y="485" className="multi-line-text1">
              Coding
            </text>
            <text x="560" y="505" className="multi-line-text2">
              session 8
            </text>

            <rect x="510" y="535" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="560" y="555" className="event-text">
              Break
            </text>

            <rect x="510" y="595" width="100" height="50" rx="15" ry="15" fill="#16a085" opacity="0.9" />
            <text x="560" y="610" className="multi-line-text1">
              Team
            </text>
            <text x="560" y="630" className="multi-line-text2">
              Building 2
            </text>

            {/* Event pills - Day 5 */}
            <rect x="630" y="165" width="100" height="50" rx="15" ry="15" fill="#9b59b6" opacity="0.9" />
            <text x="680" y="180" className="multi-line-text1">
              Assignment
            </text>
            <text x="680" y="200" className="multi-line-text2">
              4
            </text>

            <rect x="630" y="230" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="680" y="245" className="multi-line-text1">
              Coding
            </text>
            <text x="680" y="265" className="multi-line-text2">
              session 9
            </text>

            <rect x="630" y="300" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="680" y="320" className="event-text">
              Break
            </text>

            <rect x="630" y="355" width="100" height="40" rx="15" ry="15" fill="#f1c40f" opacity="0.9" />
            <text x="680" y="375" className="event-text">
              Key note 5
            </text>

            <rect x="630" y="415" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="680" y="435" className="event-text">
              Break
            </text>

            <rect x="630" y="470" width="100" height="50" rx="15" ry="15" fill="#2980b9" opacity="0.9" />
            <text x="680" y="485" className="multi-line-text1">
              Coding
            </text>
            <text x="680" y="505" className="multi-line-text2">
              session 10
            </text>

            <rect x="630" y="535" width="100" height="40" rx="15" ry="15" fill="#7f8c8d" opacity="0.7" />
            <text x="680" y="555" className="event-text">
              Break
            </text>

            <rect x="630" y="595" width="100" height="50" rx="15" ry="15" fill="#e67e22" opacity="0.9" />
            <text x="680" y="610" className="multi-line-text1">
              Feedback
            </text>
            <text x="680" y="630" className="multi-line-text2">
              Session
            </text>

            {/* Day 5 - Hackathon PS Discussion - Fixed with multi-line text */}
            <rect x="630" y="670" width="100" height="50" rx="15" ry="15" fill="#8e44ad" opacity="0.9" />
            <text x="680" y="685" className="multi-line-text1"  style={{ fontSize: "12px" }} >
              Hackathon PS
            </text>
            <text x="680" y="705" className="multi-line-text2">
              Discussion
            </text>

            {/* Day 5 - Hackathon Start - Added below discussion */}
            <rect x="630" y="725" width="100" height="50" rx="15" ry="15" fill="#8e44ad" opacity="0.9" />
            <text x="680" y="740" className="multi-line-text1">
              Hackathon
            </text>
            <text x="680" y="760" className="multi-line-text2">
              Start 6 PM
            </text>

            {/* Days 6-8 Hackathon - Extended purple bars to full height */}
            <rect x="750" y="165" width="100" height="485" rx="15" ry="15" fill="#8e44ad" opacity="0.9" />
            <text x="800" y="330" className="hackathon-text" fontSize="16">
              HACKATHON
            </text>

            {/* Day 6 Check-in - At bottom row */}
            <rect x="750" y="670" width="100" height="50" rx="15" ry="15" fill="#8e44ad" opacity="0.9" />
            <text x="800" y="685" className="multi-line-text1">
              6:00 PM
            </text>
            <text x="800" y="705" className="multi-line-text2">
              Check-in
            </text>

            {/* Day 7 Hackathon */}
            <rect x="870" y="165" width="100" height="485" rx="15" ry="15" fill="#8e44ad" opacity="0.9" />
            <text x="920" y="330" className="hackathon-text" fontSize="16">
              HACKATHON
            </text>

            {/* Day 7 Check-in - At bottom row */}
            <rect x="870" y="670" width="100" height="50" rx="15" ry="15" fill="#8e44ad" opacity="0.9" />
            <text x="920" y="685" className="multi-line-text1">
              6:00 PM
            </text>
            <text x="920" y="705" className="multi-line-text2">
              Check-in
            </text>

            {/* Day 8 - Final Day */}
            <rect x="990" y="165" width="100" height="485" rx="15" ry="15" fill="#8e44ad" opacity="0.9" />
            <text x="1040" y="330" className="hackathon-text" fontSize="16">
              HACKATHON
            </text>
            <text x="1040" y="360" className="multi-line-text1">
              Final
            </text>
            <text x="1040" y="380" className="multi-line-text2">
              Day
            </text>
            <text x="1040" y="400" className="multi-line-text2"> 
              Evaluation
            </text>

            {/* Day 8 - Closing Ceremony - Using multi-line text */}
            <rect x="990" y="670" width="100" height="50" rx="15" ry="15" fill="#e74c3c" opacity="0.9" />
            <text x="1040" y="685" className="multi-line-text1">
              Closing
            </text>
            <text x="1040" y="705" className="multi-line-text2">
              Ceremony
            </text>

          </svg>
        </div>
      </div>
    </section>
  );
};