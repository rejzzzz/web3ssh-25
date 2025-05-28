'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Sparkles,
  Users,
  Search,
  TrendingUp,
  Star,
  Flame,
} from 'lucide-react';
import { Ambassador } from './LeaderboardPage';

interface LeaderboardTableProps {
  data: Ambassador[];
  viewMode: 'card' | 'table';
  searchTerm: string;
  showOnlyWithParticipants: boolean;
}

// Achievement Badge Component (Updated to match your theme)
const AchievementBadge = ({ rank }: { rank: number; participants: number }) => {
  const getBadgeInfo = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          icon: Crown,
          gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
          glow: 'shadow-yellow-400/50 shadow-lg',
          title: '🏆 Champion',
          ring: 'ring-4 ring-yellow-400/30',
        };
      case 2:
        return {
          icon: Medal,
          gradient: 'from-gray-400 via-gray-500 to-gray-600',
          glow: 'shadow-gray-400/50 shadow-lg',
          title: '🥈 Runner-up',
          ring: 'ring-4 ring-gray-400/30',
        };
      case 3:
        return {
          icon: Award,
          gradient: 'from-amber-500 via-amber-600 to-amber-700',
          glow: 'shadow-amber-500/50 shadow-lg',
          title: '🥉 Third Place',
          ring: 'ring-4 ring-amber-500/30',
        };
      default:
        return {
          icon: Star,
          gradient: 'from-gray-600 to-gray-700',
          glow: 'shadow-gray-400/30',
          title: '⭐ Ambassador',
          ring: 'ring-2 ring-gray-400/20',
        };
    }
  };

  const badge = getBadgeInfo(rank);
  const Icon = badge.icon;

  return (
    <div className="relative group">
      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        className={`relative p-4 rounded-full bg-gradient-to-br ${badge.gradient} ${badge.glow} ${badge.ring} group cursor-pointer`}
      >
        <Icon className="w-7 h-7 text-white drop-shadow-lg" />

        {rank > 3 && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white">
            {rank}
          </div>
        )}

        {rank <= 3 && (
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip matching your theme */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-white text-sm px-3 py-2 rounded-lg pointer-events-none whitespace-nowrap z-20 border border-white/20"
      >
        {badge.title}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
      </motion.div>
    </div>
  );
};

// Performance Badge Component (Updated to match your theme)
const PerformanceBadge = ({ participants }: { participants: number }) => {
  const getPerformanceLevel = (count: number) => {
    if (count >= 5)
      return {
        level: 'Exceptional',
        color: 'text-yellow-400',
        bg: 'bg-yellow-400/20',
        icon: Flame,
      };
    if (count >= 3)
      return {
        level: 'Excellent',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/20',
        icon: TrendingUp,
      };
    if (count >= 1)
      return {
        level: 'Good',
        color: 'text-purple-400',
        bg: 'bg-purple-400/20',
        icon: Star,
      };
    return {
      level: 'New',
      color: 'text-gray-400',
      bg: 'bg-gray-400/20',
      icon: Users,
    };
  };

  const performance = getPerformanceLevel(participants);
  const Icon = performance.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${performance.bg} ${performance.color} border border-current/20`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {performance.level}
    </div>
  );
};

// Card View Component (Updated to match your theme)
const AmbassadorCard = ({
  ambassador,
  rank,
}: {
  ambassador: Ambassador;
  rank: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isTopThree = rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group cursor-pointer ${
        isTopThree ? 'order-first' : ''
      }`}
    >
      {/* Background Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          isTopThree
            ? 'from-yellow-500/20 via-orange-500/20 to-red-500/20'
            : 'from-gray-500/10 to-gray-600/10'
        } rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl`}
      />

      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
        }}
        className="relative p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-8 -translate-y-8" />
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <AchievementBadge
              rank={rank}
              participants={ambassador.participants}
            />
            {ambassador.participants > 0 && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-5 h-5 text-orange-400" />
              </motion.div>
            )}
          </div>

          {/* Ambassador Info */}
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {ambassador.name}
            </h3>


            <div className="flex items-center text-gray-300 mb-2">
             
              <span className="text-xs sm:text-sm truncate">
                {ambassador.college || 'No college specified'}
              </span>
            </div>

            


            <PerformanceBadge participants={ambassador.participants} />
          </div>

          {/* Stats */}
          <div className="text-center">
            <motion.div
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              className="text-3xl sm:text-4xl font-bold text-white mb-2"
            >
              {ambassador.participants}
            </motion.div>

            <div className="text-xs sm:text-sm text-gray-300 flex items-center justify-center">
              <Users className="w-4 h-4 mr-1" />
              participant{ambassador.participants !== 1 ? 's' : ''}
            </div>

            {/* Sparkle indicators */}
            {ambassador.participants > 0 && (
              <div className="flex items-center justify-center space-x-1 mt-2">
                {[...Array(Math.min(ambassador.participants, 5))].map(
                  (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                  ),
                )}
                {ambassador.participants > 5 && (
                  <span className="text-xs text-gray-400 ml-1">
                    +{ambassador.participants - 5}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function LeaderboardTable({
  data,
  viewMode,
  searchTerm,
}: LeaderboardTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const getRankGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400/20 via-yellow-500/15 to-yellow-600/10 border-l-yellow-500';
      case 2:
        return 'from-gray-300/20 via-gray-400/15 to-gray-500/10 border-l-gray-400';
      case 3:
        return 'from-amber-500/20 via-amber-600/15 to-amber-700/10 border-l-amber-500';
      default:
        return 'from-gray-500/10 via-gray-600/10 to-gray-700/10 border-l-gray-400/50';
    }
  };

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
        }}
        className="p-16 shadow-2xl text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Search className="w-12 h-12 text-gray-400" />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-4">
          No Active Ambassadors Found
        </h3>
        <p className="text-gray-300 max-w-md mx-auto">
          {searchTerm
            ? 'Try adjusting your search criteria to find active ambassadors.'
            : 'No active ambassadors with successful referrals found in the system.'}
        </p>
      </motion.div>
    );
  }

  if (viewMode === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {data.map((ambassador, index) => {
            const rank = index + 1;
            return (
              <AmbassadorCard
                key={ambassador.referralCode}
                ambassador={ambassador}
                rank={rank}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
      }}
      className="overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div
        style={{
          background:
            'linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))',
        }}
        className="p-4 sm:p-6 lg:p-8 border-b border-white/10"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center text-center sm:text-left">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-4 text-yellow-400" />
            </motion.div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Active Ambassador Rankings
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm">
                Top performing ambassadors with successful referrals
              </p>
            </div>
          </div>

          <div className="text-gray-300 text-xs sm:text-sm">
            <strong className="text-white">{data.length}</strong> active
            ambassador
            {data.length !== 1 ? 's' : ''} shown
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="divide-y divide-white/10">
        <AnimatePresence>
          {data.map((ambassador, index) => {
            const rank = index + 1;
            const isTopThree = rank <= 3;

            return (
              <motion.div
                key={ambassador.referralCode}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                onHoverStart={() => setHoveredRow(index)}
                onHoverEnd={() => setHoveredRow(null)}
                className={`p-4 sm:p-6 lg:p-8 transition-all duration-300 group cursor-pointer relative overflow-hidden ${
                  isTopThree
                    ? `bg-gradient-to-r ${getRankGradient(rank)} border-l-4 hover:shadow-2xl`
                    : 'hover:bg-white/5'
                } ${hoveredRow === index ? 'transform scale-[1.01] shadow-2xl z-10' : ''}`}
              >
                {/* Background glow effect */}
                {hoveredRow === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 pointer-events-none"
                  />
                )}

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4 sm:space-x-6 flex-1 min-w-0">
                    {/* Achievement Badge */}
                    <div className="flex-shrink-0">
                      <AchievementBadge
                        rank={rank}
                        participants={ambassador.participants}
                      />
                    </div>

                    {/* Ambassador Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                          {ambassador.name}
                        </h3>

                        {ambassador.participants > 0 && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="mt-1 sm:mt-0"
                          >
                            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                          </motion.div>
                        )}

                        <div className="mt-2 sm:mt-0">
                          <PerformanceBadge
                            participants={ambassador.participants}
                          />
                        </div>
                      </div>


                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-300 mb-2">
                        <div className="flex items-center mb-1 sm:mb-0">
                         
                          <span className="truncate text-xs sm:text-sm">
                            {ambassador.college || 'No college specified'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center">
                     
                        
                      </div>

                      

                    </div>
                  </div>

                  {/* Score & Stats */}
                  <div className="text-center sm:text-right flex-shrink-0 w-full sm:w-auto">
                    <motion.div
                      animate={
                        hoveredRow === index ? { scale: 1.1 } : { scale: 1 }
                      }
                      className="text-3xl sm:text-4xl font-bold text-white mb-2"
                    >
                      {ambassador.participants}
                    </motion.div>

                    <div className="text-xs sm:text-sm text-gray-300 flex items-center justify-center sm:justify-end mb-2">
                      <Users className="w-4 h-4 mr-1" />
                      participant{ambassador.participants !== 1 ? 's' : ''}
                    </div>

                    {/* Sparkle indicators */}
                    {ambassador.participants > 0 && (
                      <div className="flex items-center justify-center sm:justify-end space-x-1">
                        {[...Array(Math.min(ambassador.participants, 5))].map(
                          (_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: 0 }}
                              animate={{ scale: 1, rotate: 360 }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                              <Sparkles className="w-3 h-3 text-yellow-400" />
                            </motion.div>
                          ),
                        )}
                        {ambassador.participants > 5 && (
                          <span className="text-xs text-gray-400 ml-1">
                            +{ambassador.participants - 5}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
