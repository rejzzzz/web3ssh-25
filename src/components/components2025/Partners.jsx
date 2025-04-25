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
                  <div className="text-white text-2xl p-4">
                  <svg width="960" height="660" viewBox="0 0 960 660">
                  <g transform="translate(410, 0)">
                    <path d="M57.5054 181V135.84L1.64064 103.171L57.5054 181Z" fill="#ffffff" stroke="#ffffff" stroke-linejoin="round"></path>
                    <path d="M57.6906 181V135.84L113.555 103.171L57.6906 181Z" fill="#ffffff" stroke="#ffffff" stroke-linejoin="round"></path>
                    <path d="M57.5055 124.615V66.9786L1 92.2811L57.5055 124.615Z" fill="#ffffff" stroke="#ffffff" stroke-linejoin="round"></path>
                    <path d="M57.6903 124.615V66.9786L114.196 92.2811L57.6903 124.615Z" fill="#ffffff" stroke="#ffffff" stroke-linejoin="round"></path>
                    <path d="M1.00006 92.2811L57.5054 1V66.9786L1.00006 92.2811Z" fill="#ffffff" stroke="#ffffff" stroke-linejoin="round"></path>
                    <path d="M114.196 92.2811L57.6906 1V66.9786L114.196 92.2811Z" fill="#ffffff" stroke="#ffffff" stroke-linejoin="round"></path>
                  </g>
                  
                  <g transform="translate(280, 20) scale(0.4)">
                    <path d="M86.7,611.5a3.88,3.88,0,0,1-3.9,3.8H7.9c1.9,18.5,15.8,35.4,35.4,35.4,13.4,0,23.3-5.1,30.8-15.8a3.74,3.74,0,0,1,4.8-1.5,3.63,3.63,0,0,1,2.1,2.7,3.51,3.51,0,0,1-.5,2.6C73,651.8,58,658.3,43.2,658.3,18,658.3,0,635.8,0,611.6s18-46.7,43.2-46.7,43.5,22.5,43.5,46.6Zm-8-3.7c-1.6-18.5-15.8-35.4-35.4-35.4S9.8,589.3,7.9,607.8Z" fill="#ffffff"/>
                    <path d="M177.6,566.8a3.93,3.93,0,0,1,3.8,3.8,3.74,3.74,0,0,1-3.8,3.8H157.5v78.8a3.86,3.86,0,0,1-3.8,3.8,3.93,3.93,0,0,1-3.8-3.8V574.4H130.6a3.74,3.74,0,0,1-3.8-3.8,3.86,3.86,0,0,1,3.8-3.8h19.3V537.9a3.77,3.77,0,0,1,3-3.8,3.72,3.72,0,0,1,4.5,3.7v29Z" fill="#ffffff"/>
                    <path d="M300.2,604.9v47.7a3.93,3.93,0,0,1-3.8,3.8,3.74,3.74,0,0,1-3.8-3.8V604.9c0-16.1-9.1-32.2-27.1-32.2-23.1,0-33,20.1-31.6,40.8,0,.5.3,2.9.3,3.2v35.8a3.77,3.77,0,0,1-3,3.8,3.72,3.72,0,0,1-4.5-3.7V495.7a3.86,3.86,0,0,1,3.8-3.8,3.93,3.93,0,0,1,3.8,3.8v88.8c6.4-11.5,18-19.3,31.4-19.3,21.9,0,34.5,19.3,34.5,39.7Z" fill="#ffffff"/>
                    <path d="M434.5,611.5a3.88,3.88,0,0,1-3.9,3.8H355.7c1.9,18.5,15.8,35.4,35.4,35.4,13.4,0,23.3-5.1,30.8-15.8a3.74,3.74,0,0,1,4.8-1.5,3.63,3.63,0,0,1,2.1,2.7,3.51,3.51,0,0,1-.5,2.6c-7.5,13.1-22.5,19.6-37.3,19.6-25.2,0-43.2-22.5-43.2-46.7s18-46.7,43.2-46.7,43.5,22.5,43.5,46.6Zm-8-3.7c-1.6-18.5-15.8-35.4-35.4-35.4s-33.5,16.9-35.4,35.4Z" fill="#ffffff"/>
                    <path d="M526.5,570.3a3.61,3.61,0,0,1-3.5,4c-22,3.2-31.9,21.2-31.9,42.1v35.8a3.77,3.77,0,0,1-3,3.8,3.72,3.72,0,0,1-4.5-3.7V570.6a3.77,3.77,0,0,1,3-3.8,3.72,3.72,0,0,1,4.5,3.7v16.6c6.2-10.5,18.5-20.4,31.4-20.4,1.8.1,4,1.4,4,3.6Z" fill="#ffffff"/>
                    <path d="M649.6,611.5a3.88,3.88,0,0,1-3.9,3.8H570.8c1.9,18.5,15.8,35.4,35.4,35.4,13.4,0,23.3-5.1,30.8-15.8a3.74,3.74,0,0,1,4.8-1.5,3.63,3.63,0,0,1,2.1,2.7,3.51,3.51,0,0,1-.5,2.6c-7.5,13.1-22.5,19.6-37.3,19.6-25.2,0-43.2-22.5-43.2-46.7s18-46.7,43.2-46.7,43.4,22.5,43.5,46.6Zm-8.1-3.7c-1.6-18.5-15.8-35.4-35.4-35.4s-33.5,16.9-35.4,35.4Z" fill="#ffffff"/>
                    <path d="M770.5,571.2v81.9a3.93,3.93,0,0,1-3.8,3.8,3.74,3.74,0,0,1-3.8-3.8V637.5c-6.2,12.3-17.2,21.2-31.1,21.2-22.3,0-34.6-19.3-34.6-39.7V571a3.8,3.8,0,0,1,7.6,0v48c0,16.1,9.1,32.2,27.1,32.2,25.2,0,31.1-23.6,31.1-49.6V571a3.77,3.77,0,0,1,4.8-3.6,3.87,3.87,0,0,1,2.7,3.8Z" fill="#ffffff"/>
                    <path d="M960.1,604.6v48a3.93,3.93,0,0,1-3.8,3.8,3.74,3.74,0,0,1-3.8-3.8v-48c0-16.1-9.1-31.9-27.1-31.9-22.5,0-31.1,24.1-31.1,42.9v37a3.93,3.93,0,0,1-3.8,3.8,3.74,3.74,0,0,1-3.8-3.8v-48c0-16.1-9.1-31.9-27.1-31.9-22.8,0-32.2,18-31.4,41.8,0,.5.3,1.6,0,1.9v36.1a3.77,3.77,0,0,1-3,3.8,3.72,3.72,0,0,1-4.5-3.7v-82a3.77,3.77,0,0,1,3-3.8,3.72,3.72,0,0,1,4.5,3.7v13.7c6.4-11.5,18-19,31.4-19,15.3,0,27.1,9.7,31.9,23.9,6.2-13.9,18.2-23.9,33.8-23.9C947.5,565.2,960.1,584.2,960.1,604.6Z" fill="#ffffff"/>
                  </g>
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
