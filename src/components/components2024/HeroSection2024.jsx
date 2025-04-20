'use client';

import clsx from 'clsx';
import { TypewriterEffect } from '../ui/typewriter-effect';
import { Highlight } from '@components/ui/hero-highlight';
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
    { text: '2024' },
  ];

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-start h-[calc(100vh-200px)] sm:h-fit z-10 text-white',
        'lg:justify-start',
        'pt-0',
      )}
    >
      {/* Add margin-top to push the TypewriterEffect lower */}
      <div className="mt-16 lg:mt-20">
        <TypewriterEffect
          words={words}
          className="px-10 min-h-[220px] sm:min-h-[160px] lg:min-h-[100px]"
        />
      </div>

      <div className="text-2xl lg:text-3xl mb-6 text-center text-white font-sans font-semibold">
        Organized by IIIT SriCity
      </div>

      <div className="text-md lg:text-2xl text-center xl:w-2/5 lg:w-1/2 sm:w-3/5 max-[375px]:w-4/5 w-3/4 text-white">
        Building the future, one block at a time! {<br />}Join us for a week of
        learning and fun.
      </div>

      <div>
        <div className="mt-8">
          <div className="text-2xl font-sans font-medium">
            Summer School: 29th July to 3rd August, 2024
          </div>
          <div className="text-2xl font-sans font-medium">
            Hackathon: 7th August to 9th August, 2024
          </div>
        </div>
      </div>

      <div className="my-2">
        <div className="mt-10 lg:mt-10 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-center justify-center">
          <a href="https://web3ssh.devfolio.co/" target="_blank">
            <button className="w-full h-full bg-[#3770FF] flex items-center justify-center p-3 text-lg rounded-full">
              <span className="p-0.5 inline-flex items-center">
                <img
                  src="/icons/Devfolio_Logo.webp"
                  height="30px"
                  width="30px"
                  className="mx-2 inline fill-white drop-shadow-lg invert"
                />
                Hackathon on Devfolio
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
