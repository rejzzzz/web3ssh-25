'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap } from 'lucide-react';

export default function LeaderboardHeader() {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-8"
      >
        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-sm opacity-60"
        />

        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -top-4 -right-8 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-sm opacity-60"
        />

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-6 relative px-4"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          <span className="relative block sm:inline">
            Ambassador
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1 -right-2 sm:-top-2 sm:-right-4 inline-block"
            >
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-yellow-500" />
            </motion.div>
          </span>
          <br />
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Leaderboard
          </span>
        </motion.h1>

        {/* Live Badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-4 sm:-top-6 right-4 sm:right-1/4 flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-3 h-3 bg-white rounded-full"
          />
          <span>LIVE</span>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed px-4"
      >
        Real-time performance tracking for{' '}
        <span className="text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-semibold">
          Web3SSH 2025
        </span>{' '}
        ambassadors. See who&apos;s leading the charge in building our
        community!
      </motion.p>

      {/* Interactive Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8 px-4"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
          }}
          className="p-3"
        >
          <Zap className="w-6 h-6 text-purple-400" />
        </motion.div>

        <div className="text-gray-300 text-xs sm:text-sm text-center sm:text-left">
          <div className="font-semibold text-white">Interactive Dashboard</div>
          <div className="hidden sm:block">Filter • Sort • Search • Real-time Updates</div>
          <div className="sm:hidden">Real-time Updates</div>
        </div>
      </motion.div>
    </div>
  );
}
