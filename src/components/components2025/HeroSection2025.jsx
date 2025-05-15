'use client';

import clsx from 'clsx';
import { TypewriterEffect } from '../ui/typewriter-effect';
import { Highlight } from '@components/ui/hero-highlight';
import ethLogoWhite from '@public/partners2025/eth-logo-white.svg';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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
    <div
      className={clsx(
        'flex flex-col items-center justify-start min-h-[calc(100vh-80px)] sm:min-h-fit z-10 text-white',
        'lg:justify-start',
        'pt-4 sm:pt-20 px-4 sm:px-6 md:px-8 lg:px-12',
      )}
    >
      {/* ETHEREUM + Presents */}
      <div className="text-center mt-4 sm:mt-8 md:mt-10 leading-tight">
        <Image
          src={ethLogoWhite}
          alt="Ethereum Logo"
          width={120}
          height={30}
          className="mx-auto w-[100px] sm:w-[120px]"
        />
        <p className="text-xs sm:text-sm md:text-base font-roboto text-white mt-2 sm:mt-3">
          Presents
        </p>
      </div>

      {/* TypewriterEffect */}
      <div className="mt-4 sm:mt-6 md:mt-8 w-full">
        <TypewriterEffect
          words={words}
          className="px-2 sm:px-6 md:px-8 min-h-[120px] sm:min-h-[100px] md:min-h-[80px] text-center"
        />
      </div>

      <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-4 text-center text-white font-sans font-semibold">
        Organized by IIIT SriCity
      </div>

      <div className="text-xs sm:text-sm md:text-base lg:text-lg text-center w-full sm:w-4/5 md:w-3/4 lg:w-3/5 xl:w-1/2 text-white px-2 sm:px-4 md:px-6">
        Building the future, one block at a time!{' '}
        <br className="block sm:hidden" />
        Join us for a week of learning and fun.
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-medium text-center">
          Summer School: 29 June to 3 July
        </div>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-medium text-center mt-1 sm:mt-2">
          Hackathon: 3 July to 6 July
        </div>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 w-full">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 md:space-y-6">
          <a href="/register" className="w-full max-w-[280px]">
            <button className="w-full transform hover:-translate-y-1 transition duration-400 relative inline-flex h-10 sm:h-12 md:h-14 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-3xl">
                Register Now
                <svg
                  width="16"
                  height="16"
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
          <a href="/archives/2024" className="w-full max-w-[280px]">
            <button className="w-full bg-[#3770FF] flex items-center justify-center p-2 sm:p-3 text-sm sm:text-base rounded-full hover:-translate-y-1 transform transition duration-400">
              <span className="inline-flex items-center">
                Check Out Web3SSH 2024
                <svg
                  width="16"
                  height="16"
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
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
