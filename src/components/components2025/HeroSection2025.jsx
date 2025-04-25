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
        'flex flex-col items-center justify-start h-[calc(100vh-200px)] sm:h-fit z-10 text-white',
        'lg:justify-start',
        'pt-0',
      )}
    >
      {/* ETHEREUM + Presents */}
      <div className="text-center mt-0 leading-tight">
        <Image
          src={ethLogoWhite}
          alt="Ethereum Logo"
          width={200}
          height={50}
          className="mx-auto"
        />
        <p className="text-base font-roboto sm:text-lg text-white">Presents</p>
      </div>

      {/* Add margin-top to push the TypewriterEffect lower */}
      <div className="mt-2 lg:mt-4">
        <TypewriterEffect
          words={words}
          className="px-10 min-h-[200px] sm:min-h-[140px] lg:min-h-[80px]"
        />
      </div>

      <div className="text-2xl mt-0 lg:text-3xl mb-3 text-center text-white font-sans font-semibold">
        Organized by IIIT SriCity
      </div>

      <div className="text-md lg:text-2xl text-center xl:w-2/5 lg:w-1/2 sm:w-3/5 max-[375px]:w-4/5 w-3/4 text-white">
        Building the future, one block at a time! {<br />}Join us for a week of
        learning and fun.
      </div>

      <div>
        <div className="mt-8">
          <div className="text-2xl font-sans font-medium">
            Summer School: 29 June to 3 July
          </div>
          <div className="text-2xl font-sans font-medium">
            Hackathon: 3 July to 6 July
          </div>
        </div>
      </div>

      <div className="my-2">
        <div className="mt-10 lg:mt-10 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 items-center justify-center">
          <a href="/register">
            <button className="w-64 transform hover:-translate-y-1 transition duration-400 relative inline-flex sm:h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 pl-12 pr-8 py-4 sm:text-lg font-semibold text-white backdrop-blur-3xl text-lg">
                Register Now
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
          <a href="/archives/2024">
            <button className="w-full h-full bg-[#3770FF] flex items-center justify-center p-3 text-lg rounded-full hover:-translate-y-1 transform transition duration-400">
              <span className="p-0.5 inline-flex items-center">
                Check Out Web3SSH 2024
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
