'use client';

import { useId, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  GithubIcon,
  ExternalLink,
  Youtube,
  X,
  Database,
  Code,
  Blocks,
  Wallet,
  Coins,
  FileCode,
  Shield,
  Globe,
  Cpu,
} from 'lucide-react';

export interface Project {
  ProjectName: string;
  TeamName: string;
  GithubLink: string;
  DeployedLink: string;
  YoutubeLink: string;
  ProblemSolve: string;
  Challenges: string;
}

interface ProjectCardProps {
  project: Project;
  onOpen?: (project: Project) => void;
  isActive: boolean;
  onClose: () => void;
}

const web3Icons = [
  { icon: Database, label: 'Blockchain' },
  { icon: Code, label: 'Smart Contract' },
  { icon: Blocks, label: 'DApp' },
  { icon: Wallet, label: 'Wallet' },
  { icon: Coins, label: 'Tokens' },
  { icon: FileCode, label: 'Protocol' },
  { icon: Shield, label: 'Security' },
  { icon: Globe, label: 'Web3' },
  { icon: Cpu, label: 'Consensus' },
];

const projectImageMap: Record<string, string> = {
  'Project-1_Decentrald': '/projects/Project-1_Decentrald.png',
  'Project-2_Happy Piggy Bank': '/projects/Project-2_Happy Piggy Bank.png',
  'Project-3_Tokenize': '/projects/Project-3_Tokenize.png',
  'Project-4_SAVE X ROSS': '/projects/Project-4_SAVE X ROSS.png',
  'Project-5_Blockchain-based...': '/projects/Project-5_Blockchain-based....png',
  'Project-6_TeraChain': '/projects/Project-6_TeraChain.png',
  'Project-7_Multi-Send Application': '/projects/Project-7_Multi-Send Application.png',
  'Project-8_PharmZy': '/projects/Project-8_PharmZy.png',
  'Project-9_Decentralised': '/projects/Project-9_Decentralised.png',
  'Project-10_MedPulseAI': '/projects/Project-10_MedPulseAI.png',
  'Project-11_Attend Smart': '/projects/Project-11_Attend Smart.png',
  'Project-12_JewelAssure': '/projects/Project-12_JewelAssure.png',
  'Project-13_AUTHENTICITY SENTINEL AI (ASA)': '/projects/Project-13_AUTHENTICITY SENTINEL AI (ASA).png',
  'Project-14_CrediFlow': '/projects/Project-14_CrediFlow.png',
  'Project-15_EthSplit': '/projects/Project-15_EthSplit.png',
  'Project-16_Music_NFT': '/projects/Project-16_Music_NFT.png',
  'Project-17_Lockie': '/projects/Project-17_Lockie.png',
  'Project-18_Carbon': '/projects/Project-18_Carbon.png',
  'Project-19_fund33': '/projects/Project-19_fund33.png',
  'Project-20_SecureSwap': '/projects/Project-20_SecureSwap.png',
  'Project-21_Xfile': '/projects/Project-21_Xfile.png',
  'Project-22_KNOW': '/projects/Project-22_KNOW.png',
  'Project-23_Grantitude': '/projects/Project-23_Grantitude.png',
  'Project-24_Voting dAPP': '/projects/Project-24_Voting dAPP.png',
  'Project-25_Dfiles': '/projects/Project-25_Dfiles.png',
  'Project-26_Mercado': '/projects/Project-26_Mercado.png',
  'Project-27_CHARITY CHAIN': '/projects/Project-27_CHARITY CHAIN.png',
  'Project-28_Artify - Decentralized Art Marketplace': '/projects/Project-28_Artify - Decentralized Art Marketplace.png',
  'Project-29_ThriftyDapp': '/projects/Project-29_ThriftyDapp.png',
  'Project-30_TendersRaid': '/projects/Project-30_TendersRaid.png',
  'Project-31_EngageCoin': '/projects/Project-31_EngageCoin.png',
  'Project-32_medKART': '/projects/Project-32_medKART.png',
};

export default function ProjectCard({
  project,
  onOpen,
  isActive,
  onClose,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (isActive) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, onClose]);

  const projectIcons = (() => {
    const hash = project.ProjectName.split('').reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0,
    );
    const numIcons = 3 + (hash % 3);

    const selectedIcons = [];
    for (let i = 0; i < numIcons; i++) {
      const iconIndex = (hash + i * 7) % web3Icons.length;
      selectedIcons.push(web3Icons[iconIndex]);
    }

    return selectedIcons;
  })();

  const findMatchingImagePath = (projectName: string): string => {
    if (projectImageMap[projectName]) {
      return projectImageMap[projectName];
    }

    const partialMatches = Object.keys(projectImageMap).filter(
      (key) => projectName.includes(key) || key.includes(projectName),
    );

    if (partialMatches.length > 0) {
      return projectImageMap[partialMatches[0]];
    }

    return getPlaceholderSVG();
  };

  const imageUrl = findMatchingImagePath(project.ProjectName);

  function getPlaceholderSVG() {
    const svg = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${id.replace(/:/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad${id.replace(/:/g, '')})"/>
        <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" 
          text-anchor="middle" dominant-baseline="middle">
          Web3 Project
        </text>
      </svg>
    `.trim();

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isActive ? (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 flex items-center justify-center z-[100] p-4"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex absolute top-6 right-6 items-center justify-center bg-white/90 hover:bg-white rounded-full h-12 w-12 z-[101] shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close project details"
            >
              <X className="h-6 w-6 text-black" />
            </motion.button>

            <motion.div
              ref={ref}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-6xl h-full max-h-[95vh] flex flex-col bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`title-${project.ProjectName}-${id}`}
            >
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <img
                  width={800}
                  height={400}
                  src={imageUrl}
                  alt={`${project.ProjectName} project image`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getPlaceholderSVG();
                  }}
                  className="w-full h-full rounded-t-3xl object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3
                    className="font-bold text-3xl lg:text-4xl text-white mb-3"
                    id={`title-${project.ProjectName}-${id}`}
                  >
                    {project.ProjectName}
                  </h3>
                  <p className="text-white/90 text-xl">
                    Team: {project.TeamName}
                  </p>
                </div>
              </div>

              <div className="flex flex-col p-8 lg:p-10 overflow-y-auto flex-1">
                <motion.div
                  className="flex flex-wrap gap-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {projectIcons.map((iconData, index) => {
                    const IconComponent = iconData.icon;
                    return (
                      <motion.div
                        key={`${iconData.label}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-sm"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{iconData.label}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>

                <motion.div
                  className="flex justify-center lg:justify-end items-start mb-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex gap-4 flex-wrap">
                    {project.GithubLink && (
                      <motion.a
                        href={project.GithubLink}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 text-sm rounded-full font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-200"
                        aria-label="View GitHub repository"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon className="h-5 w-5" />
                        <span>GitHub</span>
                      </motion.a>
                    )}
                    {project.DeployedLink && (
                      <motion.a
                        href={project.DeployedLink}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 text-sm rounded-full font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-200"
                        aria-label="View live demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    {project.YoutubeLink && (
                      <motion.a
                        href={project.YoutubeLink}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 text-sm rounded-full font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-200"
                        aria-label="Watch YouTube video"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Youtube className="h-5 w-5" />
                        <span>YouTube</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>

                <div className="space-y-8">
                  {project.ProblemSolve && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <h4 className="font-semibold text-white text-xl mb-4 flex items-center gap-3">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        Problem Statement
                      </h4>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                        <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                          {project.ProblemSolve}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {project.Challenges && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-semibold text-white text-xl mb-4 flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        Challenges Faced
                      </h4>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                        <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                          {project.Challenges}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key={`card-${project.ProjectName}`}
            onClick={() => onOpen?.(project)}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer"
            tabIndex={0}
            role="button"
            aria-expanded="false"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen?.(project);
              }
            }}
          >
            {/* Card Container */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 shadow-xl transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 h-full">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  width={400}
                  height={200}
                  src={imageUrl}
                  alt={`${project.ProjectName} project thumbnail`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getPlaceholderSVG();
                  }}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="font-bold text-white text-lg mb-2 transition-colors duration-200 line-clamp-2">
                  {project.ProjectName}
                </h3>
                <p className="text-white/80 group-hover:text-white transition-colors duration-200 text-sm mb-4">
                  Team: {project.TeamName}
                </p>

                {/* Preview Icons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {projectIcons.slice(0, 3).map((iconData, index) => {
                    const IconComponent = iconData.icon;
                    return (
                      <div
                        key={`${iconData.label}-${index}`}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-white/10 text-white border border-white/20"
                      >
                        <IconComponent className="h-3 w-3" />
                        <span>{iconData.label}</span>
                      </div>
                    );
                  })}
                  {projectIcons.length > 3 && (
                    <div className="px-2 py-1 text-xs rounded-full bg-white/10 text-white border border-white/20">
                      +{projectIcons.length - 3} more
                    </div>
                  )}
                </div>

                {/* Explore Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(6, 182, 212, 0.8)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-3 text-sm rounded-xl font-bold bg-white/20 hover:bg-cyan-500/80 text-white border border-white/30 transition-all duration-200 shadow-lg"
                  aria-label="Open project details"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen?.(project);
                  }}
                >
                  Explore Project →
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
