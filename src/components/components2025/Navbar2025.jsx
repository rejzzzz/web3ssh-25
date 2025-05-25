'use client';
import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap/gsap-core';
import Linkedin from '@public/icons/linkedin.svg';
import XIcon from '@public/icons/x-logo.svg';
import Instagram from '@public/icons/instagram.svg';
import navData from '@data/2025/nav2025.json';
import Image from 'next/image';
import web3sshLogo from '@public/web3ssh.webp';
import iiitLogo from '@public/iiits.webp';

export default function Navbar() {
  const [topbarPosition, setTopbarPosition] = useState('0');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setLastScrollY(window.scrollY);

    const handleScroll = () => {
      let currentScrollY = window.scrollY;
      if (currentScrollY < 0) {
        currentScrollY = 0;
      }
      if (document.documentElement.scrollHeight === window.innerHeight) {
        setTopbarPosition('0');
      } else if (
        currentScrollY >=
        document.documentElement.scrollHeight - window.innerHeight
      ) {
        setTopbarPosition('-100px');
      } else {
        setTopbarPosition(currentScrollY > lastScrollY ? '-100px' : '0');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Close dropdown and mobile menu when clicking outside
    const handleClickOutside = (e) => {
      const dropdownButton = document.getElementById('dropdown-button');
      const dropdownMenu = document.getElementById('dropdown-menu');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');

      if (
        dropdownButton &&
        !dropdownButton.contains(e.target) &&
        dropdownMenu &&
        !dropdownMenu.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        mobileMenuButton &&
        !mobileMenuButton.contains(e.target) &&
        mobileMenu &&
        !mobileMenu.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [lastScrollY]);

  const containerStyle = {
    position: 'fixed',
    top: topbarPosition,
    width: 'calc(100vw - 40px)',
    left: '20px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'top 0.5s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    zIndex: 50,
  };

  const socialIconStyle = {
    height: '30px',
    borderRadius: '5px',
  };

  // Return early or show a loading state if not mounted yet (client-side)
  if (!isMounted) {
    return <div className="w-full h-[60px]"></div>;
  }

  return (
    <div className="w-full h-[60px] top-0 flex z-50 text-2xl">
      <div
        style={containerStyle}
        className="z-50 text-white border-none flex justify-between items-center"
      >
        <div className="min-w-fit h-[60px] w-full sm:w-fit md:w-full pl-5 flex justify-start items-center">
          <img
            src={web3sshLogo.src}
            alt="web3ssh logo"
            style={{ height: '50px' }}
            onClick={() => (window.location.href = '/')}
            className="cursor-pointer"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-button"
          className="sm:hidden flex items-center px-3 py-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`
            sm:hidden fixed top-[100px] left-0 w-full bg-black bg-opacity-90 backdrop-blur-lg
            ${isMobileMenuOpen ? 'block' : 'hidden'}
            transition-all duration-300 ease-in-out
          `}
        >
          <div className="px-4 py-2 space-y-1">
            {navData.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="block px-3 py-2 text-base text-white hover:bg-opacity-50 hover:bg-slate-50 rounded-md transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </a>
            ))}
            <a
              href="/archives/2024"
              className="block px-3 py-2 text-base text-white hover:bg-opacity-50 hover:bg-slate-50 rounded-md transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Archives - 2024
            </a>
            <div className="flex justify-center space-x-4 py-4">
              <a href="https://www.linkedin.com/company/web3ssh/" target="_blank">
                <img style={socialIconStyle} src={Linkedin.src} alt="Linkedin" />
              </a>
              <a href="https://x.com/web3ssh" target="_blank">
                <img style={socialIconStyle} src={XIcon.src} alt="X" />
              </a>
              <a href="https://www.instagram.com/web3ssh/" target="_blank">
                <img style={socialIconStyle} src={Instagram.src} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex justify-between gap-6 items-center">
          <ul className="flex lg:gap-6 sm:gap-2">
            {navData.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  className="text-sm lg:text-lg px-1 py-1 rounded-md cursor-pointer hover:font-semibold hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          {/* Dropdown Button */}
          <div className="relative inline-block text-left">
            <button
              id="dropdown-button"
              type="button"
              className="inline-flex justify-center items-center text-sm lg:text-lg  px-1 py-1 rounded-md cursor-pointer hover:font-semibold transition-all duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Archives
              <svg
                className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-90' : ''
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id="dropdown-menu"
              className={`
                ${
                  isDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }
                origin-top-right absolute right-0 w-32 rounded-md shadow-lg bg-transparent ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none transition-all duration-300 ease-in-out
              `}
            >
              <div className="py-1">
                <a
                  href="/archives/2024"
                  className="block px-3 py-2 mt-2 text-sm lg:text-lg text-white hover:bg-opacity-50 hover:bg-slate-50 rounded-md transition-all duration-300 text-center"
                >
                  Archives 2024
                </a>
                <a
                  href="/projects/2024"
                  className="block px-3 py-2 mt-2 text-sm lg:text-lg text-white hover:bg-opacity-50 hover:bg-slate-50 rounded-md transition-all duration-300 text-center"
                >
                  Projects 2024
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full min-w-fit h-full mr-5 sm:mr-0 flex justify-end sm:justify-around items-center">
          <ul className="w-fit hidden lg:flex justify-center items-center mx-5 lg:gap-5 md:gap-1 gap-6">
            <li>
              <a href="https://www.linkedin.com/company/web3ssh/" target="_blank">
                <img style={socialIconStyle} src={Linkedin.src} alt="Linkedin" />
              </a>
            </li>
            <li>
              <a href="https://x.com/web3ssh" target="_blank">
                <img style={socialIconStyle} src={XIcon.src} alt="X" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/web3ssh/" target="_blank">
                <img style={socialIconStyle} src={Instagram.src} alt="Instagram" />
              </a>
            </li>
          </ul>

          <a href="/brochure/2025" className="inline-block">
            <button
              type="button"
              className="flex items-center justify-center w-40 px-5 py-2.5 text-xs lg:text-sm font-medium text-white transition-all duration-300 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              {isMounted && (
                <img
                  src="/download-icon.svg"
                  alt="Download"
                  className="w-6 h-6 mr-2"
                />
              )}
              Brochure
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
