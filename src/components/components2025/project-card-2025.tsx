'use client';

import { useId, useRef, useEffect, useState } from 'react';
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
  Play,
  Trophy,
  Crown,
  Award,
  Medal,
} from 'lucide-react';

export interface Project2025 {
  _id: string;
  email: string;
  uid: string;
  projectName: string;
  teamName: string;
  tracks: string[];
  participantNames: string[];
  description: string;
  problemStatement: string;
  solutionOverview: string;
  technologiesUsed: string[];
  demoVideoLink?: string;
  githubRepoLink: string;
  liveDemoLink?: string;
  supportingFiles: string[];
  termsAccepted: boolean;
  submissionId: string;
  submissionNumber: number;
  submissionTimestamp: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectCard2025Props {
  project: Project2025;
  onOpen?: (project: Project2025) => void;
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

const trackColors: Record<string, string> = {
  Open: 'bg-gradient-to-r from-blue-500 to-cyan-500',
  Women: 'bg-gradient-to-r from-pink-500 to-purple-500',
  Student: 'bg-gradient-to-r from-green-500 to-emerald-500',
  Professional: 'bg-gradient-to-r from-orange-500 to-red-500',
};

// Winners data for 2025 hackathon
const winners = {
  Open: {
    '1st Place': 'Bhaisaaab',
    '2nd Place': "Bohar's bit",
    '3rd Place': 'ASCendant',
    '4th Place': 'CryptoRizzz',
  },
  Women: {
    '1st Place': 'Cryptonauts',
    '2nd Place': 'Weathering with code',
    '3rd Place': 'Nexachain',
  },
};

// Function to get winner information for a team
const getWinnerInfo = (teamName: string, tracks: string[]) => {
  for (const track of tracks) {
    const trackWinners = winners[track as keyof typeof winners];
    if (trackWinners) {
      for (const [position, winnerTeam] of Object.entries(trackWinners)) {
        if (winnerTeam.toLowerCase() === teamName.toLowerCase()) {
          return { position, track };
        }
      }
    }
  }
  return null;
};

// Winner badge component
const WinnerBadge = ({
  position,
  track,
}: {
  position: string;
  track: string;
}) => {
  const getIcon = () => {
    switch (position) {
      case '1st Place':
        return Crown;
      case '2nd Place':
        return Trophy;
      case '3rd Place':
        return Medal;
      case '4th Place':
        return Award;
      default:
        return Trophy;
    }
  };

  const getColors = () => {
    switch (position) {
      case '1st Place':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900';
      case '2nd Place':
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900';
      case '3rd Place':
        return 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100';
      case '4th Place':
        return 'bg-gradient-to-r from-purple-500 to-purple-700 text-purple-100';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-700 text-blue-100';
    }
  };

  const IconComponent = getIcon();

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
      className={`absolute top-4 right-4 z-30 px-3 py-2 rounded-xl ${getColors()} shadow-2xl border-2 border-white/20 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-2">
        <IconComponent className="h-4 w-4" />
        <div className="text-xs font-bold">
          <div>{position}</div>
          <div className="opacity-80">{track} Track</div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectCard2025({
  project,
  onOpen,
  isActive,
  onClose,
}: ProjectCard2025Props) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [showVideo, setShowVideo] = useState(false);

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (isActive) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
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

  // Reset video state when modal closes
  useEffect(() => {
    if (!isActive) {
      setShowVideo(false);
      // Reset thumbnail loading state
      setCurrentThumbnailIndex(0);
      setThumbnailError(false);
      setImageLoading(true);
    }
  }, [isActive]);

  const projectIcons = (() => {
    const hash = project.projectName
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const numIcons = 3 + (hash % 3);

    const selectedIcons = [];
    for (let i = 0; i < numIcons; i++) {
      const iconIndex = (hash + i * 7) % web3Icons.length;
      selectedIcons.push(web3Icons[iconIndex]);
    }

    return selectedIcons;
  })();

  function getPlaceholderSVG() {
    // Create a unique color based on project name
    const hash = project.projectName
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const colors = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140'],
      ['#a8edea', '#fed6e3'],
      ['#ffecd2', '#fcb69f'],
      ['#ff9a9e', '#fecfef'],
    ];

    const colorPair = colors[hash % colors.length];

    const svg = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${id.replace(/:/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorPair[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colorPair[1]};stop-opacity:1" />
          </linearGradient>
          <pattern id="pattern${id.replace(/:/g, '')}" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="2" fill="white" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad${id.replace(/:/g, '')})"/>
        <rect width="100%" height="100%" fill="url(#pattern${id.replace(/:/g, '')})"/>
        <g transform="translate(300, 160)">
          <circle cx="0" cy="0" r="40" fill="white" opacity="0.2"/>
          <polygon points="0,-20 17,10 -17,10" fill="white" opacity="0.8" transform="translate(-5, 0)"/>
        </g>
        <text x="50%" y="75%" font-family="Arial" font-size="18" font-weight="bold" fill="white" 
          text-anchor="middle" dominant-baseline="middle" opacity="0.9">
          ${project.projectName.length > 30 ? project.projectName.substring(0, 30) + '...' : project.projectName}
        </text>
        <text x="50%" y="85%" font-family="Arial" font-size="14" fill="white" 
          text-anchor="middle" dominant-baseline="middle" opacity="0.7">
          ${project.teamName}
        </text>
      </svg>
    `.trim();

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;

    // Try multiple thumbnail qualities as fallbacks
    return {
      high: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      medium: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
    };
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.demoVideoLink) {
      setShowVideo(!showVideo);
    }
  };

  const handleYouTubeLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.demoVideoLink) {
      window.open(project.demoVideoLink, '_blank');
    }
  };

  const videoId = project.demoVideoLink
    ? getYouTubeVideoId(project.demoVideoLink)
    : null;
  const thumbnailUrls = project.demoVideoLink
    ? getYouTubeThumbnail(project.demoVideoLink)
    : null;

  // State for managing thumbnail loading
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    if (
      thumbnailUrls &&
      currentThumbnailIndex < Object.values(thumbnailUrls).length - 1
    ) {
      setCurrentThumbnailIndex(currentThumbnailIndex + 1);
      setImageLoading(true); // Reset loading state for next image
    } else {
      setThumbnailError(true);
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const getCurrentThumbnail = () => {
    if (!thumbnailUrls) return getPlaceholderSVG();
    if (thumbnailError) return getPlaceholderSVG();

    const thumbnailOptions = Object.values(thumbnailUrls);
    return thumbnailOptions[currentThumbnailIndex];
  };

  // Preload next thumbnail option for faster fallback
  useEffect(() => {
    if (
      thumbnailUrls &&
      currentThumbnailIndex < Object.values(thumbnailUrls).length - 1
    ) {
      const nextImage = new Image();
      nextImage.src = Object.values(thumbnailUrls)[currentThumbnailIndex + 1];
    }
  }, [currentThumbnailIndex, thumbnailUrls]);

  // Get winner information for this team
  const winnerInfo = getWinnerInfo(project.teamName, project.tracks);

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
              aria-labelledby={`title-${project.projectName}-${id}`}
            >
              {/* Header with project image/video */}
              <div className="relative h-80 lg:h-96 overflow-hidden">
                {/* Winner Badge for Modal */}
                {winnerInfo && (
                  <div className="absolute top-6 left-6 z-30">
                    <WinnerBadge
                      position={winnerInfo.position}
                      track={winnerInfo.track}
                    />
                  </div>
                )}

                {showVideo && videoId ? (
                  <div className="w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      title={`${project.projectName} demo video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <>
                    {imageLoading && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      width={800}
                      height={400}
                      src={getCurrentThumbnail()}
                      alt={`${project.projectName} project image`}
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      className="w-full h-full rounded-t-3xl object-cover object-center"
                      style={{ opacity: imageLoading ? 0 : 1 }}
                    />

                    {project.demoVideoLink && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button
                          onClick={handleVideoClick}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-red-600/90 hover:bg-red-600 text-white rounded-full p-4 shadow-2xl backdrop-blur-sm z-20"
                        >
                          <Play className="h-8 w-8 ml-1" />
                        </motion.button>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3
                    className="font-bold text-3xl lg:text-4xl text-white mb-3"
                    id={`title-${project.projectName}-${id}`}
                  >
                    {project.projectName}
                  </h3>
                  <p className="text-white/90 text-xl">
                    Team: {project.teamName}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tracks.map((track) => (
                      <span
                        key={track}
                        className={`px-3 py-1 text-sm rounded-full text-white ${
                          trackColors[track] || 'bg-gray-500'
                        }`}
                      >
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-8 lg:p-10 overflow-y-auto flex-1">
                {/* Tech Icons */}
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

                {/* Action Buttons */}
                <motion.div
                  className="flex justify-center lg:justify-end items-start mb-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex gap-4 flex-wrap">
                    {project.githubRepoLink && (
                      <motion.a
                        href={project.githubRepoLink}
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
                    {project.liveDemoLink && (
                      <motion.a
                        href={project.liveDemoLink}
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
                    {project.demoVideoLink && (
                      <motion.button
                        onClick={handleYouTubeLinkClick}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 text-sm rounded-full font-medium bg-red-600/80 hover:bg-red-600 text-white border border-red-500/50 backdrop-blur-sm transition-all duration-200"
                        aria-label="Watch on YouTube"
                      >
                        <Youtube className="h-5 w-5" />
                        <span>YouTube</span>
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                {/* Project Details */}
                <div className="space-y-8">
                  {/* Technologies Used */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h4 className="font-semibold text-white text-xl mb-4 flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologiesUsed.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm rounded-full bg-green-500/20 text-green-300 border border-green-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Problem Statement */}
                  {project.problemStatement && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-semibold text-white text-xl mb-4 flex items-center gap-3">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        Problem Statement
                      </h4>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                        <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                          {project.problemStatement}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Solution Overview */}
                  {project.solutionOverview && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <h4 className="font-semibold text-white text-xl mb-4 flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        Solution Overview
                      </h4>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                        <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                          {project.solutionOverview}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Description */}
                  {project.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="font-semibold text-white text-xl mb-4 flex items-center gap-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                        Project Description
                      </h4>
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                        <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                          {project.description}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Team Members */}
                  {project.participantNames.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <h4 className="font-semibold text-white text-xl mb-4 flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        Team Members
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.participantNames.map((name, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key={`card-${project.projectName}`}
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
              {/* Winner Badge for Card */}
              {winnerInfo && (
                <WinnerBadge
                  position={winnerInfo.position}
                  track={winnerInfo.track}
                />
              )}

              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center z-10">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  width={400}
                  height={200}
                  src={getCurrentThumbnail()}
                  alt={`${project.projectName} project thumbnail`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  style={{ opacity: imageLoading ? 0 : 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Video Play Button */}
                {project.demoVideoLink && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600/90 text-white rounded-full p-3 shadow-lg backdrop-blur-sm">
                      <Play className="h-6 w-6 ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="font-bold text-white text-lg mb-2 transition-colors duration-200 line-clamp-2">
                  {project.projectName}
                </h3>
                <p className="text-white/80 group-hover:text-white transition-colors duration-200 text-sm mb-4">
                  Team: {project.teamName}
                </p>

                {/* Tracks */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tracks.slice(0, 2).map((track) => (
                    <span
                      key={track}
                      className={`px-2 py-1 text-xs rounded-full text-white ${
                        trackColors[track] || 'bg-gray-500'
                      }`}
                    >
                      {track}
                    </span>
                  ))}
                  {project.tracks.length > 2 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white border border-white/20">
                      +{project.tracks.length - 2} more
                    </span>
                  )}
                </div>

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
