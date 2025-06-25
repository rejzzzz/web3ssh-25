'use client';

import clsx from 'clsx';
import { TypewriterEffect } from '../ui/typewriter-effect';
import geodeworkLogo from '@public/partners2025/eth-logo-white.svg';
import Image from 'next/image';
import React from 'react';

export default function HeroSection() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = script.defer = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const words = [
    { text: 'Web' },
    { text: '3.0' },
    { text: 'Summer' },
    { text: 'School' },
    { text: '&' },
    { text: 'Hackathon', className: 'text-blue-500' },
    { text: '2025' },
  ];

  return (
    <>
      <div className="flex flex-col items-center min-h-[calc(100vh-80px)] sm:min-h-fit z-10 text-white pt-4 sm:pt-10 px-4 sm:px-6">
        {/* Logo + Presents */}
        <div className="text-center mt-0 sm:mt-2">
          <Image
            src={geodeworkLogo}
            alt="Ethereum Logo"
            width={120}
            height={30}
            className="mx-auto w-[100px] sm:w-[120px]"
          />
        </div>

        {/* Title + Info */}
        <div className="mt-4 sm:mt-6 w-full">
          <TypewriterEffect
            words={words}
            className="px-2 sm:px-6 min-h-[120px] sm:min-h-[100px] text-center"
          />
        </div>

        <div className="text-base sm:text-xl mt-4 sm:mt-6 text-center font-semibold">
          Organized by IIIT Sri City
        </div>

        <div className="text-xs sm:text-base text-center w-full sm:w-3/4 lg:w-1/2">
          Building the future, one block at a time!{' '}
          <br className="block sm:hidden" />
          Join us for a week of learning and fun.
        </div>

        {/* Dates */}
        <div className="mt-6 sm:mt-8">
          <div className="text-sm sm:text-lg font-medium text-center">
            Summer School: 29 June to 3 July, 2025
          </div>
          <div className="text-sm sm:text-lg font-medium text-center mt-1">
            Hackathon: 3 July to 6 July, 2025
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-[600px]">
            <a href="/register" className="flex-1 w-full sm:w-auto">
              <button className="w-full transform hover:-translate-y-1 transition duration-400 relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] will-change-transform animate-slow-spin bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 sm:px-8 py-2 text-sm sm:text-base font-semibold text-white backdrop-blur-3xl whitespace-nowrap">
                  Register Now
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                    />
                  </svg>
                </span>
              </button>
            </a>

            <a href="/dashboard" className="flex-1 w-full sm:w-auto">
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center p-2 sm:p-3 text-sm sm:text-base rounded-full hover:-translate-y-1 transform transition duration-400">
                � Submit Project
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  />
                </svg>
              </button>
            </a>
          </div>
          
          <a href="/archives/2024" className="w-full max-w-[280px]">
            <button className="w-full bg-[#3770FF] flex items-center justify-center p-2 sm:p-3 text-sm sm:text-base rounded-full hover:-translate-y-1 transform transition duration-400">
              Check Out Web3SSH 2024
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                />
              </svg>
            </button>
          </a>
          
          {/* Simple Deadline Notice */}
          <div className="flex items-center bg-red-500/50 px-4 py-1.5 rounded-full text-white font-medium text-sm animate-pulse shadow-lg border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Registration closes June 15, 2025
          </div>
        </div>
      </div>


    </>
  );
}
