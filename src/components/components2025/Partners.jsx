'use client';
import { AnimatedTooltip } from '../ui/animated-tooltip';
import j3dai_logo from './../../../public/partners2025/J3d.ai_Logo_White.png';
import geodeworkLogo from './../../../public/partners2025/geodework-white.png';
import iiitiansNetworkLogo from '@public/partners/iiitans_network_logo.webp';

export default function Partners() {
  const items = [
    {
      category: 'Sponsors',
      list: [
        {
          name: 'Ethereum',
          logo: geodeworkLogo,
          link: 'https://geodework.com/',
          type: 'Title Sponsor',
        },
      ],
    },
    {
      category: 'Partners',
      list: [
        {
          name: 'J3D.ai',
          logo: j3dai_logo,
          link: 'https://j3d.ai/',
          type: 'Intelligence Partner',
        },
        {
          name: 'IIITians Network',
          logo: iiitiansNetworkLogo,
          link: 'https://iiitiansnetwork.com/',
          type: 'Community Partner',
        },
      ],
    },
  ];

  return (
    <section className="mt-8 mb-16 w-full flex justify-center p-4 sm:p-6 font-sans font-medium">
      <div className="w-full max-w-4xl">
        <div className="w-full flex flex-row gap-8 justify-center flex-wrap">
          {items.map((section, idx) => (
            <div key={idx} className="flex-1 min-w-[300px]">
              <h1 className="text-white text-2xl sm:text-3xl mb-6 text-center">
                {section.category}
              </h1>
              <div className="flex flex-row flex-wrap gap-4 justify-center">
                {section.list.map((item, index) => (
                  <a
                    key={index}
                    className="p-3 sm:p-4 flex flex-col items-center transition duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
                    target="_blank"
                    href={item.link}
                  >
                    <div className="h-[60px] sm:h-[80px] flex justify-center items-center">
                      <img
                        src={item.logo.src}
                        alt={item.name}
                        className="w-[120px] sm:w-[140px] h-auto"
                      />
                    </div>
                    <div className="text-white text-base sm:text-lg mt-2 text-center">
                      {item.type}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
