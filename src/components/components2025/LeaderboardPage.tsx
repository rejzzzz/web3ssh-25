'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Award, RefreshCw, Search } from 'lucide-react';

interface Ambassador {
    name: string;
    college: string;
    participants: number;
}

interface LeaderboardData {
    success: boolean;
    data: Ambassador[];
    lastUpdated: string;
    totalAmbassadors: number;
    totalParticipantsWithReferrals: number;
}

// Skeleton loader components
const SkeletonCard = () => (
  <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-slate-700 animate-pulse">
    <div className="flex items-center justify-center mb-2">
      <div className="w-6 h-6 md:w-8 md:h-8 bg-slate-600 rounded"></div>
    </div>
    <div className="h-6 md:h-8 bg-slate-600 rounded mb-2"></div>
    <div className="h-4 bg-slate-600 rounded"></div>
  </div>
);

const SkeletonLeaderboardRow = () => (
  <div className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between animate-pulse">
    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-600 flex-shrink-0"></div>
      <div className="min-w-0 flex-1">
        <div className="h-5 bg-slate-600 rounded mb-2 w-32"></div>
        <div className="h-4 bg-slate-600 rounded w-48"></div>
      </div>
    </div>
    <div className="text-right">
      <div className="h-8 bg-slate-600 rounded mb-1 w-12"></div>
      <div className="h-4 bg-slate-600 rounded w-20"></div>
    </div>
  </div>
);

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLeaderboard = async () => {
    try {
      setRefreshing(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);
      
      const response = await fetch('/api/ambassadors/leaderboard', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const data = await response.json();

      if (data.success) {
        setLeaderboardData(data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch leaderboard data');
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else {
          setError(`Network error: ${err.message}`);
        }
      } else {
        setError('Network error occurred');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter active ambassadors and search
  const filteredData = leaderboardData?.data
    .filter(ambassador => ambassador.participants > 0) // Only show active ambassadors
    .filter(ambassador => 
      ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ambassador.college.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default:
        return 'bg-gradient-to-r from-slate-600 to-slate-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl md:text-6xl mb-6 font-sans font-medium">
              Ambassadors Leaderboard
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Loading ambassador data...
            </p>
            
            {/* Stats Cards Skeleton - Centered */}
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[1, 2].map(i => <SkeletonCard key={i} />)}
              </div>
            </div>
          </div>
          

          {/* Leaderboard Skeleton */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700 overflow-hidden">
              <div className="p-4 md:p-6 border-b border-slate-700">
                <div className="h-6 bg-slate-600 rounded w-48 animate-pulse"></div>
              </div>
              <div className="divide-y divide-slate-700">
                {[1, 2, 3, 4, 5].map(i => <SkeletonLeaderboardRow key={i} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error Loading Leaderboard</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            className="text-white text-4xl md:text-6xl mb-6 font-sans font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ambassadors Leaderboard
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Track the performance of our amazing ambassadors and see who's bringing the most participants to Web3SSH 2025!
          </motion.p>

          {/* Stats Cards - Centered */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-slate-700">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">{filteredData.length}</div>
                <div className="text-xs md:text-sm text-gray-400">Active Ambassadors</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-slate-700">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">{leaderboardData?.totalParticipantsWithReferrals}</div>
                <div className="text-xs md:text-sm text-gray-400">Referred Participants</div>
              </div>
            </div>
          </motion.div>

          {/* Refresh Button */}
          <motion.button
            onClick={fetchLeaderboard}
            disabled={refreshing}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors text-white mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </motion.button>

          {/* Search Bar */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search ambassadors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-700">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center">
                <Trophy className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 text-yellow-400" />
                Top Performers
              </h2>
            </div>

            <div className="divide-y divide-slate-700">
              {filteredData.map((ambassador, index) => {
                const rank = index + 1;
                return (
                  <motion.div
                    key={`${ambassador.name}-${ambassador.college}`}
                    className={`p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-700/30 transition-colors ${rank <= 3 ? 'bg-slate-700/20' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      {/* Rank */}
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${getRankBadgeColor(rank)} flex items-center justify-center flex-shrink-0`}>
                        {getRankIcon(rank)}
                      </div>

                      {/* Ambassador Info */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-white truncate">{ambassador.name}</h3>
                        
                      </div>
                    </div>

                    {/* Participants Count */}
                    <div className="text-left sm:text-right">
                      <div className="text-2xl md:text-3xl font-bold text-white">{ambassador.participants}</div>
                      <div className="text-sm text-gray-400">
                        {ambassador.participants === 1 ? 'participant' : 'participants'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredData.length === 0 && (
              <div className="p-12 text-center">
                <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Active Ambassadors Found</h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? 'Try adjusting your search criteria.' 
                    : 'No active ambassadors found.'
                  }
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-white">
            Last updated: {' '}
            {leaderboardData?.lastUpdated
              ? new Date(leaderboardData.lastUpdated).toLocaleString()
              : 'Unknown'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
}