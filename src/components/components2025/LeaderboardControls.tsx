'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, RefreshCw, Grid3X3, List } from 'lucide-react';

interface LeaderboardControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showOnlyWithParticipants: boolean;
  setShowOnlyWithParticipants: (show: boolean) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  viewMode: 'card' | 'table';
  setViewMode: (mode: 'card' | 'table') => void;
  refreshing: boolean;
  onRefresh: () => void;
}

export default function LeaderboardControls({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  refreshing,
  onRefresh,
}: LeaderboardControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
      }}
      className="p-6 shadow-2xl mb-8"
    >
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:gap-6 lg:items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full max-w-md mx-auto lg:mx-0">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search active ambassadors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
            className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-lg transition-all"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start">
          {/* Filter Button - Hidden since we always show active ambassadors */}
          <motion.div
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
            }}
            className="flex items-center px-3 sm:px-4 py-2 sm:py-3 border border-emerald-500/30 w-full sm:w-auto justify-center sm:justify-start"
          >
            <Filter className="w-4 h-4 mr-2 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-xs sm:text-sm">
              Active Ambassadors Only
            </span>
          </motion.div>

          <div className="flex gap-3 w-full sm:w-auto justify-center">
            {/* View Mode Toggle */}
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
              }}
              className="flex p-1 border border-white/20"
            >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('table')}
              className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('card')}
              className={`flex items-center px-3 py-2 rounded-lg transition-all ${
                viewMode === 'card'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </motion.button>
          </div>

            {/* Refresh Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRefresh}
              disabled={refreshing}
              className="flex items-center px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg font-medium disabled:opacity-50 text-xs sm:text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 mr-1 sm:mr-2 ${refreshing ? 'animate-spin' : ''}`}
              />
              <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              <span className="sm:hidden">{refreshing ? '...' : 'Refresh'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
