'use client';
import { AnimatedTooltip } from '../ui/animated-tooltip';
import j3dai_logo from './../../../public/partners2025/J3d.ai_Logo_White.png';
import Ethereum from './../../../public/partners2025/eth-logo-white.svg';

export default function Partners() {
  const sponsors = [
    {
      name: 'Ethereum',
      logo: Ethereum,
      link: 'https://ethereum.org/en/',
      type: 'Title Sponsor',
    },
  ];
  const partners = [
    {
      name: 'J3D.ai',
      logo: j3dai_logo,
      link: 'https://j3d.ai/',
      type: 'Intelligence Partner',
    },
  ];

  return (
    <section className="mt-8 mb-16 bg-white bg-opacity-0 w-full flex justify-center items-center p-4 sm:p-6 font-sans font-medium">
      <div className="w-full max-w-4xl">
        <div className="w-full h-fit flex flex-col space-y-12">
          {/* Sponsors Section */}
          <div className="w-full flex flex-col items-center space-y-6">
            <h1 className="text-white text-2xl sm:text-3xl text-center">
              Sponsors
            </h1>
            <div className="flex flex-wrap gap-4 justify-center items-center w-full">
              {sponsors.map((partner, index) => (
                <a
                  key={index}
                  className="p-3 sm:p-4 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
                  target="_blank"
                  href={partner.link}
                >
                  <div className="h-[60px] sm:h-[80px] flex justify-center items-center">
                    <img
                      src={partner.logo.src}
                      alt={partner.name}
                      className="w-[120px] sm:w-[140px] h-auto"
                    />
                  </div>
                  <div className="text-white text-base sm:text-lg mt-2 text-center">
                    {partner.type}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Partners Section */}
          <div className="w-full flex flex-col items-center space-y-6">
            <h1 className="text-white text-2xl sm:text-3xl text-center">
              Partners
            </h1>
            <div className="flex flex-wrap gap-4 justify-center items-center w-full">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  className="p-3 sm:p-4 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
                  target="_blank"
                  href={partner.link}
                >
                  <div className="h-[60px] sm:h-[80px] flex justify-center items-center">
                    <img
                      src={partner.logo.src}
                      alt={partner.name}
                      className="w-[120px] sm:w-[140px] h-auto"
                    />
                  </div>
                  <div className="text-white text-base sm:text-lg mt-2 text-center">
                    {partner.type}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
