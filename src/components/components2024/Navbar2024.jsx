'use client';
import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap/gsap-core';
import Linkedin from '@public/icons/linkedin.svg';
import XIcon from '@public/icons/x-logo.svg';
import Instagram from '@public/icons/instagram.svg';
import navData from '@data/2024/nav2024.json';
import Image from 'next/image';
import web3sshLogo from '@public/web3ssh.webp';
import iiitLogo from '@public/iiits.webp';

export default function Navbar() {
  const [topbarPosition, setTopbarPosition] = useState('0');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const containerStyle = {
    position: 'fixed',
    top: topbarPosition,
    width: 'calc(100vw - 100px)',
    left: '50px',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'top 0.5s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
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
          />
        </div>

        <div className="hidden sm:flex justify-between gap-6 items-center">
          <ul className="flex lg:gap-6 sm:gap-2">
            {navData.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  className="text-sm lg:text-lg px-1 py-1 rounded-md cursor-pointer hover:font-semibold hover:scale-125 hover:-translate-y-1"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full min-w-fit h-full mr-5 sm:mr-0 flex justify-end sm:justify-around items-center">
          <ul className="w-fit hidden lg:flex justify-center items-center mx-5 lg:gap-5 md:gap-1 gap-6">
            <li>
              <a
                href="https://www.linkedin.com/company/web3ssh/"
                target="_blank"
              >
                <img
                  style={socialIconStyle}
                  src={Linkedin.src}
                  alt="Linkedin"
                />
              </a>
            </li>
            <li>
              <a href="https://x.com/web3ssh" target="_blank">
                <img style={socialIconStyle} src={XIcon.src} alt="X" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/web3ssh/" target="_blank">
                <img
                  style={socialIconStyle}
                  src={Instagram.src}
                  alt="Instagram"
                />
              </a>
            </li>
          </ul>

          <a href="/brochure" className="inline-block">
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
