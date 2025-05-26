'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap } from 'lucide-react';

const SkeletonCard = () => (
  <div style={{
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px'
  }} className="p-4 md:p-6 animate-pulse">
    <div className="flex items-center justify-center mb-2">
      <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-500 rounded"></div>
    </div>
    <div className="h-6 md:h-8 bg-gray-500 rounded mb-2"></div>
    <div className="h-4 bg-gray-500 rounded"></div>
  </div>
);

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-30"
          style={{
            background: `linear-gradient(135deg, ${
              i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#06B6D4' : '#EC4899'
            }, transparent)`,
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default function LoadingState() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background matching your website's gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]"></div>
      </div>
      
      <FloatingOrbs />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto px-4">
          <motion.div
            className="relative mx-auto mb-8"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity },
            }}
          >
            <div className="w-32 h-32 border-4 border-purple-400/30 border-t-purple-400 rounded-full relative">
              <div className="absolute inset-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full">
                <Rocket className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-6"
          >
            Loading Ambassador Data
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-xl mb-8"
          >
            Connecting to real-time leaderboard...
          </motion.p>

          {/* Loading Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mb-8 max-w-md"
          />

          {/* Stats Cards Skeleton */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </motion.div>

          {/* Fun Loading Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center space-x-2 text-gray-300"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Fetching the latest ambassador rankings...</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}