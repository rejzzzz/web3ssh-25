'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award, MapPin } from 'lucide-react';

const SpeakerCardV2 = ({ title, experience, imgSrc, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.div
        className="group relative w-full cursor-pointer h-full"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={toggleModal}
      >
        {/* Subtle professional glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400/10 via-white/5 to-gray-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        
        {/* Main card container */}
        <div 
          style={{
            backgroundColor: 'rgba(25, 25, 35, 0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
          }}
          className="relative overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 border border-gray-600/20 group-hover:border-white/15 h-full flex flex-col"
        >
          {/* Subtle professional elements, minimized for cleaner look */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-400/20 to-gray-600/20 rounded-full transform translate-x-12 -translate-y-12" />
          </div>

          {/* Image container - Professional portrait display */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-md">
            <div className="w-full h-full overflow-hidden">
              <img 
                src={imgSrc} 
                alt={title} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                style={{
                  objectPosition: "50% 35%",
                  objectFit: "cover"
                }}
              />
            </div>
            {/* Subtle gradient overlay for professional look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60" />
          </div>

          {/* Content section - Professional layout with fixed height */}
          <div className="relative p-4 bg-gradient-to-t from-black/20 to-transparent flex-1 flex flex-col justify-between min-h-[110px]">
            <div className="flex-1">
              {/* Speaker name */}
              <motion.h2 
                className="text-lg font-bold text-white mb-1.5 leading-tight line-clamp-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {title}
              </motion.h2>
              
              {/* Experience/Position */}
              <div className="mb-2 flex-1">
                <p className="text-gray-300 leading-relaxed text-xs font-medium line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                  {experience}
                </p>
              </div>
            </div>

            {/* Professional bottom section */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
              {/* Professional status indicator */}
              <div className="flex items-center space-x-2">
                <div className="px-1.5 py-0.5 bg-blue-900/30 border border-blue-500/20 rounded-sm">
                  <span className="text-[10px] text-blue-300 font-medium">Speaker</span>
                </div>
              </div>
              
              {/* View more indicator */}
              <div className="flex items-center space-x-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-medium">View</span>
                <ExternalLink size={11} />
              </div>
            </div>
          </div>

          {/* Subtle professional hover effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-gray-600/5 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        </div>
      </motion.div>

      {/* Professional Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'rgba(35, 35, 50, 0.35)',
                backdropFilter: 'blur(15px)',
                borderRadius: '12px',
              }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-gray-400/30 bg-gradient-to-br from-gray-600/10 via-gray-700/10 to-gray-600/10"
            >
              {/* Enhanced background patterns */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full transform translate-x-32 -translate-y-32 opacity-20 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400 to-indigo-500 rounded-full transform -translate-x-24 translate-y-24 opacity-20 blur-2xl" />
                <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-tr from-cyan-400/40 to-blue-500/40 rounded-full opacity-10 blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 via-transparent to-cyan-800/10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[url('/graphics/bg_pattern.svg')] bg-repeat opacity-5 mix-blend-overlay"></div>
              </div>

              <div className="flex flex-col md:flex-row relative z-10">
                {/* Image section - professional display */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <div className="h-full">
                    <img 
                      src={imgSrc} 
                      alt={title} 
                      className="w-full h-80 md:h-full object-cover shadow-lg" 
                      style={{objectPosition: "50% 35%"}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
                  </div>
                  
                  {/* Professional badge */}
                  <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md rounded-md border border-white/20">
                    <div className="flex items-center space-x-1.5">
                      <Award className="w-3 h-3 text-white" />
                      <span className="text-xs text-white/80 font-medium">Speaker</span>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="md:w-3/5 p-6 overflow-y-auto">
                  {/* Subtle professional background effect */}
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-900/5 to-transparent opacity-30"></div>

                  <div className="flex justify-between items-start mb-6 relative">
                    <div className="flex-1">
                      <motion.h2 
                        className="text-2xl md:text-3xl font-bold mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-white">
                          {title}
                        </span>
                      </motion.h2>
                      <motion.div
                        className="flex items-center mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                        <p className="text-gray-300 font-medium">{experience}</p>
                      </motion.div>
                    </div>
                    
                    <motion.button 
                      onClick={toggleModal} 
                      className="p-2 bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-xl rounded-md border border-gray-600/30 text-white/90 hover:text-white transition-all duration-200 ml-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <X size={18} />
                    </motion.button>
                  </div>

                  {/* Professional separator */}
                  <motion.div
                    className="w-full h-px bg-gray-700/50 mb-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div>
                      <p className="text-gray-200 leading-relaxed text-base relative p-0">{data}</p>
                    </div>
                  </motion.div>

                  {/* Professional action button */}
                  <motion.div
                    className="mt-6 flex items-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center px-4 py-2 bg-gray-800/30 rounded-md space-x-2 border border-gray-600/30">
                      <span className="text-xs font-medium text-white/90">Speaker at Web3SSH 2025</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpeakerCardV2;