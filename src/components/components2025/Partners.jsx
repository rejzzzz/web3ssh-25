import { AnimatedTooltip } from '../ui/animated-tooltip';
import j3dai_logo from './../../../public/partners2025/J3d.ai_Logo_White.png';

export default function Partners() {
  const sponsors = [];
  const partners = [
    {
      name: 'J3D.ai',
      logo: j3dai_logo,
      link: 'https://j3d.ai/',
      type: 'Intelligence Partner',
    },
  ];

  return (
    <section className="mt-[50px] mb-[100px] bg-white bg-opacity-0 w-full flex justify-center items-center p-2 font-sans font-medium">
      <div className="w-full lg:pb-0">
        <div className="w-full h-fit grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-5 md:grid-cols-2 text-gray-400">
          {/* Sponsors Section */}
                <div className="w-full h-fit space-y-6">
                <h1 className="text-white text-4xl text-center mb-5">Sponsors</h1>
                <div className="flex w-full h-fit justify-center items-center flex-wrap">
                  <div className="text-white text-2xl p-4"><svg width="150" height="150" viewBox="0 0 115 182">
                  <path d="M57.5054 181V135.84L1.64064 103.171L57.5054 181Z" fill="#828485" stroke="#3b3b3b" stroke-linejoin="round"></path>
                  <path d="M57.6906 181V135.84L113.555 103.171L57.6906 181Z" fill="#303131" stroke="#3b3b3b" stroke-linejoin="round"></path>
                  <path d="M57.5055 124.615V66.9786L1 92.2811L57.5055 124.615Z" fill="#353636" stroke="#3b3b3b" stroke-linejoin="round"></path>
                  <path d="M57.6903 124.615V66.9786L114.196 92.2811L57.6903 124.615Z" fill="#141414" stroke="#3b3b3b" stroke-linejoin="round"></path>
                  <path d="M1.00006 92.2811L57.5054 1V66.9786L1.00006 92.2811Z" fill="#828485" stroke="#3b3b3b" stroke-linejoin="round"></path>
                  <path d="M114.196 92.2811L57.6906 1V66.9786L114.196 92.2811Z" fill="#303131" stroke="#3b3b3b" stroke-linejoin="round"></path>
                </svg>
                </div>
                </div>
                </div>

                {/* Partners Section */}
          <div className="w-full h-fit space-y-6">
            <h1 className="text-white text-4xl text-center mb-5">Partners</h1>
            <div className="flex w-full h-fit justify-center items-center flex-wrap">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  className="p-4 flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:translate-y-2 cursor-pointer"
                  target="_blank"
                  href={partner.link}
                >
                  <div className="h-[120px] flex justify-center items-center">
                    <img
                      src={partner.logo.src}
                      alt={partner.name}
                      className="w-[160px] h-[auto] sm:h-[50px] md:w-[160px] md:h-[auto]"
                    />
                  </div>
                  <div className="text-white text-xl">{partner.type}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
